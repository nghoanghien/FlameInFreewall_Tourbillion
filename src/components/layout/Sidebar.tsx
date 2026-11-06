'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  Rocket,
  Settings,
  ChevronRight,
  ChevronLeft,
  Flame,
  Menu,
  X,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { DockPillButton } from './DockPillButton';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';

export interface NavItemConfig {
  path: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    path: '/dashboard',
    label: 'Research Dashboard',
    description: 'PSI KPIs & telemetry',
    icon: LayoutDashboard,
  },
  {
    path: '/explorer',
    label: 'Experiment Explorer',
    description: 'Filter & compare 20 studies',
    icon: Compass,
  },
  {
    path: '/mission',
    label: 'Mission Scenario',
    description: 'Gap matrix & predictive lab',
    icon: Rocket,
  },
  {
    path: '/settings',
    label: 'Mission Control Settings',
    description: 'Data provenance & PSI export',
    icon: Settings,
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { activeScenario, resetWorkspace } = useWorkspaceStore();

  const isNavActive = (path: string): boolean => {
    if (path === '/dashboard' && (pathname === '/' || pathname === '/dashboard')) return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return pathname === path;
  };

  const handleResetWorkspace = () => {
    resetWorkspace();
    toast.success('Workspace Reset', 'Active scenario and filters restored to default ISS baseline.');
  };

  return (
    <>
      {/* DESKTOP & TABLET DOCK - NO WRAPPER BOX, EXPANDING DOCK PILLS WITH CHEVRON TOGGLE */}
      <aside
        className={`hidden sm:flex flex-col items-start justify-between h-[calc(100vh-1.5rem)] sticky top-3 my-3 ml-3 flex-shrink-0 z-30 select-none transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? 'w-[280px]' : 'w-[58px]'
        }`}
        aria-label="FlameGuard AI primary navigation dock"
      >
        {/* TOP SECTION: TOGGLE EXPAND / COLLAPSE BUTTON WITH CHEVRON */}
        <div className="relative z-10 flex flex-col items-start gap-3 w-full">
          <DockPillButton
            id="sidebar-toggle-button"
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
            icon={
              isExpanded ? (
                <ChevronLeft
                  className="w-5 h-5 text-zinc-300 transition-transform group-hover:-translate-x-0.5 group-hover:text-white"
                  strokeWidth={2.5}
                />
              ) : (
                <ChevronRight
                  className="w-5 h-5 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                  strokeWidth={2.5}
                />
              )
            }
            label={isExpanded ? 'Collapse Dock' : 'Expand Dock'}
            description={isExpanded ? 'Switch to compact icon view' : 'Show full labels & telemetry details'}
            tooltipText={isExpanded ? undefined : 'Expand navigation dock'}
          />
        </div>

        {/* MIDDLE SECTION: MAIN FLOW NAVIGATION PILLS */}
        <div
          className={`relative z-10 flex flex-col items-start w-full transition-all duration-300 ${
            isExpanded ? 'space-y-1.5' : 'space-y-3'
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.path);

            return (
              <DockPillButton
                key={item.path}
                id={`nav-pill-${item.path.replace('/', '')}`}
                href={item.path}
                isExpanded={isExpanded}
                active={active}
                icon={
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      active ? 'text-[#080C18]' : 'text-zinc-300 group-hover:text-white'
                    }`}
                    strokeWidth={2.5}
                  />
                }
                label={item.label}
                description={item.description}
                tooltipText={isExpanded ? undefined : item.label}
              />
            );
          })}
        </div>

        {/* BOTTOM SECTION: QUICK ACTIONS */}
        <div className="relative z-10 flex flex-col items-start gap-3 w-full">
          <DockPillButton
            id="sidebar-reset-button"
            onClick={handleResetWorkspace}
            isExpanded={isExpanded}
            icon={
              <RotateCcw
                className="w-4 h-4 text-zinc-400 group-hover:text-[#D4FC02] transition-colors"
                strokeWidth={2.5}
              />
            }
            label="Reset Workspace"
            description={`Current: ${activeScenario.name}`}
            tooltipText={isExpanded ? undefined : 'Reset scenario to default baseline'}
          />
        </div>
      </aside>

      {/* MOBILE TOP NAVIGATION BAR */}
      <div className="sm:hidden sticky top-0 z-40 bg-[#080C18]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-[#0B2374]/60 hover:bg-[#102B82] border border-white/10 text-zinc-200 cursor-pointer"
            aria-label="Open mobile navigation menu"
            data-testid="mobile-menu-button"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4FC02] to-[#FFB454] flex items-center justify-center text-[#080C18] font-black shadow-[0_0_12px_rgba(212,252,2,0.3)]">
              <Flame className="w-4 h-4 text-[#080C18]" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white leading-tight flex items-center gap-1.5">
                FlameGuard <span className="text-[#D4FC02]">AI</span>
              </h1>
              <p className="text-[10px] text-zinc-400">NASA Space Apps 2026</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleResetWorkspace}
          className="p-2 text-zinc-400 hover:text-[#D4FC02] rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          title="Reset Scenario"
          aria-label="Reset Scenario"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* MOBILE SLIDE-OVER DRAWER BACKDROP */}
      {mobileOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex"
          onClick={() => setMobileOpen(false)}
          data-testid="mobile-drawer-backdrop"
        >
          <div
            className="w-72 h-full max-w-[85vw] bg-[#080C18]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col rounded-r-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0B2374]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4FC02] to-[#FFB454] flex items-center justify-center text-[#080C18] font-black">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-sm text-white block leading-tight">
                    FlameGuard <span className="text-[#D4FC02]">AI</span>
                  </span>
                  <span className="text-[10px] text-zinc-400">Microgravity Fire Safety</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="flex-1 py-3 px-2 space-y-1.5 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isNavActive(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all ${
                      active
                        ? 'bg-[#D4FC02] text-[#080C18] font-bold shadow-[0_0_16px_rgba(212,252,2,0.35)] border border-[#E2FF3B]'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${active ? 'text-[#080C18]' : 'text-zinc-400'}`}
                      strokeWidth={2.5}
                    />
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-bold block ${active ? 'text-[#080C18]' : 'text-white'}`}>
                        {item.label}
                      </span>
                      <p
                        className={`text-[10.5px] truncate mt-0.5 ${
                          active ? 'text-[#080C18]/80 font-medium' : 'text-zinc-400'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Scenario Status and Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0B2374]/30 space-y-2">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Active Scenario</span>
                <span className="text-xs font-semibold text-zinc-200 block truncate">{activeScenario.name}</span>
                <span className="text-[10px] font-mono text-[#D4FC02]">
                  {activeScenario.oxygenPct}% O₂ · {activeScenario.gravity}g
                </span>
              </div>

              <a
                href="https://psi.nasa.gov/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span>NASA PSI Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
