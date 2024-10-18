import {Router} from 'express';
import {login, requestPasswordReset, resetPassword, signup, verifyCode} from "../controllers/auth";
import {errorHandler} from "../utils/errorHandler";

const authRouter: Router = Router();

authRouter.post('/signup', errorHandler(signup))
authRouter.post('/login', errorHandler(login))
authRouter.post('/request_password_reset', errorHandler(requestPasswordReset))
authRouter.post('/verify_code', errorHandler(verifyCode))
authRouter.post('/reset_password', errorHandler(resetPassword))

export default authRouter