'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Flame,
  CheckCircle2,
  Award,
  ExternalLink,
  Info,
  Filter,
} from 'lucide-react';
import { calculateTopicalRankings } from '@/lib/rankingEngine';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import type { RankedInvestigation } from '@/types';

export const RankedEvidenceList: React.FC = () => {
  const activeScenario = useWorkspaceStore((state) => state.activeScenario);
  const rankedStudies = calculateTopicalRankings(activeScenario);

  // Take top 6 studies for the scenario display
  const topRanked = rankedStudies.slice(0, 6);

  return (
    <div
      data-testid="ranked-evidence-list"
      className="p-5 sm:p-6 rounded-3xl bg-[#0d1322]/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D4FC02]" />
            <h2 className="text-lg font-black text-[#F8F9FA] tracking-tight">
              Ranked NASA PSI Evidence Base
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked on empirical condition alignment with your scenario, not fire hazard risk level.
          </p>
        </div>

        <Link
          href="/explorer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4FC02] hover:text-[#E2FF3B] transition-colors self-start sm:self-auto"
        >
          View all 20 studies in Explorer
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Studies List */}
      <div className="space-y-3.5">
        {topRanked.map((item: RankedInvestigation) => {
          const { investigation: inv, rank, similarityScore, closestRun, rationale } = item;
          const rankFormatted = rank < 10 ? `0${rank}` : `${rank}`;

          return (
            <div
              key={inv.id}
              data-testid={`ranked-study-card-${inv.id}`}
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Left Column: Rank + Study Info */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 font-mono text-sm font-black text-[#D4FC02]">
                  {rankFormatted}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-black text-white group-hover:text-[#D4FC02] transition-colors">
                      {inv.code}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                      {inv.hardware}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        inv.badge === 'Measured'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {inv.badge}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-200 line-clamp-1">
                    {inv.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 max-w-2xl leading-relaxed">
                    {rationale}
                  </p>

                  {/* Closest test run pill */}
                  {closestRun && (
                    <div
                      data-testid={`closest-run-${inv.id}`}
                      className="inline-flex items-center gap-2 pt-1 font-mono text-[10px] text-slate-400"
                    >
                      <span className="text-slate-500">Closest PSI Run:</span>
                      <span className="text-[#4CC9F0] font-semibold">{closestRun.id}</span>
                      <span className="text-slate-600">·</span>
                      <span>{closestRun.conditions.oxygenPct}% O₂</span>
                      <span className="text-slate-600">·</span>
                      <span>{closestRun.conditions.pressurePsi} psia</span>
                      <span className="text-slate-600">·</span>
                      <span>{closestRun.conditions.flowVelocityCmS} cm/s</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Similarity Score & Link Button */}
              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                <div
                  data-testid={`similarity-badge-${inv.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4CC9F0]/10 border border-[#4CC9F0]/30 font-mono text-xs font-bold text-[#4CC9F0]"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{similarityScore}% Match</span>
                </div>

                <Link
                  href={`/explorer/${inv.id}`}
                  data-testid={`inspect-study-btn-${inv.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-bold transition-all group-hover:border-[#D4FC02]/40"
                >
                  <span>Inspect in Explorer</span>
                  <ExternalLink className="w-3 h-3 text-[#D4FC02]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-slate-500 shrink-0" />
        <span>
          Similarity scores reflect multi-attribute Euclidean matching across gravity, fuel class, oxygen fraction, total pressure, and ventilation velocity.
        </span>
      </div>
    </div>
  );
};
