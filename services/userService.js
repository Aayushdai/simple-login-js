import User from '../models/User.js';
import  { redisClient } from '../config/redis.js';
import logger from '../config/logger.js';

export const getAllUsers = async () => {

    const cacheKey = "users";

    try {
        const cachedData = await redisClient.get(cacheKey);

        if(cachedData) {
            logger.info("Cache HIT");
            return JSON.parse(cachedData);
        }
    }catch(error) {
        logger.error("Redis cache read error:", error.message);
    }

    logger.info("Cache MISS");

    const users = await User.findAll({
        attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "role"
        ]
    });

    const userData = {
        success: true,
        count: users.length,
        users
    };

    try {
        await redisClient.setEx(
            cacheKey,
            60,
            JSON.stringify(userData)
        );
        logger.info("Response cached successfully");
    }catch (error) {
        logger.error("Redis cache write error:", error.message);
    }
    return userData;
    };