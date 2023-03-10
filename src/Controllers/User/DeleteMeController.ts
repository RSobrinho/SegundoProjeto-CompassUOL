import { Request, Response } from 'express'
import User from '../../Models/UserModel'

export class DeleteMeController {
  async handle (req: Request, res: Response): Promise<Response | void> {
    await User.findByIdAndDelete(req.user.id)

    res.status(204).json({
      status: 'success',
      data: null
    })
  }
}
