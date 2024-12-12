#!/usr/bin/node
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppControllers {
  static getStatus(req, res) {
    res.json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static getStats(req, res) {
    res.json({ users: dbClient.nbUsers(), files: dbClient.nbFiles() });
  }
}

export default AppControllers;
