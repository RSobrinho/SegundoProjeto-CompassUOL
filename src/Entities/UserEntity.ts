import { ValidationError } from '../Error/ValidationError'
import { z } from 'zod'
import { validator } from '../Utils/Validator'
import { v4 } from 'uuid'
import crypto from 'crypto'
import { config } from 'dotenv'
config()

export const UserEntityValidator = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  birthDate: z.string().min(10),
  city: z.string().min(4),
  country: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(12),
  role: z.string(),
  passwordChangedAt: z.date(),
  passwordResetToken: z.string(),
  passwordResetExpires: z.date()
})

export type IUserEntityProps = z.infer<typeof UserEntityValidator>

export class UserEntity {
  private props: IUserEntityProps

  constructor (props: IUserEntityProps) {
    this.props = props
    this.role = this.props.role

    this.role = this.props.role
    if (!this.props.id) {
      this.props.id = v4()
    }

    const errors = validator.validate(UserEntityValidator, this.props)

    console.log(errors)

    if (errors) {
      throw new ValidationError('Zod validation errors', errors)
    }
  }

  get role () {
    return this.props.role
  }

  set role (role) {
    this.props.role = 'user'

    const hashedRole = crypto
      .createHash('sha256')
      .update(this.props.role)
      .digest('hex')

    if (hashedRole === process.env.ADMIN_SECRET) {
      this.props.role = 'admin'
    } else {
      this.props.role = 'user'
    }
  }
}
