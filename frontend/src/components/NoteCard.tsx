import { Note } from '../types';
import DropdownMenu from './DropdownMenu';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onView?: (note: Note) => void;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  showArchiveOption?: boolean;
  showUnarchiveOption?: boolean;
  showDeleteOption?: boolean;
}

const categoryColors = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
];

const getCategoryColor = (index: number) => {
  return categoryColors[index % categoryColors.length];
};

const NoteCard = ({
  note,
  onEdit,
  onView,
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
    <div
      className="w-full bg-white border border-zinc-200 rounded-xl relative group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
      style={{ borderLeftWidth: '4px', borderLeftColor: note.categories?.length ? '#3b82f6' : '#d4d4d8' }}
      onClick={() => onView?.(note)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-zinc-900 text-lg pr-8 line-clamp-2 min-w-0">{note.title}</h3>
          <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            {menuItems.length > 0 && <DropdownMenu items={menuItems} />}
          </div>
        </div>
        <p className="text-zinc-400 text-xs mb-3 font-medium">{formatDate(note.createdAt)}</p>
        <p className="text-zinc-600 text-sm line-clamp-4 leading-relaxed">{note.content}</p>
        {note.categories && note.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-zinc-100">
            {note.categories.map((category, index) => (
              <span
                key={category.id}
                className={`px-2.5 py-1 text-xs font-medium rounded-full max-w-[120px] truncate ${getCategoryColor(index)}`}
                title={category.name}
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
