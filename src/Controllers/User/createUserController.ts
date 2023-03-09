import { Request, Response } from 'express'
import { BaseError } from '../../Error/BaseError'
import { ValidationError } from '../../Error/ValidationError'
import User from '../../Models/UserModel'

export class CreateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, birthDate, city, country, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
      throw new ValidationError('Validation Error: The password and confirmPassword are not the same')
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new ValidationError('Validation Error: This email already exists')
    }

    await User.create({ firstName, lastName, birthDate, city, country, email, password, confirmPassword })

    return res.status(200).json({ status: 'Success', message: 'User created successfully' })
  }
}

export const createUserController = new CreateUserController()
