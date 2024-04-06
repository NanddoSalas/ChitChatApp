import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import router from './controllers';

export const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
