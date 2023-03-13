import { Request, Response, NextFunction } from 'express'
import User from '../../Models/UserModel'
import { NotFoundError } from '../../Error/NotFoundError'
import { IMailProvider } from '../../Providers/Interfaces/IMailProvider'
import { MailtrapMailProvider } from '../../Providers/Implementations/MailtrapMailProvider'
export class ForgotPasswordController {
  constructor (private mailProvider: IMailProvider) {}

  public async handle (req: Request, res: Response, next: NextFunction) {
    const user = await User.findOne({ email: req.body.email })

    console.log(req.body.email)

    if (!user) {
      return next(new NotFoundError('User'))
    }

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    console.log(user)

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request on this link: ${resetURL}`

    await User.updateOne({ email: req.body.email }, user)

    this.mailProvider.sendMail({
      to: {
        name: user.firstName,
        email: user.email
      },
      from: {
        name: 'Rafael Sobrinho dev backend brabo da compass',
        email: 'rafarrsobrinho@hotmail.com'
      },
      subject: 'Password reset link',
      body: message
    })

    return res.status(200).json({ status: 'Success', message: 'A password reset link was sent to your email.' })
  }
}

export const forgotPasswordController = new ForgotPasswordController(new MailtrapMailProvider())
