import { noteSchema } from '../../validations/note';

describe('Note Schema (Zod)', () => {
  it('should reject empty title', () => {
    const result = noteSchema.safeParse({ title: '', content: 'Content' });
    expect(result.success).toBe(false);
  });

  it('should reject title over 200 characters', () => {
    const result = noteSchema.safeParse({ title: 'a'.repeat(201), content: 'Content' });
    expect(result.success).toBe(false);
  });

  it('should reject empty content', () => {
    const result = noteSchema.safeParse({ title: 'Title', content: '' });
    expect(result.success).toBe(false);
  });

  it('should accept valid data', () => {
    const result = noteSchema.safeParse({ title: 'My Note', content: 'Some content' });
    expect(result.success).toBe(true);
  });

  it('should trim whitespace', () => {
    const result = noteSchema.safeParse({ title: '  My Note  ', content: '  Content  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('My Note');
      expect(result.data.content).toBe('Content');
    }
  });

  it('should accept title with exactly 200 characters', () => {
    const result = noteSchema.safeParse({ title: 'a'.repeat(200), content: 'Content' });
    expect(result.success).toBe(true);
  });
});
