import { Router, Request, Response } from 'express'
import { createUserController } from '../Controllers/User/CreateUserController'
// import { authenticationController } from '../Controllers/Auth/AuthenticationController'
import { asyncHandler } from '../Error/Handler'

const router = Router()

router.route('/signUp')
  .post(asyncHandler((request: Request, response: Response) => {
    return createUserController.handle(request, response)
  }))

export default router
