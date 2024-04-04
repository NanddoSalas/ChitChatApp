import express from 'express';
import 'reflect-metadata';

export const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World');
});
