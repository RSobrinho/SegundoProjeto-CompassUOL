import { Router, Request, Response, NextFunction } from 'express'
import { signUpUserController } from '../Controllers/User/SignUpUserController'
// import { authenticationController } from '../Controllers/Auth/AuthenticationController'
import { asyncHandler } from '../Error/Handler'
import { signInUserController } from '../Controllers/User/SignInUserController'

const router = Router()

router.route('/signUp').post(
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return signUpUserController.handle(request, response, next)
  })
)

router.route('/signIn').post(
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return signInUserController.handle(request, response, next)
  })
)

export default router
