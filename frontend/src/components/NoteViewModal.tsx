import { Note } from '../types';

interface NoteViewModalProps {
  isOpen: boolean;
  note: Note | null;
  onClose: () => void;
}

const NoteViewModal = ({ isOpen, note, onClose }: NoteViewModalProps) => {
  if (!isOpen || !note) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-zinc-200">
          <h2 className="text-lg font-semibold text-zinc-900 truncate pr-4">{note.title}</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 transition-colors flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          <p className="text-zinc-500 text-sm mb-4">{formatDate(note.createdAt)}</p>
          <p className="text-zinc-700 text-sm whitespace-pre-wrap">{note.content}</p>
          {note.categories && note.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-zinc-100">
              {note.categories.map((category) => (
                <span
                  key={category.id}
                  className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteViewModal;
