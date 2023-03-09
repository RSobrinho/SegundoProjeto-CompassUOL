import { AuthError } from '../../Error/AuthError'
import { NextFunction, Request, Response } from 'express'
import User from '../../Models/UserModel'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'
config()

interface jwtDecoded {
  _id: string,
  iat: number,
  exp: number
}

export class AuthController {
  async handle (req: Request, next: NextFunction, availableRoles): Promise<Response | void> {
    let token: string

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(new AuthError('Please log in to get access.'))
    }

    const { _id, iat } = verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new AuthError('Don`t know yet'))
      }
      return decoded
    }) as unknown as jwtDecoded

    const existingUser = await User.findById(_id)

    if (!existingUser) {
      return next(new AuthError('The token belonging to this user does not exist anymore.'))
    }

    if (existingUser.changedPasswordAfter(iat)) {
      return next(new AuthError('User recently changed password! Please log in again.'))
    }

    req.user = existingUser

    if (!availableRoles.includes(req.user.role)) {
      return next(new AuthError('You do note have permission to perform this action'))
    }

    next()
  }
}

export const authController = new AuthController()
