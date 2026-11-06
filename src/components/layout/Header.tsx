'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  '/settings': { title: 'Mission Control Settings', section: 'System & Provenance' },
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
  const { activeScenario, setActiveScenario, compareList, clearCompare } = useWorkspaceStore();
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
      className="sticky top-0 z-40 bg-[#080C18]/85 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3"
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4FC02] via-[#FFB454] to-[#0B2374] p-[1.5px] shadow-[0_0_16px_rgba(212,252,2,0.3)] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#080C18] rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#D4FC02] transition-colors group-hover:text-[#E2FF3B]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base text-white tracking-tight leading-tight">
                  FlameGuard <span className="text-[#D4FC02]">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D4FC02]/15 text-[#D4FC02] border border-[#D4FC02]/30">
                  NASA Space Apps 2026
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate hidden xs:block">
                Microgravity Combustion Intelligence
              </p>
            </div>
          </Link>

          {/* Breadcrumb divider */}
          <div className="hidden lg:flex items-center gap-1.5 text-zinc-500 pl-2">
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-200">{routeInfo.title}</span>
              <span className="text-[10px] text-zinc-500">{routeInfo.section}</span>
            </div>
          </div>
        </div>

        {/* Right: Telemetry Sync Status, Compare Badge & Quick Scenario Launcher */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Active Comparison Pill */}
          {compareList.length > 0 && (
            <div className="flex items-center gap-1.5 bg-[#D4FC02]/15 border border-[#D4FC02]/40 text-[#D4FC02] px-2.5 py-1 rounded-full text-xs font-bold shadow-[0_0_12px_rgba(212,252,2,0.2)]">
              <Link href="/explorer" className="flex items-center gap-1.5 hover:underline">
                <Layers className="w-3.5 h-3.5" />
                <span>Comparing {compareList.length}/3</span>
              </Link>
              <button
                type="button"
                onClick={clearCompare}
                className="hover:text-white p-0.5 rounded-full hover:bg-white/10 transition-colors ml-0.5 cursor-pointer"
                title="Clear comparison list"
                aria-label="Clear comparison list"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* NASA PSI Sync Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2374]/50 border border-white/10 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <Database className="w-3 h-3 text-[#D4FC02]" />
            <span className="font-mono text-[11px] font-semibold">PSI 20 Studies</span>
          </div>

          {/* Quick Scenario Preset Dropdown Launcher with Outside-Click Dismiss */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setPresetDropdownOpen(!presetDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B2374]/70 hover:bg-[#102B82] border border-[#D4FC02]/30 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer"
              aria-label="Select Scenario Preset"
              data-testid="scenario-preset-selector"
            >
              <Gauge className="w-3.5 h-3.5 text-[#D4FC02]" />
              <span className="max-w-[130px] sm:max-w-[180px] truncate">
                {activeScenario.name}
              </span>
              <span className="text-[10px] font-mono text-[#D4FC02]">
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
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#080C18]/95 backdrop-blur-xl border border-white/15 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.6)] z-50 space-y-1"
                data-testid="scenario-preset-menu"
              >
                <div className="px-2.5 py-1.5 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    NASA Mission Presets
                  </span>
                  <Sparkles className="w-3 h-3 text-[#D4FC02]" />
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
                          ? 'bg-[#D4FC02]/20 border border-[#D4FC02]/40 text-white'
                          : 'hover:bg-white/5 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="text-xs font-bold block truncate">{preset.name}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono mt-0.5">
                          <span>{preset.gravity}g</span>
                          <span>•</span>
                          <span>{preset.oxygenPct}% O₂</span>
                          <span>•</span>
                          <span>{preset.pressurePsi} psi</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#D4FC02] flex-shrink-0 mt-0.5" />}
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
