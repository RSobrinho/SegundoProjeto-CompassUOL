import { Request, Response } from 'express'
import { BaseError } from '../../Error/BaseError'
import Event from '../../Models/EventModel'

export class GetEventById {
  async handle (req: Request, res: Response): Promise<Response> {
    const event = await Event.findById(req.params.id)

    if (!event) {
      throw new BaseError(404, 'No event found by that ID')
    }
    return res.status(200).json({ status: 'success', event })
  }
}

// top
