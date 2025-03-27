function checkPasswordValidity(password: string) {
	if (password.length < 6) {
		return false;
	}
	return true;
}

export { checkPasswordValidity };
