'use client';

import TodoList from '@/components/TodoList';
import FocusTimer from '@/components/FocusTimer';
import DarkModeToggle from '@/components/DarkModeToggle';
import QuickNotes from '@/components/QuickNotes';
import { useDarkMode } from '@/components/DarkModeProvider';

export default function Home() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Productivity Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Stay focused and organized with your personal productivity dashboard
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TodoList />
          <FocusTimer />
        </div>

        <div className="mt-8">
          <QuickNotes />
        </div>

        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>Built with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
