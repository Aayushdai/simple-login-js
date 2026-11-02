import { createClient} from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (error)=> {
    console.error("Redis Client Error", error);
})

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Redis connected successfully");
    }catch (error) {
        console.error("Redis connection failed:", error.message);
        process.exit(1);
    }
};
