import { describe, expect, it } from 'vitest'
import { IEventsEntityProps, EventEntity } from './EventEntity'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { ValidationError } from '../Error/ValidationError'
describe('EventEntity', () => {
  const validProps: IEventsEntityProps = {
    id: v4(),
    description: faker.lorem.words(12),
    createdAt: new Date(),
    user: v4(),
    dateTime: faker.date.between(new Date(), '2099-01-01')
  }

  it('should create a valid event', () => {
    const event = new EventEntity(validProps)
    expect(event).toBeInstanceOf(EventEntity)
  })

  it('should throw a validation error if at least 1 property of event is invalid', () => {
    const invalidProps = validProps
    invalidProps.id = 'invalid_id'
    expect(() => new EventEntity(invalidProps)).toThrowError(ValidationError)
  })
})
