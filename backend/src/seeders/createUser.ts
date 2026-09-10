import bcrypt from 'bcryptjs';
import User from '../models/User';

export async function seedUser(): Promise<void> {
  const existing = await User.findOne({ where: { username: 'admin' } });
  if (existing) {
    console.log('User admin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    username: 'admin',
    password: hashedPassword,
  });
  console.log('User admin created successfully');
}
