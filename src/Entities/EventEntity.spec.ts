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

  const invalidProps: unknown = {
    id: 'invalid_id',
    description: 'invalid_desc',
    createdAt: 'invalid_date',
    user: 'invalid_user',
    dateTime: 'invalid_date'
  }

  it('should create a valid event', () => {
    const event = new EventEntity(validProps)
    expect(event).toBeInstanceOf(EventEntity)
  })

  it('should throw array of errors of type ValidationError for invalid events', () => {
    expect(() => new EventEntity(invalidProps as IEventsEntityProps)).toThrowError(ValidationError)
  })
})
