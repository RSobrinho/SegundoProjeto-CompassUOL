import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../../Error/ValidationError'
import Event from '../../Models/EventModel'

export class GetEventByWeekdayController {
  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const weekday = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ]

    if (!weekday.includes(req.query.dayOfWeek as string)) {
      return next(new ValidationError(`${req.query.dayOfWeek} is not a valid weekday (remember to pass the value in lowercase).`))
    }

    const events = await Event.find({ dayOfWeek: req.query.dayOfWeek, user: req.user._id })

    return res.status(200).json({
      status: 'success',
      events
    })
  }
}

export const getEventByWeekdayController = new GetEventByWeekdayController()
