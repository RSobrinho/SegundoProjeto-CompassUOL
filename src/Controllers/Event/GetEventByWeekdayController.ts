import { Request, Response } from 'express'
import { BaseError } from '../../Error/BaseError'
import Event from '../../Models/eventModel'

export class GetEventByWeekdayController {
  weekday = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ]

  async handle (req: Request, res: Response): Promise<Response> {
    if (!this.weekday.includes(req.query.dayOfWeek)) {
      throw new BaseError(400, `${req.query.dayOfWeek} is not a valid weekday (remember to pass the value in lowercase).`)
    }

    const events = await Event.find({ dayOfWeek: req.query.dayOfWeek })

    return res.status(200).json({
      status: 'success',
      events
    })
  }
}

export const getEventByWeekdayController = new GetEventByWeekdayController()