import { ValidationError } from '../../Error/ValidationError'
import { NextFunction, Request, Response } from 'express'
import Event from '../../Models/EventModel'

export class CreateEventController {
  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { description, dayOfWeek } = req.body
    const dateTime = new Date(req.body.dateTime)
    console.log(dateTime)

    const event = await Event.findOne({ description })

    if (
      event &&
      event.description === description &&
      event.dateTime === dateTime
    ) {
      return next(new ValidationError('Duplicated event on this day.'))
    }

    const newEvent = await Event.create({ description, dayOfWeek, dateTime, user: req.user._id })

    return res.status(201).json({
      status: 'Success',
      message: 'Event added successfully',
      data: newEvent
    })
  }
}

export const createEventController = new CreateEventController()
