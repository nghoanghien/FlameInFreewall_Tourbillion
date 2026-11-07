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
      {/* Top Mission Control Header Banner - StructPaper Light */}
      <section
        aria-label="Dashboard Overview"
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#D4FC02]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-[#0B2374]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FC02]/25 border border-[#D4FC02] text-zinc-950 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#0B2374] animate-ping" />
              NASA Space Apps 2026 · Flame in Freefall
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A1A1A] tracking-tight">
              Microgravity Combustion Science &amp; Fire Safety Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Unified mission workspace synthesizing 20 NASA PSI investigations, 160 verified test runs, and 45 peer-reviewed evidence claims to bridge the Moon &amp; Mars partial-gravity knowledge gap.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Link
              href="/explorer"
              className="px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#1A1A1A] text-xs font-bold border border-gray-200 transition-all flex items-center gap-2 shadow-sm"
            >
              <Compass className="w-4 h-4 text-[#0B2374]" />
              <span>Explore 20 Studies</span>
            </Link>

            <Link
              href="/mission"
              className="px-4 py-2.5 rounded-xl bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 text-xs font-black transition-all flex items-center gap-2 shadow-md"
            >
              <Rocket className="w-4 h-4 text-zinc-950" />
              <span>Simulate Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Comparison floating quick-action pill if items are selected */}
        {compareList.length > 0 && (
          <div
            data-testid="dashboard-compare-banner"
            className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs bg-slate-50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:px-8 rounded-b-3xl border-b border-x border-gray-100"
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
                className="px-3 py-1.5 rounded-lg bg-[#0B2374] hover:bg-[#102B82] text-xs font-bold text-white transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Open in Explorer Comparison</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </section>

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
