import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api',
});

export interface AuthUser {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export const authService = {
  async login(username: string, password: string): Promise<string> {
    const { data } = await api.post<{ token: string }>('/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    return data.token;
  },

  async getMe(): Promise<AuthUser> {
    const token = localStorage.getItem('token');
    const { data } = await api.get<AuthUser>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  logout(): void {
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },
};
