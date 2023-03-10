import { Router, Request, Response, NextFunction } from 'express'
import { createEventController } from '../Controllers/Event/CreateEventController'
import { getAllEventsController } from '../Controllers/Event/GetAllEventsController'
import { getEventByIdController } from '../Controllers/Event/GetEventByIdController'
import { deleteEventByIdController } from '../Controllers/Event/DeleteEventByIdController'
import { deleteEventByWeekdayController } from '../Controllers/Event/DeleteEventByWeekdayController'
import { authController } from '../Controllers/Auth/AuthController'

import { asyncHandler } from '../Error/Handler'
import { request } from 'http'

const router = Router()

const simpleAuth = asyncHandler(
  (request: Request, response: Response, next: NextFunction) => {
    return authController.handle(request, next, ['user', 'admin'])
  }
)

const adminAuth = asyncHandler(
  (request: Request, response: Response, next: NextFunction) => {
    return authController.handle(request, next, ['admin'])
  }
)

router.route('/').post(
  simpleAuth,
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return createEventController.handle(request, response, next)
  })

).get(
  simpleAuth,
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return getAllEventsController.handle(request, response, next)
  })
).delete(
  simpleAuth,
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return deleteEventByWeekdayController.handle(request, response, next)
  })
)

router
  .route('/:id')
  .delete(
    simpleAuth,
    asyncHandler((request: Request, response: Response, next: NextFunction) => {
      return deleteEventByIdController.handle(request, response, next)
    })
  ).get(
    simpleAuth,
    asyncHandler((request: Request, response: Response, next: NextFunction) => {
      return getEventByIdController.handle(request, response, next)
    })
  )

export default router
