import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export const authService = {
  async login(username: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return token;
  },

  async getUserFromToken(token: string): Promise<Omit<User, 'password'> | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await User.findByPk(decoded.userId, { attributes: { exclude: ['password'] } });
      return user;
    } catch {
      return null;
    }
  },
};
