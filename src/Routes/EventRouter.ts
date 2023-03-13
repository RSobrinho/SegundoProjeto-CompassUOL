import { Router, Request, Response, NextFunction } from 'express'
import { createEventController } from '../Controllers/Event/CreateEventController'
import { getAllEventsController } from '../Controllers/Event/GetAllEventsController'
import { getEventByIdController } from '../Controllers/Event/GetEventByIdController'
import { deleteEventByIdController } from '../Controllers/Event/DeleteEventByIdController'
import { deleteEventByWeekdayController } from '../Controllers/Event/DeleteEventByWeekdayController'
import { authController } from '../Controllers/Auth/AuthController'
import { asyncHandler } from '../Error/Handler'
import { getFilteredEventsController } from '../Controllers/Event/GetFilteredEvents'

const router = Router()

router
  .route('/')
  .post(
    authController.simpleAuth,
    asyncHandler((request: Request, response: Response, next: NextFunction) => {
      return createEventController.handle(request, response, next)
    }),
  )
  .get(
    authController.simpleAuth,
    asyncHandler((request: Request, response: Response, next: NextFunction) => {
      return getAllEventsController.handle(request, response, next)
    }),
  )
  .delete(
    authController.simpleAuth,
    asyncHandler((request: Request, response: Response, next: NextFunction) => {
      return deleteEventByWeekdayController.handle(request, response, next)
    }),
  )

router.route('/filterByDate').get(
  authController.simpleAuth,
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return getFilteredEventsController.handle(request, response, next)
  }),
)

router
  .route('/:id')
  .delete(
    authController.simpleAuth,
    asyncHandler((request: Request, response: Response, next: NextFunction) => {
      return deleteEventByIdController.handle(request, response, next)
    }),
  )
  .get(
    authController.simpleAuth,
    asyncHandler((request: Request, response: Response, next: NextFunction) => {
      return getEventByIdController.handle(request, response, next)
    }),
  )

export default router
