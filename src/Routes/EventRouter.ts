import { Router, Request, Response } from 'express'
import { CreateEventrController as CreateEventController } from '../Controllers/Event/createEventController'
import { asyncHandler } from '../Error/Handler'

const router = Router()

router.route('/')
  .post(asyncHandler((request: Request, response: Response) => {
    return CreateEventController.handle(request, response)
  }))

export default router
