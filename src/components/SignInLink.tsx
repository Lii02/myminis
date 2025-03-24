'use client';
import Link from 'next/link';

export function SignInLink() {
	return (
		<Link href='/signin' className='SignIn'>
			<h4>Sign In</h4>
		</Link>
	);
}
