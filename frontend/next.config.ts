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
						? 'http://localhost:5000/:path*'
						: 'https://myminis-31f8130e43e3.herokuapp.com/:path*',
			},
		];
	},
};

export default nextConfig;
