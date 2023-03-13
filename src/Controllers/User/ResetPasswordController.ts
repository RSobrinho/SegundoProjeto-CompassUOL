import { Request, Response, NextFunction } from 'express'
import { ValidationError } from '../../Error/ValidationError'
import crypto from 'crypto'
import User from '../../Models/UserModel'
import { NotFoundError } from '../../Error/NotFoundError'
import { sendJWT } from '../Auth/SendJWT'

export class ResetPasswordController {
  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const resetToken = req.params.token
    let { password, confirmPassword } = req.body

    if (password !== confirmPassword) {
      return next(new ValidationError('Password and confirmPassword are not the same'))
    } else {
      confirmPassword = undefined
    }

    const hashedPassResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    const user = await User.findOne({
      passwordResetToken: hashedPassResetToken,
      passwordResetExpires: { $gt: Date.now() }
    })

    console.log(user)

    if (!user) {
      throw new NotFoundError('user')
    }
    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = null
    user.passwordResetExpires = null
    user.passwordChangedAt = new Date()

    console.log(user)

    await user.save({ validateBeforeSave: false })

    sendJWT.handle(user, 'Password changed successfully', 200, res)
  }
}

export const resetPasswordController = new ResetPasswordController()
