import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import { AppError } from "../../../errors/AppError";

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  });

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5,
    duration: 5,
  });

  try {
    await limiter.consume(req.ip);

    return next();
  } catch (error) {
    throw new AppError("Too Many Requests", 429);
  }
}
