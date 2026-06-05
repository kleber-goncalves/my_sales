import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default class AuthMiddleware {
    static execute(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("JWT token is missing", 401);
        }

        const [, token] = authHeader.split(" ");

        if (!token) {
            throw new AppError("Malformed JWT token", 401);
        }

        const secret = process.env.APP_SECRET || "";

        try {
            const decodedToken = verify(token, secret);

            const { sub } = decodedToken as ITokenPayload;

            req.user = {
                id: sub,
            };

            return next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new AppError("Invalid JWT token", 401);
        }
    }
}
