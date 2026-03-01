'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'productivity-hub-notes';

export default function QuickNotes() {
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setNotes(stored);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, notes);
    setSaved(true);
  };

  const handleClear = () => {
    setNotes('');
    localStorage.removeItem(STORAGE_KEY);
    setSaved(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Quick Notes</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {saved ? 'Saved' : 'Unsaved changes'}
          </span>
          <button
            onClick={handleClear}
            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            disabled={saved}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Save
          </button>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Jot down your thoughts, ideas, or anything on your mind..."
        className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 resize-none text-sm leading-relaxed transition-colors duration-300"
      />

      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-right">
        {notes.length} characters · Ctrl+S to save
      </p>
    </div>
  );
}
