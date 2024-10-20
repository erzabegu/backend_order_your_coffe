import {NextFunction, Request, Response} from "express";
import {HttpException} from "../exceptions /root";
import {InternalException} from "../exceptions /HttpExceltions";
import {FirebaseError} from "firebase/app";
import {ZodError} from "zod";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error) {
            let exception: HttpException
            if (error instanceof HttpException) {
                exception = error
            } else if (error instanceof FirebaseError) {
                exception = new InternalException("Firebase error occurred!", error)
            } else if (error instanceof ZodError) {
                exception = new InternalException("ZodError occurred!", error)
            } else {
                exception = new InternalException("Something went wrong!", error)
            }
            next(exception)
        }
    }
}