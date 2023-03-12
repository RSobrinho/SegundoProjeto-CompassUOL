import UserModel from '../../Models/UserModel'
import { ValidationError } from '../../Error/ValidationError'
import { NextFunction, Request, Response } from 'express'

export class UpdateUserDataController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (req.body.password || req.body.confirmPassword) {
      return next(
        new ValidationError(
          'This route is not responsible for updating your password!',
        ),
      )
    }

    const { firstName, lastName, birthDate, city, country, email } = req.body

    const userUpdated = await UserModel.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, birthDate, city, country, email },
      { new: true, runValidators: true },
    )

    return res.status(200).json({
      status: 'Success',
      data: {
        user: userUpdated,
      },
    })
  }
}

export const updateUserDataController = new UpdateUserDataController()
