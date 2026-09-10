import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

interface JwtPayload {
  userId: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await User.findByPk(decoded.userId, { attributes: { exclude: ['password'] } });

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    (req as any).userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
