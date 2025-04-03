import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	},
);

async function createUser(email: string, hashedPassword: string, username: string) {
	if (await User.exists({ email: email })) {
		throw new Error(`User ${email} already exists`);
	}

	const newUser = new User({
		email: email,
		password: hashedPassword,
		username: username
	});

	await newUser.save();
	return newUser;
}

async function getUserByEmail(email: string) {
	if(!await User.exists({ email: email })) {
		throw new Error(`User ${email} doesn't exist`);
	}
	return await User.findOne({ email: email });
}

async function getUsersByUsername(username: string) {
	if(!await User.exists({ username: username })) {
		throw new Error(`User ${username} doesn't exist`);
	}
	return await User.find({ username: username });
}

const User = mongoose.model('User', userSchema);

export { createUser, getUserByEmail, getUsersByUsername, User };