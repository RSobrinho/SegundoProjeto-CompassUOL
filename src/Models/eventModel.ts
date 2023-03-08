import { Schema, model, Document } from 'mongoose'

interface IEventSchema extends Document {
    _id: string,
    description: string,
    dayOfTheWeek: string,
    createdAt: Date,
    user: string
}

const EventSchema = new Schema({
  _id: String,
  description: String,
  dayOfTheWeek: String,
  createdAt: Date,
  user: {
    type: String,
    ref: 'User'
  }
})

export default model<IEventSchema>('Event', EventSchema)
