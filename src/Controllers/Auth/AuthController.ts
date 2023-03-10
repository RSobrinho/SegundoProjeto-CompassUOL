import { AuthError } from '../../Error/AuthError'
import { NextFunction, Request, Response } from 'express'
import User from '../../Models/UserModel'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { asyncHandler } from '../../Error/Handler'
config()

interface jwtDecoded {
  id: string
  iat: number
  exp: number
}

export class AuthController {
  async handle(
    req: Request,
    next: NextFunction,
    availableRoles,
  ): Promise<Response | void> {
    let token: string

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(new AuthError('Please log in to get access.'))
    }

    const decoded = (await verify(token, process.env.JWT_SECRET)) as jwtDecoded

    const existingUser = await User.findById(decoded.id)

    if (!existingUser) {
      return next(
        new AuthError(
          'The token belonging to this user does not exist anymore.',
        ),
      )
    }

    if (existingUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AuthError('User recently changed password! Please log in again.'),
      )
    }

    req.user = existingUser

    if (!availableRoles.includes(req.user.role)) {
      return next(
        new AuthError('You do note have permission to perform this action'),
      )
    }

    next()
  }

  simpleAuth = asyncHandler(
    (request: Request, response: Response, next: NextFunction) => {
      return this.handle(request, next, ['user', 'admin'])
    },
  )

  adminAuth = asyncHandler(
    (request: Request, response: Response, next: NextFunction) => {
      return this.handle(request, next, ['admin'])
    },
  )
}

export const authController = new AuthController()
