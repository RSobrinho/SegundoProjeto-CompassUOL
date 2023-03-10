import { Router } from 'express'
import { asyncHandler } from '../Error/Handler'

const router = Router()

asyncHandler(
  router.get('/', (req, res) => {
    res.status(200).json({ message: 'opa' })
  }),
)

export default router
