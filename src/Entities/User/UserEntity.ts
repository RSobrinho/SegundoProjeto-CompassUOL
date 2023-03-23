import { ValidationError } from '../../Error/ValidationError'
import { validator } from '../../Validator/Validator'
import { v4 } from 'uuid'
import crypto from 'crypto'
import { IUserEntityProps } from './IUserEntityProps'
import { UserSchemaValidator } from '../../Validator/UserSchemaValidator'

export class UserEntity {
  private props: IUserEntityProps

  constructor (props: IUserEntityProps) {
    this.props = props
    this.role = this.props.role

    this.role = this.props.role
    if (!this.props.id) {
      this.props.id = v4()
    }

    const errors = validator.validate(UserSchemaValidator, this.props)

    if (errors) {
      throw new ValidationError('Zod validation errors', errors)
    }
  }

  get id () {
    return this.props.id
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
