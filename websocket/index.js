const WebSocket = require('ws');
const Redis = require('ioredis');


const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  reconnectOnError: function (err) {
    console.log('Redis reconnecting due to error:', err);
    return true;
  },
  retryStrategy: function (times) {
    console.log(`Redis reconnect attempt #${times}`);
    return Math.min(times * 50, 2000);
  }
});


redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.log('Redis client error:', err);
});

redisClient.on('end', () => {
  console.log('Redis client disconnected');
});

redisClient.on('reconnecting', () => {
  console.log('Redis client reconnecting');
});


const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

ws.on('open', () => {
  console.log('WebSocket connection opened');
});

ws.on('message', (message) => {
  const data = JSON.parse(message);
  const currentPrice = parseFloat(data.p);

  redisClient.publish('price_updates', JSON.stringify({ coin: 'BTC', price: currentPrice }));
  
});

ws.on('error', (err) => {
  console.log('WebSocket error:', err);
});

ws.on('close', () => {
  console.log('WebSocket connection closed');
});
