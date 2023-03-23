import { ValidationError } from '../../Error/ValidationError'
import { validator } from '../../Validator/Validator'
import { EventSchemaValidator } from '../../Validator/EventSchemaValidator'
import { IEventEntity } from './IEventEntity'

export class EventEntity {
  private props: IEventEntity

  constructor (props: IEventEntity) {
    this.props = props

    const errors = validator.validate(EventSchemaValidator, this.props)

    if (errors) {
      console.log(errors)

      throw new ValidationError('Zod validation errors', errors)
    }
  }
}
