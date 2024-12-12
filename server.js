#!/usr/bin/node
import express from 'express';
import router from './routes/index';

const port = process.env.PORT;

const app = express();
app.use('/', router);

app.listen(port);
