import { redisClient} from "../config/redis.js";

export const cacheResponse = async (req,res,next) => {
    const orginalJson = res.json.bind(res);

    res.json = async (data) => {
        if(res.locals.cacheKey && res.statusCode < 400) {
            try {
                await redisClient.setEx(
                    res.locals.cacheKey,
                    res.locals.cacheExpiration,
                    JSON.stringify(data)
                );
                console.log("Response cached successfully");
            }catch(error) {
                console.error("Error caching response:", error.message);
            }
            }
            return orginalJson(data);
        };
        next();
    };
