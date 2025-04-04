'use client';
import { useState } from 'react';
import { Modal } from './Modal';
import { ModalFormProps, GenericStateProp } from '@/constants/props';
import { createUser } from '@/util/user';

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

		const createResult = await createUser(
			email[1] as string,
			password[1] as string,
			username[1] as string,
			{ value: error, setValue: setError },
		);

		if (createResult) {
			props.form.setValue(CurrentForm.SIGNIN);
			props.modal.setValue(false);
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
