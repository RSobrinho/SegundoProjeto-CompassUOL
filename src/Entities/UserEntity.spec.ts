import { faker } from '@faker-js/faker'
import { v4 } from 'uuid'
import { IUserEntityProps } from './UserEntity'
import { format } from 'date-fns'
import { describe, it } from 'vitest'

const randomDate = faker.date.between('1900-01-01', ((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

const formattedRandomDate = format(randomDate, 'yyyy-mm-dd')

describe('UserEntity', () => {
  const validUserProps: IUserEntityProps = {
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
    passwordResetToken: z.string(),
    passwordResetExpires: z.string().datetime()
  }

  const validAdminProps = validUserProps
  validAdminProps.role = 'admin'
})
