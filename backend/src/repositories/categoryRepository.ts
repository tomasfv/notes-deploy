import { Category } from '../models';

class CategoryRepository {
  async findAll(): Promise<Category[]> {
    return Category.findAll({ order: [['name', 'ASC']] });
  }

  async findById(id: string): Promise<Category | null> {
    return Category.findByPk(id);
  }

  async findByName(name: string): Promise<Category | null> {
    return Category.findOne({ where: { name } });
  }

  async create(name: string): Promise<Category> {
    return Category.create({ name });
  }

  async update(id: string, name: string): Promise<Category | null> {
    const category = await Category.findByPk(id);
    if (!category) return null;
    await category.update({ name });
    return category;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await Category.destroy({ where: { id } });
    return deleted > 0;
  }
}

export default new CategoryRepository();
