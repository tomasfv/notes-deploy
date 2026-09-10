import { useState, useEffect } from 'react';
import { Note, Category } from '../types';
import { noteService } from '../services/noteService';
import { categoryService } from '../services/categoryService';
import NoteCard from '../components/NoteCard';
import EmptyCard from '../components/EmptyCard';
import NoteModal from '../components/NoteModal';
import EditNoteModal from '../components/EditNoteModal';

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = async (categoryId?: string | null) => {
    try {
      const data = await noteService.getActiveNotes(categoryId || undefined);
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadNotes();
  }, []);

  const handleFilterByCategory = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    loadNotes(categoryId);
  };

  const handleCreateNote = async (title: string, content: string, categoryIds?: string[]) => {
    try {
      const newNote = await noteService.createNote({ title, content, categoryIds });
      if (selectedCategoryId) {
        loadNotes(selectedCategoryId);
      } else {
        setNotes([newNote, ...notes]);
      }
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleEditNote = async (id: string, title: string, content: string, categoryIds?: string[]) => {
    try {
      const updatedNote = await noteService.updateNote(id, { title, content, categoryIds });
      if (selectedCategoryId) {
        loadNotes(selectedCategoryId);
      } else {
        setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
      }
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleArchiveNote = async (id: string) => {
    try {
      await noteService.archiveNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (error) {
      console.error('Failed to archive note:', error);
    }
  };

  const openEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-zinc-500">Loading notes...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">All Notes</h1>
        <p className="text-zinc-500 mt-1">{notes.length} notes</p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleFilterByCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategoryId === null
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterByCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategoryId === category.id
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <EmptyCard onClick={() => setIsCreateModalOpen(true)} />
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={openEditModal}
            onArchive={handleArchiveNote}
            showArchiveOption
          />
        ))}
      </div>
      <NoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateNote}
      />
      <EditNoteModal
        isOpen={isEditModalOpen}
        note={selectedNote}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedNote(null);
        }}
        onSubmit={handleEditNote}
      />
    </div>
  );
};

export default NotesPage;
