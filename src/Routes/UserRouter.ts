import { Router, Request, Response, NextFunction } from 'express'
import { signUpUserController } from '../Controllers/User/SignUpUserController'
// import { authenticationController } from '../Controllers/Auth/AuthenticationController'
import { asyncHandler } from '../Error/Handler'
import { signInUserController } from '../Controllers/User/SignInUserController'
import { updateUserDataController } from '../Controllers/User/UpdateUserDataController'
import { authController } from '../Controllers/Auth/AuthController'
import { deleteMeController } from '../Controllers/User/DeleteMeController'
import { resetPasswordController } from '../Controllers/User/ResetPasswordController'
import { forgotPasswordController } from '../Controllers/User/ForgotPasswordController'

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

router.route('/resetPassword/:token').post(
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return resetPasswordController.handle(request, response, next)
  })
)

router.route('/forgotPassword').post(
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return forgotPasswordController.handle(request, response, next)
  })
)

router.route('/').patch(
  authController.simpleAuth,
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return updateUserDataController.handle(request, response)
  })
)

router.route('/').delete(
  authController.simpleAuth,
  asyncHandler((request: Request, response: Response, next: NextFunction) => {
    return deleteMeController.handle(request, response)
  })
)

export default router
