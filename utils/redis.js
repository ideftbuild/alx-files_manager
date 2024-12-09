#!/usr/bin/node
import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.asyncGet = promisify(this.client.get).bind(this.client);
    this.asyncSetex = promisify(this.client.setex).bind(this.client);
    this.asyncDel = promisify(this.client.del).bind(this.client);
    this.asyncQuit = promisify(this.client.quit).bind(this.client);
    // Log any redis client errors
    this.client.on('error', (err) => {
      console.log('Redis Client Error', err);
    });
  }

  isAlive() {
    return this.client.connected && this.client.ready;
  }

  async get(key) {
    return this.asyncGet(key);
  }

  async set(key, duration, value) {
    this.asyncSetex(key, value, duration);
  }

  async del(key) {
    this.asyncDel(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
