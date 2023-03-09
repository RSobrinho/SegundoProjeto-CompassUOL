import { Request, Response } from 'express'
import { BaseError } from '../../Error/BaseError'
import Event from '../../Models/EventModel'

export class CreateEventController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { description, dayOfWeek } = req.body

    const event = await Event.findOne({ description })

    if (event && event.description === description && event.dayOfWeek === dayOfWeek) {
      throw new BaseError(409, 'Duplicated event on this day.')
    }

    const newEvent = await Event.create({ description, dayOfWeek })

    return res.status(201).json({ data: newEvent, status: 'Success', message: 'Event added successfully' })
  }
}

export const createEventController = new CreateEventController()
