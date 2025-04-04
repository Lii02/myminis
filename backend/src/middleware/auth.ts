import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

interface AuthRequest extends Request {
	user?: string | JwtPayload | undefined;
}

function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
	const token = req.cookies.token;
	if (!token) {
		res.status(401).json({ status: false, message: 'Unauthorized' });
		return;
	}

	jwt.verify(
		token,
		process.env.JWT_SECRET!,
		(err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
			if (err) {
				res.status(403).json({ status: false, message: 'Invalid JWT' });
				return;
			}
			req.user = decoded;
			next();
		},
	);
}

export { type AuthRequest, requireAuth };
