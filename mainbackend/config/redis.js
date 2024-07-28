const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost', // or the IP address of your Redis server
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: function (times) {
    // Reconnect after
    const delay = Math.min(times * 50, 2000);
    console.log(`Redis reconnect attempt #${times} after ${delay}ms`);
    return delay;
  },
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisClient.on('end', () => {
  console.log('Redis client disconnected');
});

redisClient.on('reconnecting', () => {
  console.log('Redis client reconnecting');
});

module.exports = redisClient;
