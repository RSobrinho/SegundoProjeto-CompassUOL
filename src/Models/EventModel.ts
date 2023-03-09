import { Schema, model, Document } from 'mongoose'

interface IEventSchema extends Document {
  description: string
  dayOfWeek: string
  createdAt: Date
  user: string
}

const EventSchema = new Schema({
  description: {
    type: String,
    required: [true, 'An event must have a desciption'],
  },
  dayOfWeek: {
    type: String,
    required: [true, 'An event must have a weekday'],
    enum: {
      values: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
      message: 'Insert valid weekdays in lowercase',
    },
  },
  createdAt: { type: Date, default: Date.now() },
  user: {
    type: String,
    ref: 'User',
  },
})

export default model<IEventSchema>('Event', EventSchema)

// top
