'use client';

import React from 'react';
import Link from 'next/link';
import {
  Database,
  Flame,
  Activity,
  Award,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';
import { TEST_RUNS } from '@/data/testRuns';
import { EVIDENCE_CLAIMS } from '@/data/evidenceClaims';

export interface TelemetryKpi {
  id: string;
  label: string;
  value: string | number;
  highlight?: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accentColor: string;
  glowColor: string;
  badge?: string;
}

export const KpiStatCards: React.FC = () => {
  const totalStudies = INVESTIGATIONS.length;
  const totalTestRuns = TEST_RUNS.length;
  const totalClaims = EVIDENCE_CLAIMS.length;

  return (
    <section aria-label="Research Telemetry KPIs" className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#F8F9FA] flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FC02] animate-pulse" />
            NASA PSI Physical Science Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time catalog metrics synthesized from NASA Physical Science Informatics (PSI) repository.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827]/80 border border-white/10 text-[11px] font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>Repository Status: Synchronized (2026-11)</span>
        </div>
      </div>

      <div
        data-testid="kpi-stat-cards"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4"
      >
        {/* KPI 1: NASA PSI Studies */}
        <div
          data-testid="kpi-studies"
          className="relative group p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#111827]/75 backdrop-blur-md border border-white/10 hover:border-[#4CC9F0]/50 hover:shadow-[0_0_25px_rgba(76,201,240,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#4CC9F0]/15 text-[#4CC9F0] border border-[#4CC9F0]/30">
                PSI Catalog
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#4CC9F0]/10 flex items-center justify-center text-[#4CC9F0] group-hover:scale-110 transition-transform">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F8F9FA] tracking-tight font-mono">
              {totalStudies}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              NASA PSI Studies
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Curated microgravity experiments across MSG, CIR & Cygnus platforms.
          </p>
        </div>

        {/* KPI 2: Verified Test Runs */}
        <div
          data-testid="kpi-runs"
          className="relative group p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#111827]/75 backdrop-blur-md border border-white/10 hover:border-[#F97316]/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30">
                Ground & Orbital
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F8F9FA] tracking-tight font-mono">
              {totalTestRuns}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Verified Test Runs
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Complete physical boundary sets with radiometry, pyrometry & spread rates.
          </p>
        </div>

        {/* KPI 3: Microgravity Data Points */}
        <div
          data-testid="kpi-datapoints"
          className="relative group p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#111827]/75 backdrop-blur-md border border-white/10 hover:border-[#A855F7]/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#A855F7]/15 text-[#A855F7] border border-[#A855F7]/30">
                Sensor Telemetry
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7] group-hover:scale-110 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F8F9FA] tracking-tight font-mono">
              10,000+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Microgravity Data Points
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Multi-channel time-series tracking flame standoff, soot & thermal profiles.
          </p>
        </div>

        {/* KPI 4: Peer-Reviewed Evidence Claims */}
        <div
          data-testid="kpi-claims"
          className="relative group p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#111827]/75 backdrop-blur-md border border-white/10 hover:border-[#D4FC02]/50 hover:shadow-[0_0_25px_rgba(212,252,2,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D4FC02]/15 text-[#D4FC02] border border-[#D4FC02]/30">
                AIAA & Combust. Flame
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#D4FC02]/10 flex items-center justify-center text-[#D4FC02] group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F8F9FA] tracking-tight font-mono">
              {totalClaims}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Evidence Claims
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Scientifically validated claims with DOI provenance and confidence scores.
          </p>
        </div>

        {/* KPI 5: Partial Gravity Gap Alert */}
        <div
          data-testid="kpi-gap-alert"
          className="relative group p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-amber-950/20 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                NASA Safety Void
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight font-mono">
              0 &lt; g &lt; 1
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-200 mt-1">
              Partial-g Knowledge Void
            </div>
          </div>
          <div className="mt-2 space-y-1.5">
            <p className="text-[10px] text-amber-300/90 leading-tight">
              <strong>NASA Disclaimer:</strong> Moon (0.16g) & Mars (0.38g) lack direct microgravity combustion data in PSI. Extrapolations are illustrative.
            </p>
            <Link
              href="/mission"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4FC02] hover:underline"
            >
              Simulate in Mission Lab <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
