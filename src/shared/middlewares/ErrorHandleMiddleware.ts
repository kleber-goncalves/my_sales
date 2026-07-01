import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

export default class ErrorHandleMiddleware {
    public static handleError(
        error: Error,
        _req: Request,
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _next: NextFunction,
    ) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                type: "error",
                message: error.message,
            });
        }

        // ADICIONE ESTE BLOCO: Se o erro for interno (500), cospe a stack real no terminal do Jest!
        if (
            process.env.NODE_ENV === "test" ||
            process.env.NODE_ENV === "development"
        ) {
            console.error("=== DETALHE DO ERRO 500 ===");
            console.error(error);
            console.error("===========================");
        }

        return res.status(500).json({
            type: "error",
            message: "Internal server error",
        });
    }
}
