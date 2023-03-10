import { Schema, model, Document, Types } from 'mongoose'

export interface IEventSchema extends Document {
  description: string
  dayOfWeek: string
  createdAt: Date
  user: string
  dateTime: Date
}

const EventSchema = new Schema({
  description: {
    type: String,
    required: [true, 'An event must have a description']
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
        'saturday'
      ],
      message: 'Insert valid weekdays in lowercase'
    }
  },
  createdAt: { type: Date, default: Date.now() },
  dateTime: {
    type: Date,
    required: [true, 'An event must have a date']
  },
  user: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

EventSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName'
  })

  next()
})

export default model<IEventSchema>('Event', EventSchema)
