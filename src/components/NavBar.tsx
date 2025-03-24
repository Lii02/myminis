import '@/styles/NavBar.css';
import Link from 'next/link';
import { MdSettings } from 'react-icons/md';

export function SignInLink() {
	return (
		<Link href='/signin' className='RightButton'>
			<h4>Sign In</h4>
		</Link>
	);
}

function SettingsLink() {
	return (
		<Link href='/settings' className='RightButton'>
			<MdSettings />
		</Link>
	);
}

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
			{signedIn ? <SettingsLink /> : <SignInLink />}
		</nav>
	);
}
