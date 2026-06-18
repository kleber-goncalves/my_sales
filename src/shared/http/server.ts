import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { errors } from "celebrate";

import routes from "./routes";
import ErrorHandleMiddleware from "../middlewares/ErrorHandleMiddleware";
import { AppDataSource } from "../typeorm/data-source";
import rateLimiter from "../middlewares/rateLimiter";

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connected successfully");
        if (!process.env.SERVER_PORT) {
            throw new Error(
                "ERRO CRÍTICO: A variável de ambiente SERVER_PORT não foi definida no arquivo .env!",
            );
        }

        const app = express();
        const SERVER_PORT = Number(process.env.SERVER_PORT);

        app.use(cors());
        app.use(express.json());

        app.use(rateLimiter);

        app.use(routes);
        app.use(errors());
        app.use(ErrorHandleMiddleware.handleError);

        app.listen(SERVER_PORT, () => {
            console.log("Server is running on port " + SERVER_PORT);
        });
    })
    .catch((error) => {
        console.error("Application failed to start:", error.message || error);
        process.exit(1); // Força o Node.js a encerrar o processo imediatamente
    });
