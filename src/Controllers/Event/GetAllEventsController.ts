import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../../Error/NotFoundError'
import { getEventByWeekdayController } from './GetEventByWeekdayController'
import Event from '../../Models/EventModel'

export class GetAllEventsController {
  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    if (req.query.dayOfWeek) {
      return getEventByWeekdayController.handle(req, res, next)
    }

    const events = await Event.find({ user: req.user._id })

    if (events.length === 0) {
      return next(new NotFoundError('Events'))
    }
    return res.status(200).json({ status: 'success', events })
  }
}

export const getAllEventsController = new GetAllEventsController()
