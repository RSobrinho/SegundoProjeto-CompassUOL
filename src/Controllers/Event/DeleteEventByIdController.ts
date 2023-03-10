import { NextFunction, Request, Response } from 'express'
import Event from '../../Models/EventModel'
import { NotFoundError } from '../../Error/NotFoundError'

export class DeleteEventByIdController {
  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    console.log(event)

    if (!event) {
      return next(new NotFoundError('Event with this id'))
    }
    return res.status(204).json()
  }
}

export const deleteEventByIdController = new DeleteEventByIdController()
