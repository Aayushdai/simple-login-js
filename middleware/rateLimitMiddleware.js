import { redisClient } from "../config/redis.js";
import logger from "../config/logger.js";

const WINDOW_SECONDS =60;
const MAX_REQUESTS = 5;

export const rateLimiter = async (req, res, next) => {
    try {
        const clientIP = req.ip;

        const key = `rate-limit:${clientIP}`;

        const requestCount = await redisClient.incr(key);

        if(requestCount === 1) {
            await redisClient.expire(key, WINDOW_SECONDS);

        }
        res.setHeader("RateLimit-Limit", MAX_REQUESTS);
        res.setHeader(
        "RateLimit-Remaining",
        Math.max(0, MAX_REQUESTS - requestCount)
        );

        if(requestCount > MAX_REQUESTS) {
            const ttl = await redisClient.ttl(key);
            logger.warn("Rate limit exceeded", {
                clientIP,
            });
            res.setHeader("Retry-After", ttl);
            return res.status(429).json({
                
                message: `Rate limit exceeded. Try again in ${ttl} seconds.`,
            });
        }
        console.log("Client IP:", clientIP);
        console.log("Request count:", requestCount);
        next();
    }catch(error){
        next(error);
    }
};