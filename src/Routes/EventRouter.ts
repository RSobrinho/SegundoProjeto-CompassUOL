import { Router, Request, Response } from 'express'
import { createEventController } from '../Controllers/Event/CreateEventController'
import { getAllEventsController } from '../Controllers/Event/GetAllEventsController'
import { getEventByIdController } from '../Controllers/Event/GetEventByIdController'
import { deleteEventByIdController } from '../Controllers/Event/DeleteEventByIdController'
import { asyncHandler } from '../Error/Handler'

const router = Router()

router.route('/')
  .post(asyncHandler((request: Request, response: Response) => {
    return createEventController.handle(request, response)
  }))

router.route('/:id')
  .delete(asyncHandler((request: Request, response: Response) => {
    return deleteEventByIdController.handle(request, response)
  }))
  .get(asyncHandler((req: Request, res: Response) => {
    return getAllEventsController.handle(req, res)
  }))

router.route('/:id').get(asyncHandler((req: Request, res: Response) => {
  return getEventByIdController.handle(req, res)
}))

export default router
