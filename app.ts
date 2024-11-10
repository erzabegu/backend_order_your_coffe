import dotenv from "dotenv";

dotenv.config();

import express, {Express} from 'express';
import cors from 'cors';
import routeRouter from "./src/routes";
import {errorMiddleware} from "./src/middleware/errorMiddleware";
import initFirebaseAdmin from "./src/utils/initFirebaseAdmin";


const app: Express = express();
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins (change this to specific origins in production)
    methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

app.use('/api', routeRouter);
app.use(errorMiddleware)

const port = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await initFirebaseAdmin();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to initialize Firebase Admin SDK:', error);
    }
};

startServer();