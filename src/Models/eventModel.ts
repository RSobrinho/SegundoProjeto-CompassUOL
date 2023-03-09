import { Schema, model, Document } from 'mongoose'

interface IEventSchema extends Document {
    description: string,
    dayOfWeek: string,
    createdAt: Date,
    user: string,
}

const EventSchema = new Schema({
  description: String,
  dayOfWeek: String,
  createdAt: { type: Date, default: Date.now() },
  user: {
    type: String,
    ref: 'User'
  }
})

export default model<IEventSchema>('Event', EventSchema)

// top
