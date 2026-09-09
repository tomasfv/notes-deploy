import { Note } from '../types';
import DropdownMenu from './DropdownMenu';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  showArchiveOption?: boolean;
  showUnarchiveOption?: boolean;
  showDeleteOption?: boolean;
}

const NoteCard = ({
  note,
  onEdit,
  onArchive,
  onUnarchive,
  onDelete,
  showArchiveOption = false,
  showUnarchiveOption = false,
  showDeleteOption = false,
}: NoteCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const menuItems = [];
  menuItems.push({ label: 'Edit', onClick: () => onEdit(note) });
  if (showArchiveOption && onArchive) {
    menuItems.push({ label: 'Archive', onClick: () => onArchive(note.id) });
  }
  if (showUnarchiveOption && onUnarchive) {
    menuItems.push({ label: 'Unarchive', onClick: () => onUnarchive(note.id) });
  }
  if (showDeleteOption && onDelete) {
    menuItems.push({ label: 'Delete', onClick: () => onDelete(note.id) });
  }

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-lg p-5 relative group hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-zinc-900 text-lg pr-8">{note.title}</h3>
        {menuItems.length > 0 && <DropdownMenu items={menuItems} />}
      </div>
      <p className="text-zinc-500 text-xs mb-3">{formatDate(note.createdAt)}</p>
      <p className="text-zinc-700 text-sm line-clamp-4">{note.content}</p>
    </div>
  );
};

export default NoteCard;
