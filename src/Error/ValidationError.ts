import { BaseError } from './BaseError'

export class ValidationError extends BaseError {
  constructor (message: string) {
    super(422, message)
  }
}

// top
