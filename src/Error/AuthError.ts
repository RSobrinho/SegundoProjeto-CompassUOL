import { BaseError } from './BaseError'

export class AuthError extends BaseError {
  constructor (propertyString: string) {
    super(401, `Unauthorized! ${propertyString}.`)
  }
}
