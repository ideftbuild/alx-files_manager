#!/usr/bin/node
import crypto from 'crypto';
import dbClient from '../utils/db';

class UsersControllers {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send('Missing email');
    }

    if (!password) {
      return res.status(400).send('Missing password');
    }

    const user = dbClient.db.collection('users').findOne({ email });
    if (user) {
      return res.status(400).send('Already exist');
    }

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    const response = await dbClient.db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ id: response.insertedId, email });
  }
}

export default UsersControllers;
