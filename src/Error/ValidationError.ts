import { BaseError } from './BaseError'

export class ValidationError extends BaseError {
  constructor (statusCode: number, message: string, cause: unknown) {
    super(statusCode, message)
    this.cause = cause
  }
}
