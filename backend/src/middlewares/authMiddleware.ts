import { Request, Response, NextFunction } from 'express';
import { verifyClerkToken, UserFromToken } from '../utils/verifyClerkToken';

export interface AuthRequest extends Request {
  user?: UserFromToken;
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = await verifyClerkToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
