import express from "express";
import routes from "./routes";
import cors from "cors";
import 'express-async-errors';
import ErrorHandleMiddleware from "../middlewares/ErrorHandleMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(ErrorHandleMiddleware.haddleError);

app.listen(3333, () => {
    console.log("Server is running on port 3333")
});
