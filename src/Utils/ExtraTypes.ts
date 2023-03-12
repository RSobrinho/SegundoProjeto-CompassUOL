import { IUserSchema } from '../Models/UserModel'

declare module 'express-serve-static-core' {
  interface Request {
    user: IUserSchema
  }
}
