import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../../Error/ValidationError'
import User from '../../Models/UserModel'
import { sendJWT } from '../Auth/SendJWT'

export class SignUpUserController {
  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const {
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password,
      confirmPassword
    } = req.body

    if (password !== confirmPassword) {
      return next(new ValidationError(
        'Validation Error: The password and confirmPassword are not the same'
      ))
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return next(new ValidationError('Validation Error: This email already exists'))
    }

    const newUser = await User.create({
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password,
      confirmPassword
    })
    return sendJWT.handle(newUser, 'User created successfully', 200, res)
  }
}

export const signUpUserController = new SignUpUserController()
