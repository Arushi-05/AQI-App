const redisClient = require('../config/redis');

const rateLimmiter = (limit = 5, window = 60) => {
    return async (req, res, next) => {
        console.log("Entering rate limitter")
        const ip = req.ip
        const key = `rate_limit:${ip}`;
        try {
            const count = await redisClient.incr(key);
            if (count === 1) {
                await redisClient.expire(key, window);
            }
            res.setHeader("X-RateLimit-Limit", limit);
            res.setHeader("X-RateLimit-Remaining", Math.max(limit - count, 0));

            if (count > limit) {
                return res.status(429).json({
                    message: "Too many requests"
                });
            }
            console.log("Existing rate limitter")
            next()

        }
        catch (error) {
            console.error("Rate limiter error:", error);
            next();

        }
    }
}

module.exports = rateLimmiter;