import { Router, Request, Response, NextFunction } from 'express'
import { createUserController } from '../Controllers/User/SignUpUserController'
import { authController } from '../Controllers/Auth/AuthController'
import { asyncHandler } from '../Error/Handler'
import { signInUserController } from '../Controllers/User/SignInUserController'
import { deleteMeController } from '../Controllers/User/DeleteMeController'

const router = Router()

router.route('/signUp').post(
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return createUserController.handle(request, response, next)
  })
)

router.route('/signIn').post(
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return signInUserController.handle(request, response, next)
  })
)

const simpleAuth = asyncHandler(
  (request: Request, response: Response, next: NextFunction) => {
    return authController.handle(request, next, ['user', 'admin'])
  }
)

router.route('/').delete(
  simpleAuth,
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return deleteMeController.handle(request, response)
  })
)

export default router
