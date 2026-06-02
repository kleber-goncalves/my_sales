import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";

import routes from "./routes";
import ErrorHandleMiddleware from "../middlewares/ErrorHandleMiddleware";
import {AppDataSource} from "../typeorm/data-source";

AppDataSource.initialize()
    .then(async () => {
        const app = express();

        app.use(cors());
        app.use(express.json());

        app.use(routes);
        app.use(ErrorHandleMiddleware.haddleError);

        console.log("Database connected");

        app.listen(5432, () => {
            console.log("Server is running on port 5432");
        });

    })
    .catch((error) => {
        console.error("failed to connect to database", error);
    });

