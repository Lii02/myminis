import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import { connectDB } from './db';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/api/ping', async (req: Request, res: Response) => {
  const databaseList = await mongoose.connection.listDatabases();
  const packet = {
    mongoose: databaseList.databases.map((db) => db.name),
  };
  res.status(200).json(packet);
});

app.post('/api/user', async (req: Request, res: Response) => {
  const body = req.body;
  res.status(200);
});

app.listen(port, async () => {
  connectDB();
  console.log(chalk.green(`Started server at http://localhost:${port}`));
});
