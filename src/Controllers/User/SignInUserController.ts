import User from '../../Models/UserModel'
import { ValidationError } from '../../Error/ValidationError'
import { Request, Response } from 'express'

export class SignInUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ValidationError(
        'Validation Error: Email and password are required.',
      )
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.verifyPass(password, user.password))) {
      throw new ValidationError(
        'Validation Error: Email or password not valid.',
      )
    }

    return res.status(200).json({ status: 'Success', message: 'User LoggedIn' })
  }
}

export const signInUserController = new SignInUserController()
