import '@/styles/NavBar.css';
import Link from 'next/link';
import { SignInLink } from './SignInLink';

export function NavBar() {
	let signedIn = false;

	return (
		<nav>
			<h1>MyMinis</h1>
			<Link href='/home'>
				<h4>Home</h4>
			</Link>
			<Link href='/collection'>
				<h4>Collection</h4>
			</Link>
			{signedIn ? null : <SignInLink />}
		</nav>
	);
}
