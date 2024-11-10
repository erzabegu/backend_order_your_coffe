import {NextFunction, Request, Response} from "express";
import admin from "firebase-admin";
import {UnauthorizedException} from "../exceptions/HttpExceltions";

const verifyToken = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    const idToken = req?.headers?.authorization?.split(' ')[1];

    if (!idToken) {
        next(new UnauthorizedException("Unauthorized"))
    } else {
        try {
            await admin.auth().verifyIdToken(idToken);
            next();
        } catch (error) {
            next(new UnauthorizedException("Unauthorized"));
        }
    }
}

export default verifyToken;
