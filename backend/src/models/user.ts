import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		username: { type: String, required: true, unique: true },
	},
	{ timestamps: true },
);

async function createUser(email: string, hashedPassword: string, username: string) {
	if (await User.exists({ email: email })) {
		throw new Error(`User ${email} already exists`);
	}

	const newUser = new User({ email: email, password: hashedPassword, username: username });

	await newUser.save();
	return newUser;
}

async function getUserByEmail(email: string) {
	if (!(await User.exists({ email: email }))) {
		throw new Error();
	}
	return await User.findOne({ email: email });
}

async function getUserByUsername(username: string) {
	if (!(await User.exists({ username: username }))) {
		throw new Error();
	}
	return await User.findOne({ username: username });
}

const User = mongoose.model('User', userSchema);

export { createUser, getUserByEmail, getUserByUsername, User };
