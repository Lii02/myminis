import { BackendResponse, GenericStateProp } from '@/constants/props';

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
			return false;
		}
	} catch (error: any) {
		console.log(error.message);
		return false;
	}
	return true;
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
			return false;
		}
	} catch (error: any) {
		console.log(error.message);
		return false;
	}
	return true;
}

export { createUser, loginUser };
