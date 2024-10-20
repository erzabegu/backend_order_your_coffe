import {HttpException} from "../exceptions /root";
import { Request, Response} from "express";

export const errorMiddleware = (error: HttpException, req: Request, res: Response) => {
   console.log(error,"error");
    res.status(error.statusCode).json({
        message: error.message,
        error: error?.errors,
    })

}

