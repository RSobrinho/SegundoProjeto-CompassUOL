import { Request, Response } from 'express'
import { BaseError } from '../../Error/BaseError'
import Event from '../../Models/eventModel'

export class DeleteEventByIdController {
  async handle (req: Request, res: Response): Promise<Response> {
    const event = Event.findById(req.params)

    if (!event) {
      throw new BaseError(409, 'No event find by this Id.')
    }

    await Event.deleteOne({ _id: req.params })

    return res.status(204)
  }
}
