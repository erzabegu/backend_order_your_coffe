import {Router} from 'express';
import authRouter from "./auth";
import storesRouter from "./stores";
import orderRouter from "./order";

const routeRouter = Router();
routeRouter.use('/auth', authRouter)
routeRouter.use('/stores', storesRouter)
routeRouter.use('/order', orderRouter)


export default routeRouter;
