import { runValidation } from '../helpers/validationHelper';

describe('Category Validations', () => {
  describe('createCategoryValidation', () => {
    it('should reject empty name', async () => {
      const errors = await runValidation('create', { name: '' });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.field === 'name')).toBe(true);
    });

    it('should reject name over 100 characters', async () => {
      const errors = await runValidation('create', { name: 'a'.repeat(101) });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.field === 'name')).toBe(true);
    });

    it('should accept valid name', async () => {
      const errors = await runValidation('create', { name: 'Work' });
      expect(errors.length).toBe(0);
    });

    it('should accept valid name with 100 characters', async () => {
      const errors = await runValidation('create', { name: 'a'.repeat(100) });
      expect(errors.length).toBe(0);
    });
  });
});
