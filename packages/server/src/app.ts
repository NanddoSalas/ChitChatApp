import cors from 'cors';
import express from 'express';
import 'reflect-metadata';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World');
});
