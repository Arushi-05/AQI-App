const redisClient = require('../config/redis')

const cacheMiddleware = (ttl = 120) => {
    return async (req, res, next) => {
        const key = req.originalUrl;
        try {
            const cachedData = await redisClient.get(key);
            console.log("Cache fetched from Redis");
            if (cachedData) {
                console.log("Cache HIT");
                return res.json(JSON.parse(cachedData));
            }
            console.log("Cache MISS");
            const originalJson = res.json.bind(res);
            console.log("Original JSON function bound");
            res.json = async (data) => {
                console.log("Cache set in Redis");
                await redisClient.setEx(key, ttl, JSON.stringify(data));
                console.log("Cache set in Redis ttl set to 120 seconds");
                return originalJson(data);
            };
            console.log("Next middleware called");
            next();
        }
        catch (error) {
            console.error(error);
            next();
        }
    }
}

module.exports = cacheMiddleware;