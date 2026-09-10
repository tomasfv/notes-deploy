import categoryRepository from '../repositories/categoryRepository';
import { Category } from '../models';

class CategoryService {
  async getCategories(): Promise<Category[]> {
    return categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async createCategory(name: string): Promise<Category> {
    if (!name || name.trim() === '') {
      throw new Error('Category name is required');
    }
    const existing = await categoryRepository.findByName(name.trim());
    if (existing) {
      throw new Error('Category name already exists');
    }
    return categoryRepository.create(name.trim());
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    if (!name || name.trim() === '') {
      throw new Error('Category name is required');
    }
    const existing = await categoryRepository.findByName(name.trim());
    if (existing && existing.id !== id) {
      throw new Error('Category name already exists');
    }
    return categoryRepository.update(id, name.trim()) as Promise<Category>;
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    await categoryRepository.delete(id);
  }
}

export default new CategoryService();
