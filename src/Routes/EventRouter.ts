import { Router, Request, Response } from 'express'
import { CreateEventrController } from '../Controllers/Event/createUserController'
import { asyncHandler } from '../Error/Handler'

const router = Router()

router.route('/')
  .post(asyncHandler((request: Request, response: Response) => {
    return CreateEventrController.handle(request, response)
  }))

export default router
