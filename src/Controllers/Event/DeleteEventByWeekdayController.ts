import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../../Error/ValidationError'
import Event from '../../Models/EventModel'

export class DeleteEventByWeekdayController {
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

    await Event.deleteMany({ dayOfWeek: req.query.dayOfWeek, user: req.user._id })
    return res.status(204).json({
      status: 'success',
      data: null
    })
  }
}

export const deleteEventByWeekdayController = new DeleteEventByWeekdayController()
