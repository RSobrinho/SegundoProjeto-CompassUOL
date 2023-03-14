import { BaseError } from './BaseError'

export class ValidationError extends BaseError {
  constructor (message: string, cause?: object) {
    super(422, message)

    if (cause) {
      this.cause = cause
    }
  }
}
