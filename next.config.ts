import type { NextConfig } from 'next';
import process from 'process';

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination:
					process.env.NODE_ENV === 'development'
						? 'http://localhost:8080/api/:path*'
						: 'https://myminisapp.ue.r.appspot.com/api/:path*',
			},
		];
	},
};

export default nextConfig;
