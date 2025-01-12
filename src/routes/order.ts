import {Router} from "express";
import verifyToken from "../middleware/verifyToken";
import {errorHandler} from "../utils/errorHandler";
import {createOrder, getUserOrders} from "../controllers/order";

const orderRouter: Router = Router();


orderRouter.post("/",verifyToken, errorHandler(createOrder))
orderRouter.get("/",verifyToken, errorHandler(getUserOrders))

export default orderRouter;
