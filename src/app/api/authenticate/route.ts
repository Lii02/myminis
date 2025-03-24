import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
	const cookieStore = await cookies();

	return NextResponse.json(
		{ hello: 'world' },
		{
			status: 200,
		},
	);
}
