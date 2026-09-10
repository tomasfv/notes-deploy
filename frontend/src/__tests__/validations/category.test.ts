import { categorySchema } from '../../validations/category';

describe('Category Schema (Zod)', () => {
  it('should reject empty name', () => {
    const result = categorySchema.safeParse({ name: '' });
    expect(result.success).toBe(false);
  });

  it('should reject name over 100 characters', () => {
    const result = categorySchema.safeParse({ name: 'a'.repeat(101) });
    expect(result.success).toBe(false);
  });

  it('should accept valid name', () => {
    const result = categorySchema.safeParse({ name: 'Work' });
    expect(result.success).toBe(true);
  });

  it('should accept name with exactly 100 characters', () => {
    const result = categorySchema.safeParse({ name: 'a'.repeat(100) });
    expect(result.success).toBe(true);
  });

  it('should trim whitespace', () => {
    const result = categorySchema.safeParse({ name: '  Work  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Work');
    }
  });
});
