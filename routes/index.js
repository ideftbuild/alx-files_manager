#!/usr/bin/node
import express from 'express';
import AppControllers from '../controllers/AppController';

const router = express.Router();

router.get('/status', AppControllers.getStatus);
router.get('/stats', AppControllers.getStats);

export default router;
