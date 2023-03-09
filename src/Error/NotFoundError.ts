import { BaseError } from './BaseError'

export class NotFoundError extends BaseError {
  constructor (propertyString: string) {
    super(404, `${propertyString} not found.`)
  }
}
