import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis, RateLimiterMemory } from "rate-limiter-flexible";
import { createClient } from "redis";
import AppError from "../errors/AppError";

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    ...(process.env.REDIS_PASS ? { password: process.env.REDIS_PASS } : {}),
});

redisClient.connect().catch(console.error);

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "ratelimit",
    points: 5,
    duration: 5,

    insuranceLimiter: new RateLimiterMemory({
        points: 5,
        duration: 5,
    }),
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await limiter.consume(request.ip as string);
        return next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        if (err instanceof Error) {
            return next();
        }
        return next(new AppError("Too many requests", 429));
    }
}
