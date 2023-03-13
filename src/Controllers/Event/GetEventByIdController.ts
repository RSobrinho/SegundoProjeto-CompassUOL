import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../../Error/NotFoundError'
import Event from '../../Models/EventModel'

export class GetEventByIdController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const event = await Event.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!event) {
      return next(new NotFoundError('Event with this Id'))
    }
    return res.status(200).json({ status: 'success', event })
  }
}
export const getEventByIdController = new GetEventByIdController()
