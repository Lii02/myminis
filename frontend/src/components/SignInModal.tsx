'use client';
import { useState } from 'react';
import { Modal } from './Modal';
import { BackendResponse, ModalFormProps, GenericStateProp } from '@/constants/props';

enum CurrentForm {
	SIGNIN = 0,
	SIGNUP = 1,
}

function SignInForm(props: ModalFormProps) {
	const [error, setError] = useState('');

	const signIn = async (formData: FormData) => {
		const [email, password] = formData.entries();

		try {
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h2>Sign In</h2>
			<form action={signIn}>
				<input name='email' type='email' placeholder='Email' />
				<input name='password' type='password' placeholder='Password' />
				<button type='submit' className='SubmitButton'>
					Sign In
				</button>
			</form>
			<p className='ErrorMessage'>{error}</p>
			<p>
				Dont have an account?{' '}
				<button
					onClick={() => {
						props.form.setValue(CurrentForm.SIGNUP);
					}}>
					Sign Up
				</button>
			</p>
		</>
	);
}

function SignUpForm(props: ModalFormProps) {
	const [error, setError] = useState('');

	const signUp = async (formData: FormData) => {
		const [email, password, username] = formData.entries();

		try {
			const result = await fetch('/api/user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email[1] as string,
					password: password[1] as string,
					username: username[1] as string,
				}),
			});
			const response: BackendResponse = await result.json();

			if (response.status) {
				props.modal.setValue(false);
				props.form.setValue(CurrentForm.SIGNIN);
			} else {
				setError(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h2>Sign Up</h2>
			<form action={signUp}>
				<input name='email' type='email' placeholder='Email' required />
				<input name='password' type='password' placeholder='Password' required />
				<input name='username' type='text' placeholder='Username' required />
				<button type='submit' className='SubmitButton'>
					Sign Up
				</button>
			</form>
			<p className='ErrorMessage'>{error}</p>
		</>
	);
}

function SignInModal(props: GenericStateProp<boolean>) {
	const [currentForm, setCurrentForm] = useState(CurrentForm.SIGNIN);

	const stateProps: GenericStateProp<number> = { value: currentForm, setValue: setCurrentForm };

	return (
		<Modal
			isOpen={props.value}
			onClose={() => {
				props.setValue(false);
				setCurrentForm(CurrentForm.SIGNIN);
			}}>
			{currentForm ? (
				<SignUpForm form={stateProps} modal={props} />
			) : (
				<SignInForm form={stateProps} modal={props} />
			)}
		</Modal>
	);
}

export { SignInModal };
