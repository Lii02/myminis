import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { connectDB } from './db';
import { User } from './user';
import { checkPasswordValidity } from './password';

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
	const { email } = req.body;
	if (!email) {
		res.status(400).json({ status: false, message: 'Please provide email' });
		return;
	}

	const user = await User.find({ email: email });
	if (!user) {
		res.status(400).json({ status: false, message: 'User not found' });
	} else {
		res.status(200).json({ status: true, data: user });
	}
});

app.delete('/api/user', async (req: Request, res: Response) => {});

app.post('/api/user', async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res
			.status(400)
			.json({ status: false, message: 'Please provide all fields' });
		return;
	}
	const isPasswordValid = checkPasswordValidity(password);
	if (!isPasswordValid) {
		res.status(400).json({
			status: false,
			message: 'Password must be at least 6 characters long',
		});
		return;
	}
	const hashedPassword = crypto.hash('sha256', password, 'base64');
	const newUser = new User({
		email: email,
		password: hashedPassword,
	});

	if (await User.exists({ email: email })) {
		res.status(409).json({ status: false, message: 'User already exists' });
		return;
	}

	try {
		await newUser.save();
		res.status(201).json({ status: true, data: newUser });
		console.log(`Created user ${email} ${hashedPassword}`);
	} catch (error: any) {
		res.status(501).json({ status: false, message: error.message });
	}
});

app.listen(port, async () => {
	connectDB();
	console.log(chalk.green(`Started server at http://localhost:${port}`));
});
