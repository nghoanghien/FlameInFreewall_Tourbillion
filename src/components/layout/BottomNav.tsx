'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Compass, Rocket, Settings } from 'lucide-react';

interface MobileTab {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const TABS: MobileTab[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/explorer', label: 'Explorer', icon: Compass },
  { path: '/mission', label: 'Mission', icon: Rocket },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const isNavActive = (path: string): boolean => {
    if (path === '/dashboard' && (pathname === '/' || pathname === '/dashboard')) return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return pathname === path;
  };

  return (
    <nav
      className="sm:hidden fixed bottom-3 left-3 right-3 z-40 pointer-events-none select-none"
      aria-label="Mobile bottom navigation"
      data-testid="bottom-nav"
    >
      <div className="pointer-events-auto bg-[#080C18]/90 backdrop-blur-xl border border-white/10 rounded-[32px] px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center justify-around max-w-md mx-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = isNavActive(tab.path);

          return (
            <Link
              key={tab.path}
              href={tab.path}
              data-testid={`bottom-nav-${tab.label.toLowerCase()}`}
              className="flex flex-col items-center justify-center flex-1 h-[54px] focus:outline-none transition-all"
            >
              <div
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-10 h-10 bg-[#D4FC02] text-[#080C18] shadow-[0_0_14px_rgba(212,252,2,0.4)] scale-105'
                    : 'w-9 h-9 text-zinc-400 active:scale-95 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <span
                className={`text-[10px] tracking-tight transition-all duration-200 ${
                  isActive ? 'text-[#D4FC02] font-extrabold mt-0.5' : 'text-zinc-500 font-medium'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
