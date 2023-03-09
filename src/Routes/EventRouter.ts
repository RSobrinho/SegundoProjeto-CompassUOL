import { Router, Request, Response } from 'express'
import { CreateEventrController } from '../Controllers/Event/CreateEventController'
import { getAllEventsController } from '../Controllers/Event/GetAllEventsController'
import { getEventByIdController } from '../Controllers/Event/GetEventByIdController'
import { getEventByWeekdayController } from '../Controllers/Event/GetEventByWeekdayController'
import { asyncHandler } from '../Error/Handler'

const router = Router()

router.route('/')
  .post(asyncHandler((request: Request, response: Response) => {
    return CreateEventrController.handle(request, response)
  }))
  .get(asyncHandler((req: Request, res: Response) => {
    return getAllEventsController.handle(req, res)
  }))
  .get(asyncHandler((req: Request, res: Response) => {
    return getEventByWeekdayController.handle(req, res)
  }))

router.route('/:id').get(asyncHandler((req: Request, res: Response) => {
  return getEventByIdController.handle(req, res)
}))

export default router
