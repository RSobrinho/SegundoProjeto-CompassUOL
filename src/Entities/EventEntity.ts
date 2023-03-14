import { ValidationError } from '../Error/ValidationError'
import { z } from 'zod'
import { validator } from '../Utils/Validator'

export const EventEntityValidator = z.object({
  id: z.string().uuid(),
  description: z.string().min(20),
  createdAt: z.date(),
  user: z.string().uuid(),
  dateTime: z.date()
})

export type IEventsEntityProps = z.infer<typeof EventEntityValidator>

export class EventEntity {
  private props: IEventsEntityProps

  constructor (props: IEventsEntityProps) {
    this.props = props

    const errors = validator.validate(EventEntityValidator, this.props)

    if (errors) {
      console.log(errors)

      throw new ValidationError('Zod validation errors', errors)
    }
  }
}
