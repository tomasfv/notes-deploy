import { render, screen } from '@testing-library/react';
import NoteCard from '../../components/NoteCard';
import { Note } from '../../types';

const mockNote: Note = {
  id: '1',
  title: 'Test Note Title',
  content: 'This is the content of the test note. It can be longer.',
  archived: false,
  categories: [
    { id: '1', name: 'Work', createdAt: '', updatedAt: '' },
    { id: '2', name: 'Personal', createdAt: '', updatedAt: '' },
  ],
  createdAt: '2026-01-15T10:30:00Z',
  updatedAt: '2026-01-15T10:30:00Z',
};

const mockOnEdit = jest.fn();
const mockOnView = jest.fn();

const renderNoteCard = (note: Note = mockNote) => {
  return render(
    <NoteCard
      note={note}
      onEdit={mockOnEdit}
      onView={mockOnView}
      showArchiveOption
    />
  );
};

describe('NoteCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the note title', () => {
    renderNoteCard();
    expect(screen.getByText('Test Note Title')).toBeInTheDocument();
  });

  it('renders the note content', () => {
    renderNoteCard();
    expect(screen.getByText(/This is the content/)).toBeInTheDocument();
  });

  it('renders category names', () => {
    renderNoteCard();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
  });

  it('renders the formatted date', () => {
    renderNoteCard();
    expect(screen.getByText(/Jan 15, 2026/)).toBeInTheDocument();
  });
});
