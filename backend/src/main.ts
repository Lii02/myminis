import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './db/db';
import { authRoutes } from './routes/auth';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', authRoutes);

app.get('/api/ping', async (req: Request, res: Response) => {
	const databaseList = await mongoose.connection.listDatabases();
	const packet = {
		mongoose: databaseList.databases.map((db) => db.name),
	};
	res.status(200).json(packet);
});

app.listen(port, async () => {
	connectDB();
	console.log(`Started server at http://localhost:${port}`);
});
