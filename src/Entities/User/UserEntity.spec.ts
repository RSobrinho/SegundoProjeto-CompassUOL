import { faker } from '@faker-js/faker'
import { v4 } from 'uuid'
import { IUserEntityProps, UserEntity } from './UserEntity'
import { format } from 'date-fns'
import { describe, it, expect } from 'vitest'

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
  })

  it('should throw a validation error if an entity is being created with at least 1 invalid property', () => {
    const invalidUser = () => {
      return new UserEntity({ ...validProps, firstName: null })
    }

    expect(invalidUser).toThrow()
  })

  it('should create a valid user with role admin', () => {
    const validAdminUser = new UserEntity({ ...validProps, role: process.env.ADMIN_SECRET })

    expect(validAdminUser.role).toBe('admin')
  })

  // const invalidUserProps
})
