import { BackendResponse, GenericStateProp } from '@/constants/props';

async function createUser(
	email: string,
	password: string,
	username: string,
	error: GenericStateProp<string>,
) {
	try {
		const result = await fetch('/api/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password, username: username }),
		});
		const response: BackendResponse = await result.json();

		if (!response.status) {
			error.setValue(response.message);
			return false;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
	return true;
}

export { createUser };
