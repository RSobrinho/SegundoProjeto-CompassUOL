import UserModel from '../../Models/UserModel'
import { ValidationError } from '../../Error/ValidationError'
import { NextFunction, Request, Response } from 'express'

export class UpdateUserDataController {
  async handle (
    req: Request,
    res: Response
  ): Promise<Response | void> {
    const { firstName, lastName, birthDate, city, country, email, password } = req.body

    await UserModel.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, birthDate, city, country, email, password },
      { new: true, runValidators: true }
    )

    return res.status(200).json({
      status: 'Success',
      message: 'User data updated successfully'
    })
  }
}

export const updateUserDataController = new UpdateUserDataController()
