import { runValidation } from '../helpers/validationHelper';

describe('Note Validations', () => {
  describe('createNoteValidation', () => {
    it('should reject empty title', async () => {
      const errors = await runValidation('create', { title: '', content: 'Some content' });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.field === 'title')).toBe(true);
    });

    it('should reject title over 200 characters', async () => {
      const errors = await runValidation('create', { title: 'a'.repeat(201), content: 'Some content' });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.field === 'title')).toBe(true);
    });

    it('should reject empty content', async () => {
      const errors = await runValidation('create', { title: 'My Note', content: '' });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.field === 'content')).toBe(true);
    });

    it('should accept valid data', async () => {
      const errors = await runValidation('create', { title: 'My Note', content: 'Some content' });
      expect(errors.length).toBe(0);
    });

    it('should accept valid data with categoryIds', async () => {
      const errors = await runValidation('create', {
        title: 'My Note',
        content: 'Some content',
        categoryIds: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(errors.length).toBe(0);
    });

    it('should reject invalid UUID in categoryIds', async () => {
      const errors = await runValidation('create', {
        title: 'My Note',
        content: 'Some content',
        categoryIds: ['not-a-uuid'],
      });
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
