'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Flame,
  ChevronRight,
  Database,
  Layers,
  Sparkles,
  ChevronDown,
  Check,
  X,
  Gauge,
} from 'lucide-react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';
import type { ScenarioState } from '@/types';

const ROUTE_LABELS: Record<string, { title: string; section: string }> = {
  '/dashboard': { title: 'Research Dashboard', section: 'Telemetry & KPIs' },
  '/explorer': { title: 'Experiment Explorer', section: 'NASA PSI Catalog' },
  '/mission': { title: 'Mission Scenario Lab', section: 'Gap Matrix & Physics' },
};

const SCENARIO_PRESETS: ScenarioState[] = [
  {
    id: 'iss-baseline',
    name: 'ISS Microgravity Baseline',
    environment: 'iss',
    gravity: 0,
    oxygenPct: 21,
    pressurePsi: 14.7,
    material: 'PMMA',
    airflowVelocity: 5,
    description: 'Nominal microgravity cabin atmosphere with low-speed ventilation flow.',
  },
  {
    id: 'artemis-lunar',
    name: 'Artemis Lunar Habitat',
    environment: 'lunar',
    gravity: 0.16,
    oxygenPct: 34,
    pressurePsi: 8.2,
    material: 'Nomex',
    airflowVelocity: 2,
    description: 'Exploration Atmosphere (8.2 psia / 34% O2) in 1/6th partial gravity.',
  },
  {
    id: 'mars-transit',
    name: 'Mars Transit Habitat',
    environment: 'mars',
    gravity: 0.38,
    oxygenPct: 28,
    pressurePsi: 10.2,
    material: 'Cotton',
    airflowVelocity: 3.5,
    description: 'Reduced pressure hyperoxic transit module in Martian partial gravity.',
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { activeScenario, setActiveScenario, compareList, clearCompare, setComparisonModalOpen } =
    useWorkspaceStore();
  const [presetDropdownOpen, setPresetDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!presetDropdownOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPresetDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPresetDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [presetDropdownOpen]);

  const routeInfo = ROUTE_LABELS[pathname] || {
    title: pathname === '/' ? 'Home Overview' : pathname.replace('/', '').toUpperCase(),
    section: 'Mission Control',
  };

  const handleSelectPreset = (preset: ScenarioState) => {
    setActiveScenario(preset);
    setPresetDropdownOpen(false);
    toast.success(
      `Scenario Loaded: ${preset.name}`,
      `${preset.gravity}g · ${preset.oxygenPct}% O₂ · ${preset.pressurePsi} psia`
    );
  };

  return (
    <header
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100/80 text-[#1A1A1A] px-4 lg:px-8 py-3"
      data-testid="app-header"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Brand Identity & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="FlameGuard AI Dashboard"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0B2374] to-[#102B82] p-[1.5px] shadow-sm transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0B2374] rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#D4FC02]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base text-[#1A1A1A] tracking-tight leading-tight">
                  FlameGuard <span className="text-[#0B2374]">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0B2374] text-[#D4FC02]">
                  NASA Space Apps 2026
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 truncate hidden xs:block">
                Microgravity Combustion Intelligence
              </p>
            </div>
          </Link>

          {/* Breadcrumb divider */}
          <div className="hidden lg:flex items-center gap-1.5 text-zinc-400 pl-2">
            <ChevronRight className="w-4 h-4 text-zinc-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-800">{routeInfo.title}</span>
              <span className="text-[10px] text-zinc-500">{routeInfo.section}</span>
            </div>
          </div>
        </div>

        {/* Right: Telemetry Sync Status, Compare Badge & Quick Scenario Launcher */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Active Comparison Pill */}
          {compareList.length > 0 && (
            <div
              data-testid="header-compare-pill"
              className="flex items-center gap-1.5 bg-[#D4FC02]/20 border border-[#D4FC02] text-zinc-950 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs"
            >
              <button
                type="button"
                data-testid="header-compare-trigger"
                onClick={() => {
                  if (compareList.length >= 2) {
                    setComparisonModalOpen(true);
                    if (pathname !== '/explorer') {
                      router.push('/explorer');
                    }
                  } else {
                    toast.info(
                      'Select 1 more study to compare',
                      'Multi-study comparison requires at least 2 studies.'
                    );
                    if (pathname !== '/explorer') {
                      router.push('/explorer');
                    }
                  }
                }}
                className="flex items-center gap-1.5 hover:underline cursor-pointer"
                title={
                  compareList.length >= 2
                    ? 'Open multi-study comparison modal'
                    : 'Select 1 more study to compare'
                }
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Comparing {compareList.length}/3</span>
              </button>
              <button
                type="button"
                onClick={clearCompare}
                className="hover:text-zinc-950 p-0.5 rounded-full hover:bg-black/5 transition-colors ml-0.5 cursor-pointer"
                title="Clear comparison list"
                aria-label="Clear comparison list"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* NASA PSI Sync Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-zinc-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <Database className="w-3 h-3 text-[#0B2374]" />
            <span className="font-mono text-[11px] font-semibold">PSI 20 Studies</span>
          </div>

          {/* Quick Scenario Preset Dropdown Launcher with Outside-Click Dismiss */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setPresetDropdownOpen(!presetDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-zinc-800 shadow-xs transition-all cursor-pointer"
              aria-label="Select Scenario Preset"
              data-testid="scenario-preset-selector"
            >
              <Gauge className="w-3.5 h-3.5 text-[#0B2374]" />
              <span className="max-w-[130px] sm:max-w-[180px] truncate">
                {activeScenario.name}
              </span>
              <span className="text-[10px] font-mono text-[#0B2374] font-bold">
                {activeScenario.gravity}g
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                  presetDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {presetDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-50 space-y-1"
                data-testid="scenario-preset-menu"
              >
                <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                    NASA Mission Presets
                  </span>
                  <Sparkles className="w-3 h-3 text-[#0B2374]" />
                </div>
                {SCENARIO_PRESETS.map((preset) => {
                  const isSelected = activeScenario.name === preset.name;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`w-full text-left p-2 rounded-xl transition-all flex items-start justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4FC02]/25 border border-lime-300 text-zinc-950 font-medium'
                          : 'hover:bg-slate-50 text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="text-xs font-bold block truncate">{preset.name}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono mt-0.5">
                          <span>{preset.gravity}g</span>
                          <span>•</span>
                          <span>{preset.oxygenPct}% O₂</span>
                          <span>•</span>
                          <span>{preset.pressurePsi} psi</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#0B2374] flex-shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
