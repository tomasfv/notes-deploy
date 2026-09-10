import axios from 'axios';
import { Category } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  },

  async createCategory(name: string): Promise<Category> {
    const { data } = await api.post<Category>('/categories', { name });
    return data;
  },

  async updateCategory(id: string, name: string): Promise<Category> {
    const { data } = await api.put<Category>(`/categories/${id}`, { name });
    return data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
