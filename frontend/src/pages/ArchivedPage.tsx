import { useState, useEffect } from 'react';
import { Note } from '../types';
import { noteService } from '../services/noteService';
import NoteCard from '../components/NoteCard';
import EditNoteModal from '../components/EditNoteModal';

const ArchivedPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    try {
      const data = await noteService.getArchivedNotes();
      setNotes(data);
    } catch (error) {
      console.error('Failed to load archived notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleUnarchiveNote = async (id: string) => {
    try {
      await noteService.unarchiveNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (error) {
      console.error('Failed to unarchive note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const openEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };

  const handleEditNote = async (id: string, title: string, content: string, categoryIds?: string[]) => {
    try {
      const updatedNote = await noteService.updateNote(id, { title, content, categoryIds });
      setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-zinc-500">Loading archived notes...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Archived Notes</h1>
        <p className="text-zinc-500 mt-1">{notes.length} archived notes</p>
      </div>
      {notes.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-white border border-zinc-200 rounded-lg">
          <p className="text-zinc-400">No archived notes</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={openEditModal}
              onUnarchive={handleUnarchiveNote}
              onDelete={handleDeleteNote}
              showUnarchiveOption
              showDeleteOption
            />
          ))}
        </div>
      )}
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

export default ArchivedPage;
