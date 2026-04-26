import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { Home, Timer, Scale, Dumbbell, LineChart } from 'lucide-react';
import { TrackerProvider } from '../context/TrackerContext';

const NAV_ITEMS = [
  { path: '/', label: 'หน้าหลัก', icon: <Home size={24} /> },
  { path: '/timer', label: 'IF Timer', icon: <Timer size={24} /> },
  { path: '/weight', label: 'น้ำหนัก', icon: <Scale size={24} /> },
  { path: '/exercise', label: 'ออกกำลังกาย', icon: <Dumbbell size={24} /> },
  { path: '/progress', label: 'สรุปผล', icon: <LineChart size={24} /> },
];

export function Layout() {
  return (
    <TrackerProvider>
      <div className="flex h-screen bg-neutral-50 text-neutral-900 font-sans">
        {/* Desktop Sidebar */}
        <nav className="hidden md:flex flex-col w-64 bg-white border-r border-neutral-200">
          <div className="p-6 text-2xl font-bold tracking-tight text-blue-600 flex items-center gap-2">
            <Timer className="w-8 h-8" />
            IF Tracker
          </div>
          <div className="flex-1 px-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
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
          <header className="md:hidden flex items-center justify-center p-4 bg-white border-b border-neutral-200 sticky top-0 z-10">
            <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <Timer className="w-6 h-6" />
              IF Tracker
            </h1>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto h-full">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-neutral-200 flex justify-around items-center z-20 pb-6 pt-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-3 px-2 w-full text-xs font-medium ${
                  isActive ? 'text-blue-600' : 'text-neutral-500 hover:text-neutral-800'
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
