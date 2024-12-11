#!/usr/bin/node

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${host}:${port}`;
    this.dbName = database;

    this.client = new MongoClient(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    (async () => {
      try {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
      } catch (err) {
        console.error('Failed to connect to MongoDB', err);
      }
    })();
  }

  isAlive() {
    return this.client.topology.isConnected();
  }

  async nbUsers() {
    if (!this.isAlive()) return 0;
    try {
      return await this.db.collection('users').countDocuments();
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  async nbFiles() {
    if (!this.isAlive()) return 0;
    try {
      return await this.db.collection('files').countDocuments();
    } catch (err) {
      console.error(err);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
