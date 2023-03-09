import { Request, Response } from 'express'
import { BaseError } from '../../Error/BaseError'
import { getEventByWeekdayController } from './GetEventByWeekdayController'
import Event from '../../Models/EventModel'

export class GetAllEventsController {
  async handle (req: Request, res: Response): Promise<Response> {
    if (req.query.dayOfWeek) {
      return getEventByWeekdayController.handle(req, res)
    }
    const events = await Event.find()
    if (events.length === 0) {
      throw new BaseError(404, 'No events found')
    }
    return res.status(200).json({ status: 'success', events })
  }
}

// top
export const getAllEventsController = new GetAllEventsController()
