#!/usr/bin/node
import express from 'express';
import AppControllers from '../controllers/AppController';
import UsersControllers from '../controllers/UsersController';

const router = express.Router();

router.get('/status', AppControllers.getStatus);
router.get('/stats', AppControllers.getStats);
router.post('/users', UsersControllers.postNew);

export default router;
