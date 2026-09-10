jest.mock('../../services/noteService', () => ({
  noteService: {
    getActiveNotes: jest.fn(),
    getArchivedNotes: jest.fn(),
    createNote: jest.fn(),
    updateNote: jest.fn(),
    deleteNote: jest.fn(),
    archiveNote: jest.fn(),
    unarchiveNote: jest.fn(),
  },
}));

import { noteService } from '../../services/noteService';

describe('NoteService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getActiveNotes', async () => {
    const mockData = [{ id: '1', title: 'Test', content: 'Content' }];
    (noteService.getActiveNotes as jest.Mock).mockResolvedValue(mockData);

    const result = await noteService.getActiveNotes();

    expect(noteService.getActiveNotes).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it('should call getActiveNotes with categoryId', async () => {
    const mockData = [{ id: '1', title: 'Test', content: 'Content' }];
    (noteService.getActiveNotes as jest.Mock).mockResolvedValue(mockData);

    await noteService.getActiveNotes('category-123');

    expect(noteService.getActiveNotes).toHaveBeenCalledWith('category-123');
  });

  it('should call getArchivedNotes', async () => {
    const mockData = [{ id: '2', title: 'Archived', content: 'Content' }];
    (noteService.getArchivedNotes as jest.Mock).mockResolvedValue(mockData);

    await noteService.getArchivedNotes();

    expect(noteService.getArchivedNotes).toHaveBeenCalled();
  });
});
