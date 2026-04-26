import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { Home, Timer, Scale, Dumbbell, LineChart, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TrackerProvider } from '../context/TrackerContext';
import { FloatingIcons } from './FloatingIcons';

const NAV_ITEMS = [
  { path: '/', label: 'หน้าหลัก', icon: <Home size={24} /> },
  { path: '/timer', label: 'IF Timer', icon: <Timer size={24} /> },
  { path: '/weight', label: 'น้ำหนัก', icon: <Scale size={24} /> },
  { path: '/exercise', label: 'ออกกำลังกาย', icon: <Dumbbell size={24} /> },
  { path: '/progress', label: 'สรุปผล', icon: <LineChart size={24} /> },
];

export function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TrackerProvider>
      <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans relative overflow-hidden transition-colors duration-200">
        <FloatingIcons />
        {/* Desktop Sidebar */}
        <nav className="hidden md:flex flex-col w-64 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-r border-neutral-200 dark:border-neutral-800 z-10 transition-colors duration-200">
          <div className="p-6 text-2xl font-bold tracking-tight text-orange-600 dark:text-orange-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-8 h-8" />
              IF Tracker
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-neutral-500" />}
            </button>
          </div>
          <div className="flex-1 px-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-10 transition-colors duration-200">
            <h1 className="text-xl font-bold text-orange-600 dark:text-orange-500 flex items-center gap-2">
              <Timer className="w-6 h-6" />
              IF Tracker
            </h1>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-neutral-500" />}
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto h-full">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex justify-around items-center z-20 pb-6 pt-2 transition-colors duration-200">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-3 px-2 w-full text-xs font-medium ${
                  isActive ? 'text-orange-600 dark:text-orange-400' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white'
                }`
              }
            >
              <div className="mb-1">{item.icon}</div>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </TrackerProvider>
  );
}
