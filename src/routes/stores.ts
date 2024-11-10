import {Router} from "express";
import verifyToken from "../middleware/verifyToken";
import {errorHandler} from "../utils/errorHandler";
import {getStoreById, getStores} from "../controllers/stores";

const storesRouter: Router = Router();


storesRouter.get("/",verifyToken, errorHandler(getStores))
storesRouter.get("/:id",verifyToken, errorHandler(getStoreById))

export default storesRouter;
