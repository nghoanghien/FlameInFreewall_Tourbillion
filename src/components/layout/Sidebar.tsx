'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Layers,
  Rocket,
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
    icon: Layers,
  },
  {
    path: '/mission',
    label: 'Mission Scenario',
    description: 'Gap matrix & predictive lab',
    icon: Rocket,
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { activeScenario, resetWorkspace } = useWorkspaceStore();

  const isNavActive = (path: string): boolean => {
    if (path === '/dashboard' && pathname === '/') return true;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleResetWorkspace = () => {
    resetWorkspace();
    toast.success('Workspace Reset', 'Active scenario and filters restored to default ISS baseline.');
  };

  return (
    <>
      {/* DESKTOP & TABLET DOCK - NO WRAPPER BOX, EXPANDING DOCK PILLS WITH CHEVRON TOGGLE */}
      <motion.aside
        initial={false}
        animate={{ width: isExpanded ? 280 : 58 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className="hidden sm:flex flex-col items-start justify-between h-[calc(100vh-1.5rem)] sticky top-3 my-3 ml-3.5 flex-shrink-0 z-30 select-none self-start"
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
                  className="w-5 h-5 text-zinc-600 transition-transform group-hover:-translate-x-0.5 group-hover:text-zinc-950"
                  strokeWidth={2.5}
                />
              ) : (
                <ChevronRight
                  className="w-5 h-5 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-950"
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
                      active ? 'text-zinc-950' : 'text-zinc-600 group-hover:text-zinc-950'
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
                className="w-4 h-4 text-zinc-500 group-hover:text-[#0B2374] transition-colors"
                strokeWidth={2.5}
              />
            }
            label="Reset Workspace"
            description={`Current: ${activeScenario.name}`}
            tooltipText={isExpanded ? undefined : 'Reset scenario to default baseline'}
          />
        </div>
      </motion.aside>

      {/* MOBILE TOP NAVIGATION BAR */}
      <div className="sm:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-zinc-700 cursor-pointer"
            aria-label="Open mobile navigation menu"
            data-testid="mobile-menu-button"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0B2374] flex items-center justify-center text-[#D4FC02] font-black shadow-xs">
              <Flame className="w-4 h-4 text-[#D4FC02]" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-[#1A1A1A] leading-tight flex items-center gap-1.5">
                FlameGuard <span className="text-[#0B2374]">AI</span>
              </h1>
              <p className="text-[10px] text-zinc-500">NASA Space Apps 2026</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleResetWorkspace}
          className="p-2 text-zinc-500 hover:text-zinc-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Reset Scenario"
          aria-label="Reset Scenario"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* MOBILE SLIDE-OVER DRAWER BACKDROP */}
      {mobileOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex"
          onClick={() => setMobileOpen(false)}
          data-testid="mobile-drawer-backdrop"
        >
          <div
            className="w-72 h-full max-w-[85vw] bg-white/95 backdrop-blur-2xl border-r border-slate-200 flex flex-col rounded-r-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B2374] flex items-center justify-center text-[#D4FC02] font-black">
                  <Flame className="w-5 h-5 text-[#D4FC02]" />
                </div>
                <div>
                  <span className="font-extrabold text-sm text-[#1A1A1A] block leading-tight">
                    FlameGuard <span className="text-[#0B2374]">AI</span>
                  </span>
                  <span className="text-[10px] text-zinc-500">Microgravity Fire Safety</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-lg cursor-pointer"
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
                        ? 'bg-[#D4FC02] text-zinc-950 font-bold shadow-[0_0_16px_rgba(212,252,2,0.35)] border border-lime-200'
                        : 'text-zinc-600 hover:bg-slate-100 hover:text-zinc-950'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${active ? 'text-zinc-950' : 'text-zinc-500'}`}
                      strokeWidth={2.5}
                    />
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-bold block ${active ? 'text-zinc-950' : 'text-zinc-800'}`}>
                        {item.label}
                      </span>
                      <p
                        className={`text-[10.5px] truncate mt-0.5 ${
                          active ? 'text-zinc-900/80 font-medium' : 'text-zinc-500'
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
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">Active Scenario</span>
                <span className="text-xs font-semibold text-zinc-800 block truncate">{activeScenario.name}</span>
                <span className="text-[10px] text-[#0B2374] font-bold">
                  {activeScenario.oxygenPct}% O₂ · {activeScenario.gravity}g
                </span>
              </div>

              <a
                href="https://psi.nasa.gov/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-600 hover:text-zinc-950 bg-slate-100 hover:bg-slate-200 transition-colors"
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
