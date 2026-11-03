import { createClient} from "redis";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

logger.info("Redis client initialized.");

redisClient.on("error", (error)=> {
    logger.error("Redis Client Error", error);
})

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        logger.info("Redis connected successfully");
    }catch (error) {
        logger.error("Redis connection failed:", error.message);
        process.exit(1);
    }
};
