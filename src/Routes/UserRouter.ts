import { Router, Request, Response } from 'express';
import { createUserController } from '../Controllers/User/CreateUserController';
// import { authenticationController } from '../Controllers/Auth/AuthenticationController'
import { asyncHandler } from '../Error/Handler';
import { signInUserController } from '../Controllers/User/SignInUserController';

const router = Router();

router.route('/signUp').post(
  asyncHandler((request: Request, response: Response) => {
    return createUserController.handle(request, response);
  })
);

router.route('/signIn').post(
  asyncHandler((request: Request, response: Response) => {
    return signInUserController.handle(request, response);
  })
);

export default router;
