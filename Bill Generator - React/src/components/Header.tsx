import React from 'react';

interface HeaderProps {
  isAdmin: boolean;
  onToggleAdmin: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  onToggleAdmin,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="glass-effect p-6 rounded-xl mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold text-black/80">Canteen Management</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="search"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute right-3 top-2.5 text-red-500">🔍</span>
          </div>
          <button
            onClick={onToggleAdmin}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-pink-700 transition-all whitespace-nowrap"
          >
            {isAdmin ? '👤 Exit Admin' : '🔑 Admin'}
          </button>
        </div>
      </div>
    </header>
  );
};