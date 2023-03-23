import { z } from 'zod'

export const EventSchemaValidator = z.object({
  id: z.string().uuid(),
  description: z.string().min(20),
  createdAt: z.date(),
  user: z.string().uuid(),
  dateTime: z.date()
})
