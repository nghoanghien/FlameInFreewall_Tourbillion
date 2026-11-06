'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Rocket,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
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
      {/* Top Mission Control Header Banner */}
      <section
        aria-label="Dashboard Overview"
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0B2374]/90 via-[#080C18]/95 to-[#080C18] border border-white/10 shadow-2xl backdrop-blur-xl"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#D4FC02]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-[#4CC9F0]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FC02]/15 border border-[#D4FC02]/30 text-[#D4FC02] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#D4FC02] animate-ping" />
              NASA Space Apps 2026 · Flame in Freefall
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F8F9FA] tracking-tight">
              Microgravity Combustion &amp; Fire Safety Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unified mission workspace synthesizing 20 NASA PSI investigations, 160 verified test runs, and 45 peer-reviewed evidence claims to bridge the Moon &amp; Mars partial-gravity knowledge gap.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Link
              href="/explorer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#F8F9FA] text-xs font-bold border border-white/15 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#4CC9F0]" />
              <span>Explore 20 Studies</span>
            </Link>

            <Link
              href="/mission"
              className="px-4 py-2.5 rounded-xl bg-[#D4FC02] hover:bg-[#E2FF3B] text-[#080C18] text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-[#D4FC02]/20"
            >
              <Rocket className="w-4 h-4 text-[#080C18]" />
              <span>Simulate Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Comparison floating quick-action pill if items are selected */}
        {compareList.length > 0 && (
          <div
            data-testid="dashboard-compare-banner"
            className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs bg-[#111827]/70 -mx-6 -mb-6 p-4 sm:px-8 rounded-b-3xl"
          >
            <div className="flex items-center gap-2.5 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#D4FC02]" />
              <span className="font-semibold">Active Study Comparison:</span>
              <span className="font-mono px-2 py-0.5 rounded-full bg-[#D4FC02]/20 text-[#D4FC02] font-bold border border-[#D4FC02]/40">
                {compareList.length} of 3 selected
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearCompare}
                className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
              <Link
                href="/explorer"
                className="px-3 py-1.5 rounded-lg bg-[#0B2374] hover:bg-[#102B82] text-xs font-bold text-white transition-colors flex items-center gap-1"
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
