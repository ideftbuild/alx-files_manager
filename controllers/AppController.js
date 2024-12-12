#!/usr/bin/node
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppControllers {
  static getStatus(req, res) {
    res.json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(req, res) {
    res.json({ users: await dbClient.nbUsers(), files: await dbClient.nbFiles() });
  }
}

export default AppControllers;
