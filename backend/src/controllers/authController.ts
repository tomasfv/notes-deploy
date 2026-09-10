import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      res.json({ token });
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async me(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const user = await authService.getUserFromToken(token);
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      res.json(user);
    } catch {
      res.status(401).json({ message: 'Unauthorized' });
    }
  },
};
