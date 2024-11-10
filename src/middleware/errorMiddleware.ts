import { Request, Response, NextFunction } from "express";
import {HttpException} from "../exceptions/root";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(error?.statusCode || 500).json({
        message: error.message,
        error: error?.errors,
    });
};
