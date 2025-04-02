'use client';
import { useState } from 'react';
import { Modal } from './Modal';
import { GenericStateProp } from '@/constants/props';

function SignInForm(props: GenericStateProp<boolean>) {
	const signIn = (formData: FormData) => {};

	return (
		<>
			<h2>Sign In</h2>
			<form action={signIn}>
				<input type='email' placeholder='Email' />
				<input type='password' placeholder='Password' />
				<button type='submit' className='SubmitButton'>
					Sign In
				</button>
			</form>
			<p>
				Dont have an account?{' '}
				<button onClick={() => props.setValue(true)}>Sign Up</button>
			</p>
		</>
	);
}

function SignUpForm() {
	const signUp = (formData: FormData) => {};

	return (
		<>
			<h2>Sign Up</h2>
			<form action={signUp}>
				<input type='email' placeholder='Email' />
				<input type='password' placeholder='Password' />
				<button type='submit' className='SubmitButton'>
					Sign Up
				</button>
			</form>
		</>
	);
}

function SignInModal(props: GenericStateProp<boolean>) {
	const [signingUp, setSigningUp] = useState(false);

	return (
		<Modal
			isOpen={props.value}
			onClose={() => {
				props.setValue(false);
				setSigningUp(false);
			}}>
			{signingUp ? (
				<SignUpForm />
			) : (
				<SignInForm value={signingUp} setValue={setSigningUp} />
			)}
		</Modal>
	);
}

export { SignInModal };
