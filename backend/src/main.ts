import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import mongoose from 'mongoose';
import { connectDB } from './db';
import { createUser, getUserByEmail, getUsersByUsername } from './user';
import { createPassword } from './password';

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

app.get('/api/user', async (req: Request, res: Response) => {
	const { email, username } = req.query;
	if (email) {
		try {
			const user = await getUserByEmail(email as string);
			res.status(200).json({ status: true, data: user });
		} catch (error: any) {
			res.status(400).json({ status: false, message: error.message });
		}
	} else if (username) {
		try {
			const user = await getUsersByUsername(username as string);
			res.status(200).json({ status: true, data: user });
		} catch (error: any) {
			res.status(400).json({ status: false, message: error.message });
		}
	} else {
		res
			.status(400)
			.json({ status: false, message: 'Please provide all fields' });
		return;
	}
});

app.delete('/api/user', async (req: Request, res: Response) => {
	const { email } = req.query;
});

app.post('/api/user', async (req: Request, res: Response) => {
	const { email, password, username } = req.body;
	if (!email || !password || !username) {
		res
			.status(400)
			.json({ status: false, message: 'Please provide all fields' });
		return;
	}

	let hashedPassword = '';
	try {
		hashedPassword = createPassword(password);
	} catch (error: any) {
		res.status(400).json({ status: false, message: error.message });
		return;
	}

	try {
		const user = await createUser(email, hashedPassword, username);
		res.status(201).json({ status: true, data: user });
		console.log(`Created user ${email} ${hashedPassword} ${username}`);
	} catch (error: any) {
		res.status(400).json({ status: false, message: error.message });
	}
});

app.post('/api/login', async (req: Request, res: Response) => {
	const { email, password } = req.query;
});

app.listen(port, async () => {
	connectDB();
	console.log(chalk.green(`Started server at http://localhost:${port}`));
});
