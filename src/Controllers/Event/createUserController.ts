import { Request, Response } from 'express'
import { BaseError } from '../../Error/BaseError'
import Event from '../../Models/eventModel'

export class createEventController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { description, dayOfWeek, createdAt } = req.body

    const event = Event.findOne({ description })

    if (event.description === description && event.dayOfWeek) {
      throw new BaseError(409, 'Duplicated event on this day.')
    }

    await Event.save({ description, dayOfWeek, createdAt })

    return res.status(201).json({ status: 'Success', message: 'Event added successfully' })
  }
}
