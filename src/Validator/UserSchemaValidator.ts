import { z } from 'zod'

export const UserSchemaValidator = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  birthDate: z.string().min(10),
  city: z.string().min(4),
  country: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(12),
  role: z.string(),
  passwordChangedAt: z.date(),
  passwordResetToken: z.string(),
  passwordResetExpires: z.date()
})
