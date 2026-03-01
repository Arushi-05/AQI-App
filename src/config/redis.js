const { createClient } = require('redis');

const redisClient = createClient();

redisClient.on('error', (err) => console.log('Redis Error', err));

(async () => {
  await redisClient.connect();
  console.log('Redis connected');
})();

module.exports = redisClient;