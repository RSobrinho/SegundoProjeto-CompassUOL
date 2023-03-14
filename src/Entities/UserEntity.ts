import { ValidationError } from '../Error/ValidationError'
import { z } from 'zod'
import { validator } from '../Utils/Validator'

export const UserEntityValidator = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  birthDate: z.string().min(10),
  city: z.string().min(4),
  country: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(12),
  confirmPassword: z.string().min(12),
  role: z.array(z.string()),
  passwordChangedAt: z.string().datetime(),
  passwordResetToken: z.string(),
  passwordResetExpires: z.string().datetime()
})

export type IUserEntityProps = z.infer<typeof UserEntityValidator>

export class UserEntity {
  private props: IUserEntityProps

  constructor (props: IUserEntityProps) {
    this.props = props

    const errors = validator.validate(UserEntityValidator, this.props)

    if (errors) {
      throw new ValidationError('Zod validation errors', errors)
    }
  }
}
