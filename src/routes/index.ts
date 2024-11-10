import {Router} from 'express';
import authRouter from "./auth";
import storesRouter from "./stores";

const routeRouter = Router();
routeRouter.use('/auth', authRouter)
routeRouter.use('/stores', storesRouter)


export default routeRouter;
