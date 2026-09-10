import categoryService from '../../services/categoryService';
import categoryRepository from '../../repositories/categoryRepository';

jest.mock('../../repositories/categoryRepository');

const mockCategoryRepository = categoryRepository as jest.Mocked<typeof categoryRepository>;

describe('CategoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should throw error when name is empty', async () => {
      await expect(categoryService.createCategory(''))
        .rejects.toThrow('Category name is required');
    });

    it('should throw error when name is only whitespace', async () => {
      await expect(categoryService.createCategory('   '))
        .rejects.toThrow('Category name is required');
    });

    it('should throw error when name already exists', async () => {
      mockCategoryRepository.findByName.mockResolvedValue({ id: '1', name: 'Work' } as any);

      await expect(categoryService.createCategory('Work'))
        .rejects.toThrow('Category name already exists');
    });

    it('should trim name before creating', async () => {
      mockCategoryRepository.findByName.mockResolvedValue(null);
      mockCategoryRepository.create.mockResolvedValue({} as any);

      await categoryService.createCategory('  Work  ');

      expect(mockCategoryRepository.create).toHaveBeenCalledWith('Work');
    });
  });

  describe('deleteCategory', () => {
    it('should throw error when category not found', async () => {
      mockCategoryRepository.findById.mockResolvedValue(null);

      await expect(categoryService.deleteCategory('nonexistent'))
        .rejects.toThrow('Category not found');
    });
  });
});
