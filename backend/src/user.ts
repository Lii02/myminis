import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
	email: String,
	password: Number,
});

export const User = mongoose.model('User', userSchema);
