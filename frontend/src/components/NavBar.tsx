'use client';
import styles from '@/styles/NavBar.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { MdAdd, MdSettings } from 'react-icons/md';
import { SignInModal } from './SignInModal';
import { useGlobalContext } from '@/util/context';

export function SignInLink() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsOpen(true)}>Sign In</button>
			<SignInModal value={isOpen} setValue={setIsOpen} />
		</>
	);
}

function AddLink() {
	return (
		<Link href='/add' className={styles.RightButton}>
			<MdAdd />
		</Link>
	);
}

function SettingsLink() {
	return (
		<Link href='/settings' className={styles.RightButton}>
			<MdSettings />
		</Link>
	);
}

function UserOptions() {
	return (
		<>
			<AddLink />
			<SettingsLink />
		</>
	);
}

export function NavBar() {
	const state = useGlobalContext();
	const signedIn = state.user !== null;

	return (
		<nav className={styles.nav}>
			<h1>MyMinis</h1>
			<Link href='/home'>
				<h4>Home</h4>
			</Link>
			<Link href='/collection'>
				<h4>Collection</h4>
			</Link>
			<div className={styles.RightSide}>{signedIn ? <UserOptions /> : <SignInLink />}</div>
		</nav>
	);
}
