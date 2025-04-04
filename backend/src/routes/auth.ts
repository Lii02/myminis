import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, getUserByUsername, User } from '../models/user';
import { createPassword } from '../models/password';

const authRoutes = Router();
const jwtSecret = process.env.JWT_SECRET;

authRoutes.get('/', async (req: Request, res: Response) => {
	const { email, username } = req.query;
	if (email) {
		try {
			const user = await getUserByEmail(email as string);
			res.json({ status: true, data: user });
		} catch {
			res.status(400).json({ status: false, message: 'Failed to get user by email' });
		}
	} else if (username) {
		try {
			const user = await getUserByUsername(username as string);
			res.json({ status: true, data: user });
		} catch {
			res.status(400).json({ status: false, message: 'Failed to get user by username' });
		}
	} else {
		res.status(400).json({ status: false, message: 'Please provide all fields' });
		return;
	}
});

authRoutes.delete('/', async (req: Request, res: Response) => {
	const { email } = req.body;
	if (!email) {
		res.status(400).json({ status: false, message: 'Please provide all fields' });
		return;
	}

	try {
		const result = await User.deleteOne({ email: email });
		res.clearCookie('token');
		res.status(202).json({ status: result.acknowledged });
		console.log(`Deleted user ${email}`);
	} catch {
		res.status(400).json({ status: false, message: 'Failed to delete user' });
	}
});

authRoutes.post('/', async (req: Request, res: Response) => {
	const { email, password, username } = req.body;
	if (!email || !password || !username) {
		res.status(400).json({ status: false, message: 'Please provide all fields' });
		return;
	}

	let hashedPassword = '';
	try {
		hashedPassword = createPassword(password);
	} catch {
		res.status(400).json({ status: false, message: 'Invalid password' });
		return;
	}

	try {
		const user = await createUser(email, hashedPassword, username);
		res.status(201).json({ status: true, data: user });
		console.log(`Created user ${email} ${hashedPassword} ${username}`);
	} catch {
		res.status(400).json({ status: false, message: 'Failed to create user' });
	}
});

authRoutes.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ status: false, message: 'Please provide all fields' });
		return;
	}
	const hashedPassword = createPassword(password);

	try {
		const user = await User.findOne({ email: email, password: hashedPassword });
		const token = jwt.sign({ id: user!.id, username: user!.username }, jwtSecret!, {
			expiresIn: '1h',
		});
		res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
		res.json({ status: true, data: token });
	} catch {
		res.status(400).json({ status: false, message: 'Invalid email or password' });
	}
});

authRoutes.post('/logout', (req: Request, res: Response) => {
	res.clearCookie('token');
	res.json({ status: true });
});

export { authRoutes };
