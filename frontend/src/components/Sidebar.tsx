import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Sidebar = ({ isOpen, onClose, onLogout }: SidebarProps) => {
  return (
    <>
      {/* Backdrop - solo mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 text-white flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-zinc-700">
          <h1 className="text-xl font-bold tracking-tight">ENSOLVERS</h1>
          <p className="text-xs text-zinc-400 mt-1">Notes App</p>
        </div>
        <nav className="flex-1 p-4">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-white text-zinc-900'
                  : 'text-zinc-300 hover:bg-zinc-800'
              }`
            }
          >
            <span className="text-lg">📝</span>
            <span className="font-medium">All Notes</span>
          </NavLink>
          <NavLink
            to="/categories"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-white text-zinc-900'
                  : 'text-zinc-300 hover:bg-zinc-800'
              }`
            }
          >
            <span className="text-lg">📁</span>
            <span className="font-medium">Categories</span>
          </NavLink>
          <NavLink
            to="/archived"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-white text-zinc-900'
                  : 'text-zinc-300 hover:bg-zinc-800'
              }`
            }
          >
            <span className="text-lg">📦</span>
            <span className="font-medium">Archived Notes</span>
          </NavLink>
        </nav>
        <div className="p-4 border-t border-zinc-700">
          <button
            onClick={onLogout}
            className="w-full text-left text-zinc-400 hover:text-white text-sm transition-colors px-4 py-2 hover:bg-zinc-800 rounded-lg"
          >
            Logout
          </button>
          <p className="text-xs text-zinc-600 mt-2 px-4">v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
