import { ValidationError } from '../Error/ValidationError'
import { z } from 'zod'
import { validator } from '../Utils/Validator'

export const EventEntityValidator = z.object({
  id: z.string().uuid(),
  description: z.string().min(12),
  createdAt: z.string().datetime().default(`${new Date()}`),
  user: z.string().uuid(),
  dateTime: z.string().datetime()
})

export type IEventsEntityProps = z.infer<typeof EventEntityValidator>

export class UserEntity {
  private props: IEventsEntityProps

  constructor (props: IEventsEntityProps) {
    this.props = props

    const errors = validator.validate(EventEntityValidator, this.props)

    if (errors) {
      throw new ValidationError('Zod validation errors', errors)
    }
  }
}
