import styles from '@/styles/error404.module.css';
import Link from 'next/link';

export default function Error404() {
	return (
		<div className={styles.page}>
			<h1>404: Page not found</h1>
			<Link href='/home'>
				<h3>Go Home</h3>
			</Link>
		</div>
	);
}
