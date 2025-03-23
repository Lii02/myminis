import { Roboto, Geist, Press_Start_2P } from 'next/font/google';

const geist = Geist({
	variable: '--font-geist',
	subsets: ['latin'],
});

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
});

const pressStart = Press_Start_2P({
	variable: '--font-press-start',
	subsets: ['latin'],
	weight: '400',
});

export function createFontClasses() {
	let result = '';
	const fonts = [geist, roboto, pressStart];
	fonts.forEach((font) => {
		result += font.variable + ' ';
	});
	result.trim();
	return result;
}
