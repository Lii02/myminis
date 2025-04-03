import crypto from 'crypto';

function checkPasswordValidity(password: string) {
	if (password.length < 6) {
		return false;
	}
	return true;
}

function createPassword(password: string) {
	const isPasswordValid = checkPasswordValidity(password);
	if (!isPasswordValid) {
		throw new Error('Password must be at least 6 characters');
	}
	const hashedPassword = crypto.hash('sha256', password, 'base64');
	return hashedPassword;
}

export { checkPasswordValidity, createPassword };
