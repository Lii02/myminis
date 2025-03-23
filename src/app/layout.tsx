import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { createFontClasses } from '@/constants/fonts';
import { NavBar } from '@/components/NavBar';

export const metadata: Metadata = {
	title: 'MyMinis',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={createFontClasses()}>
				<ThemeProvider themes={['light', 'dark']}>
					<NavBar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
