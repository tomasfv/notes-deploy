import noteService from '../../services/noteService';
import noteRepository from '../../repositories/noteRepository';

jest.mock('../../repositories/noteRepository');

const mockNoteRepository = noteRepository as jest.Mocked<typeof noteRepository>;

describe('NoteService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createNote', () => {
    it('should throw error when title is empty', async () => {
      await expect(noteService.createNote({ title: '', content: 'Content' }))
        .rejects.toThrow('Title is required');
    });

    it('should throw error when content is empty', async () => {
      await expect(noteService.createNote({ title: 'Title', content: '' }))
        .rejects.toThrow('Content is required');
    });

    it('should trim title and content', async () => {
      mockNoteRepository.create.mockResolvedValue({} as any);

      await noteService.createNote({ title: '  Clean Title  ', content: '  Clean Content  ' });

      expect(mockNoteRepository.create).toHaveBeenCalledWith({
        title: 'Clean Title',
        content: 'Clean Content',
        categoryIds: undefined,
      });
    });

    it('should pass categoryIds to repository', async () => {
      mockNoteRepository.create.mockResolvedValue({} as any);

      const categoryIds = ['550e8400-e29b-41d4-a716-446655440000'];
      await noteService.createNote({ title: 'Title', content: 'Content', categoryIds });

      expect(mockNoteRepository.create).toHaveBeenCalledWith({
        title: 'Title',
        content: 'Content',
        categoryIds,
      });
    });
  });

  describe('getNoteById', () => {
    it('should throw error when note not found', async () => {
      mockNoteRepository.findById.mockResolvedValue(null);

      await expect(noteService.getNoteById('nonexistent'))
        .rejects.toThrow('Note not found');
    });
  });

  describe('deleteNote', () => {
    it('should throw error when note not found', async () => {
      mockNoteRepository.findById.mockResolvedValue(null);

      await expect(noteService.deleteNote('nonexistent'))
        .rejects.toThrow('Note not found');
    });
  });
});
