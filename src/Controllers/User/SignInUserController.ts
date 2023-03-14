import User from '../../Models/UserModel'
import { ValidationError } from '../../Error/ValidationError'
import { NextFunction, Request, Response } from 'express'
import { sendJWT } from '../Auth/SendJWT'
import { UserEntity } from '../../Entities/User/UserEntity'
export class SignInUserController {
  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new ValidationError(
        'Validation Error: Email and password are required.'
      ))
    }

    const testUser = new UserEntity({ email, password })

    console.log(testUser)

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.verifyPass(password, user.password))) {
      return next(new ValidationError(
        'Validation Error: Email or password not valid.'
      ))
    }

    return sendJWT.handle(user, 'User logged in successfully', 200, res)
  }
}

export const signInUserController = new SignInUserController()
