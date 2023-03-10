import { ValidationError } from '../../Error/ValidationError'
import { NextFunction, Request, Response } from 'express'
import Event from '../../Models/EventModel'

export class CreateEventController {
  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { description, dayOfWeek } = req.body

    const event = await Event.findOne({ description })

    if (
      event &&
      event.description === description &&
      event.dayOfWeek === dayOfWeek
    ) {
      return next(new ValidationError('Duplicated event on this day.'))
    }

    const newEvent = await Event.create({ description, dayOfWeek, user: req.user._id })

    return res.status(201).json({
      data: newEvent,
      status: 'Success',
      message: 'Event added successfully'
    })
  }
}

export const createEventController = new CreateEventController()
