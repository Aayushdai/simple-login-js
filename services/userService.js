import User from '../models/User.js';
import  { redisClient } from '../config/redis.js';


export const getAllUsers = async () => {

    const cacheKey = "users";

    try {
        const cachedData = await redisClient.get(cacheKey);

        if(cachedData) {
            console.log("Cache HIT");
            return JSON.parse(cachedData);
        }
    }catch(error) {
        console.error("Redis cache read error:", error.message);
    }

    console.log("Cache MISS");

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
        console.log("Response cached successfully");
    }catch (error) {
        console.error("Redis cache write error:", error.message);
    }
    return userData;
    };