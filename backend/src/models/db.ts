import mongoose from 'mongoose';
import process from 'process';

async function connectDB() {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017');
		console.log(`Connected to MongoDB: ${conn.connection.host}`);
	} catch (error: any) {
		console.log(`Failed to connect to MongoDB: ${error.message}`);
		process.exit(1);
	}
}

export { connectDB };
