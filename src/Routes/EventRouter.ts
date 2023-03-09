import { Router, Request, Response, NextFunction } from 'express'
import { createEventController } from '../Controllers/Event/CreateEventController'
import { getAllEventsController } from '../Controllers/Event/GetAllEventsController'
import { getEventByIdController } from '../Controllers/Event/GetEventByIdController'
import { deleteEventByIdController } from '../Controllers/Event/DeleteEventByIdController'
import { authController } from '../Controllers/Auth/AuthController'

import { asyncHandler } from '../Error/Handler'

const router = Router()

const simpleAuth = asyncHandler((request: Request, response: Response, next: NextFunction) => {
  return authController.handle(request, next, ['user', 'admin'])
})

const adminAuth = asyncHandler((request: Request, response: Response, next: NextFunction) => {
  return authController.handle(request, next, ['admin'])
})

router.route('/')
  .post(simpleAuth, asyncHandler((request: Request, response: Response) => {
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
