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
      {/* Top Header - StructPaper Minimalist Templates Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 pb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Rocket className="w-6 h-6 text-[#0B2374]" strokeWidth={2.5} />
            <span>Microgravity Combustion Science &amp; Fire Safety Intelligence</span>
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4FC02]/25 text-zinc-950">
            20 NASA Investigations
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/explorer"
            className="px-4 py-2 rounded-2xl bg-white hover:bg-gray-50 text-slate-900 text-xs font-bold border border-gray-200 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#0B2374]" />
            <span>Explore 20 Studies</span>
          </Link>

          <Link
            href="/mission"
            className="px-4 py-2 rounded-2xl bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-zinc-950" />
            <span>Simulate Mission</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

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
