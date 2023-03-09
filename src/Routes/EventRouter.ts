import { Router, Request, Response, NextFunction } from 'express'
import { createEventController } from '../Controllers/Event/CreateEventController'
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

export default router
