import {Router} from 'express';
import authRouter from "./auth";

const routeRouter = Router();

routeRouter.use('/auth', authRouter)

export default routeRouter;
