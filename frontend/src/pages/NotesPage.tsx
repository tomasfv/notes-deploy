import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Note, Category } from '../types';
import { noteService } from '../services/noteService';
import { categoryService } from '../services/categoryService';
import NoteCard from '../components/NoteCard';
import EmptyCard from '../components/EmptyCard';
import NoteModal from '../components/NoteModal';
import EditNoteModal from '../components/EditNoteModal';
import NoteViewModal from '../components/NoteViewModal';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-zinc-400 text-sm">Loading notes...</p>
    </div>
  </div>
);

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
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
      toast.success('Note created');
    } catch (error) {
      toast.error('Failed to create note');
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
      toast.success('Note updated');
    } catch (error) {
      toast.error('Failed to update note');
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

  const openViewModal = (note: Note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">All Notes</h1>
        <p className="text-zinc-500 mt-1">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleFilterByCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
              selectedCategoryId === null
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterByCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 max-w-[140px] truncate ${
                selectedCategoryId === category.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              <span title={category.name}>{category.name}</span>
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
            onView={openViewModal}
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
      <NoteViewModal
        isOpen={isViewModalOpen}
        note={selectedNote}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedNote(null);
        }}
      />
    </div>
  );
};

export default NotesPage;
