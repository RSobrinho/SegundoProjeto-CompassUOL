import { Router, Request, Response, NextFunction } from 'express'
import { createUserController } from '../Controllers/User/SignUpUserController'
// import { authenticationController } from '../Controllers/Auth/AuthenticationController'
import { asyncHandler } from '../Error/Handler'
import { signInUserController } from '../Controllers/User/SignInUserController'
import { deleteMeController } from 'Controllers/User/DeleteMeController'

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

router.route('/').delete((
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return deleteMeController.handle(request, response)
  })
))

export default router
