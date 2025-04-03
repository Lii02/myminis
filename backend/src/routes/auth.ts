import { Request, Response, Router } from 'express';
import {
	createUser,
	getUserByEmail,
	getUsersByUsername,
	User,
} from '../db/user';
import { createPassword } from '../db/password';

const authRoutes = Router();

authRoutes.get('/', async (req: Request, res: Response) => {
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

authRoutes.delete('/', async (req: Request, res: Response) => {
	const { email } = req.body;
	if (!email) {
		res
			.status(400)
			.json({ status: false, message: 'Please provide all fields' });
		return;
	}

	try {
		const result = await User.deleteOne({ email: email });
		res.status(202).json({ status: result.acknowledged });
		console.log(`Deleted user ${email}`);
	} catch (error: any) {
		res.status(400).json({ status: false, message: error.message });
	}
});

authRoutes.post('/', async (req: Request, res: Response) => {
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

authRoutes.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body;
});

export { authRoutes };
