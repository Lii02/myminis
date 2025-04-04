import '@/styles/globals.css';
import '@/styles/builtins.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { createFontClasses } from '@/constants/fonts';
import { NavBar } from '@/components/NavBar';
import { GlobalStateProvider } from '@/util/context';

export const metadata: Metadata = { title: 'MyMinis' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={createFontClasses()}>
				<ThemeProvider themes={['light', 'dark']}>
					<GlobalStateProvider>
						<NavBar />
						{children}
					</GlobalStateProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
