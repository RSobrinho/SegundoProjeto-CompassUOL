import { faker } from '@faker-js/faker'
import { v4 } from 'uuid'
import { IUserEntityProps, UserEntity } from './UserEntity'
import { format } from 'date-fns'
import { describe, it, expect } from 'vitest'
import { ValidationError } from '../Error/ValidationError'
import { config } from 'dotenv'
config()

const randomDate = faker.date.between('1900-01-01', ((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

const formattedRandomDate = format(randomDate, 'yyyy-mm-dd')

describe('UserEntity', () => {
  const validProps: IUserEntityProps = {
    id: v4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: formattedRandomDate,
    city: faker.address.city(),
    country: faker.address.country(),
    email: faker.internet.email(),
    password: faker.internet.password(12),
    role: 'user',
    passwordChangedAt: faker.date.between(new Date(), '2099-01-01'),
    passwordResetToken: 'minhastringdoresettokenmtolongatadoido',
    passwordResetExpires: new Date(Date.now() + 1000 * 60 * 10)
  }

  // testar para ver se o user é user ou admin
  // testar para invalidar erros de propriedades

  it('should create a valid user', () => {
    const validUser = new UserEntity(validProps)
    expect(validUser).toBeInstanceOf(UserEntity)
    console.log(validUser)
  })

  it('should throw a validation error if at least 1 property of user is invalid', () => {
    const invalidProps = { ...validProps }
    invalidProps.city = 'a'
    expect(() => new UserEntity(invalidProps)).toThrowError(ValidationError)
  })

  it('should create a user with role admin', () => {
    const validAdminUser = new UserEntity({ ...validProps, role: process.env.ADMIN_SECRET })

    expect(validAdminUser.role).toBe('admin')
    console.log(validAdminUser)
  })

  // const invalidUserProps
})
