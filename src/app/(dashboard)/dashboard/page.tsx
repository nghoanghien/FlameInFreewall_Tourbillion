'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Rocket, ArrowRight, RotateCcw } from 'lucide-react';
import { KpiStatCards } from '@/components/dashboard/KpiStatCards';
import { QuickScenarioTrigger } from '@/components/dashboard/QuickScenarioTrigger';
import { CuratedStudiesGrid } from '@/components/dashboard/CuratedStudiesGrid';
import { DomainBreakdown } from '@/components/dashboard/DomainBreakdown';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';

export default function DashboardPage() {
  const compareList = useWorkspaceStore((state) => state.compareList);
  const clearCompare = useWorkspaceStore((state) => state.clearCompare);

  return (
    <div
      data-testid="research-dashboard"
      className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 py-2"
    >
      {/* Top Mission Control Header Banner - Compact Plain Background */}
      <header
        aria-label="Dashboard Overview"
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-1"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D4FC02]/20 border border-[#D4FC02]/60 text-zinc-950 text-[10px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B2374]" />
            <span>NASA Space Apps 2026 · Flame in Freefall</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
            Microgravity Combustion Science &amp; Fire Safety Intelligence
          </h1>
          <p className="text-xs text-[#64748B]">
            Unified mission workspace synthesizing 20 NASA PSI investigations, 160 test runs, and 45 evidence claims.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/explorer"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 text-[#1A1A1A] text-xs font-bold border border-gray-200 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#0B2374]" />
            <span>Explore 20 Studies</span>
          </Link>

          <Link
            href="/mission"
            className="px-3 py-1.5 rounded-lg bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Rocket className="w-3.5 h-3.5 text-zinc-950" />
            <span>Simulate Mission</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Comparison floating quick-action pill if items are selected */}
      {compareList.length > 0 && (
        <div
          data-testid="dashboard-compare-banner"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs bg-white p-3 px-4 rounded-xl border border-gray-200 shadow-xs -mt-4"
        >
          <div className="flex items-center gap-2.5 text-[#1A1A1A]">
            <span className="w-2 h-2 rounded-full bg-[#0B2374]" />
            <span className="font-semibold">Active Study Comparison:</span>
            <span className="font-mono px-2 py-0.5 rounded-full bg-[#D4FC02]/30 text-zinc-950 font-bold border border-[#D4FC02]">
              {compareList.length} of 3 selected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearCompare}
              className="text-[#64748B] hover:text-[#1A1A1A] text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
            <Link
              href="/explorer"
              className="px-3 py-1.5 rounded-lg bg-[#0B2374] hover:bg-[#102B82] text-xs font-bold text-white transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Open in Explorer Comparison</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* 1. Telemetry KPI Stat Cards */}
      <KpiStatCards />

      {/* 2. Planetary Scenario Jump Cards */}
      <QuickScenarioTrigger />

      {/* 3. Curated Flagship Investigations Grid */}
      <CuratedStudiesGrid />

      {/* 4. Physical Science Domain & Platform Breakdown */}
      <DomainBreakdown />
    </div>
  );
}
