import { BackendResponse, GenericStateProp } from '@/constants/props';

interface User {
	id: string;
	email: string;
	password: string;
	username: string;
	createdAt: Date;
	updatedAt: Date;
}

async function createUser(
	email: string,
	password: string,
	username: string,
	errorState: GenericStateProp<string>,
) {
	try {
		const result = await fetch('/api/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password, username: username }),
		});
		const response: BackendResponse = await result.json();

		if (!response.status) {
			errorState.setValue(response.message);
			return null;
		}
		return response.data;
	} catch (error: any) {
		console.log(error.message);
		return null;
	}
}

async function loginUser(email: string, password: string, errorState: GenericStateProp<string>) {
	try {
		const result = await fetch('/api/user/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password }),
		});
		const response: BackendResponse = await result.json();

		if (!response.status) {
			errorState.setValue(response.message);
			return null;
		}
		return response.data;
	} catch (error: any) {
		console.log(error.message);
		return null;
	}
}

export { type User, createUser, loginUser };
