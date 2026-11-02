import { connectRedis, redisClient } from "./config/redis.js";

const testRedis = async () => {
    try{
        await connectRedis();

        await redisClient.set("test", "Redis is working");

        const result = await redisClient.get("test");

        console.log("Redis test result:", result);

    }catch (error) {
        console.error(error);
    }finally {
        await redisClient.quit();
    }
};

testRedis();