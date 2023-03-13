import { NextFunction, Request, Response } from 'express'
import Event from '../../Models/EventModel'

class GetFilteredEventsController {
  formatDate (queryDate) {
    const startDateArray = (queryDate as string).split('-')
    const parsedDate = new Date(+startDateArray[0], +startDateArray[1] - 1, +startDateArray[2])
    return parsedDate
  }

  checkQuery (req: Request, startDate: Date, endDate: Date) {
    let filteredObject

    if (req.query.startDate || !req.query.endDate) {
      filteredObject = {
        $gte: startDate
      }
    } else if (!req.query.startDate || req.query.endDate) {
      filteredObject = {
        $lte: endDate
      }
    } else if (req.query.startDate || req.query.endDate) {
      filteredObject = {
        $gte: startDate,
        $lte: endDate
      }
    }
    return filteredObject
  }

  async handle (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let startDate
    let endDate

    if (req.query.startDate) {
      startDate = this.formatDate(req.query.startDate)
    }
    if (req.query.endDate) {
      endDate = this.formatDate(req.query.endDate)
    }

    const filter = this.checkQuery(req, startDate, endDate)

    const events = await Event.find({
      user: req.user._id,
      dateTime: filter
    })

    return res.status(200).json({
      status: 'success',
      found: events.length,
      events
    })
  }
}

export const getFilteredEventsController = new GetFilteredEventsController()
