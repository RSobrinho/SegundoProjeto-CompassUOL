import { IUserSchema } from '../../Models/UserModel'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
class SendJWT {
  public async handle(
    user: IUserSchema,
    message: string,
    statusCode: number,
    res: Response,
  ): Promise<Response> {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    user.password = undefined

    return res.status(statusCode).json({ status: 'success', token, message })
  }
}

export const sendJWT = new SendJWT()
