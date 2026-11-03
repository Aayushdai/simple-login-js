import { redisClient } from "../config/redis.js";

export const cacheMiddleware = (key, expiration = 60) => {
    return async (req,res,next) => {
        try {
            const cachedData = await redisClient.get(key);

            if(cachedData) {
                console.log("Cache HIT");
                return res.status(200).json(JSON.parse(cachedData));
        }
        console.log("Cache MISS");

        // const originalJSON = res.json.bind(res);

        // res.json = (data) => {
        //     redisClient
        //     .setEx(key, expiration, JSON.stringify(data))
        //     .catch((error) => {
        //         console.error("Cache storage error:", error.message);

        //     });
        //     return originalJSON(data);
        // };
        console.log("Cache MISS");

        res.locals.cacheKey = key;
        res.locals.cacheExpiration = expiration;

        next();
    }catch(error) {
        console.error("Redis cache error:", error.message);
        next();
    }
    };
};