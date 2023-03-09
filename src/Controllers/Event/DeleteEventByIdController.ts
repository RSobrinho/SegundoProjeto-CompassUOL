import { Request, Response } from 'express'
import { BaseError } from '../../Error/BaseError'
import Event from '../../Models/EventModel'

export class DeleteEventByIdController {
  async handle (req: Request, res: Response): Promise<Response> {
    const event = await Event.findById(req.params.id)
    console.log(event)

    if (!event) throw new BaseError(409, 'No event find by this Id.')

    await Event.deleteOne({ _id: req.params.id })

    return res.status(204).end()
  }
}

export const deleteEventByIdController = new DeleteEventByIdController()
