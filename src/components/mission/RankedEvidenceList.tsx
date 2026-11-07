'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Award,
  ExternalLink,
  Info,
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
      className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#0B2374]" />
            <h2 className="text-lg font-black text-zinc-950 tracking-tight">
              Ranked NASA PSI Evidence Base
            </h2>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Ranked on empirical condition alignment with your scenario, not fire hazard risk level.
          </p>
        </div>

        <Link
          href="/explorer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2374] hover:text-blue-700 transition-colors self-start sm:self-auto"
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
              className="p-5 rounded-3xl bg-white border border-gray-100 hover:border-gray-200 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Left Column: Rank + Study Info */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 font-mono text-sm font-black text-[#0B2374]">
                  {rankFormatted}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-black text-zinc-950 group-hover:text-[#0B2374] transition-colors">
                      {inv.code}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-100 text-zinc-600 border border-gray-200">
                      {inv.hardware}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        inv.badge === 'Measured'
                          ? 'bg-lime-50 text-lime-900 border-lime-300'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {inv.badge}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-zinc-800 line-clamp-1">
                    {inv.title}
                  </h3>

                  <p className="text-[11px] text-zinc-500 line-clamp-2 max-w-2xl leading-relaxed">
                    {rationale}
                  </p>

                  {/* Closest test run pill */}
                  {closestRun && (
                    <div
                      data-testid={`closest-run-${inv.id}`}
                      className="inline-flex items-center gap-2 pt-1 font-mono text-[10px] text-zinc-500"
                    >
                      <span className="text-zinc-400">Closest PSI Run:</span>
                      <span className="text-[#0B2374] font-semibold">{closestRun.id}</span>
                      <span className="text-zinc-300">·</span>
                      <span>{closestRun.conditions.oxygenPct}% O₂</span>
                      <span className="text-zinc-300">·</span>
                      <span>{closestRun.conditions.pressurePsi} psia</span>
                      <span className="text-zinc-300">·</span>
                      <span>{closestRun.conditions.flowVelocityCmS} cm/s</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Similarity Score & Link Button */}
              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                <div
                  data-testid={`similarity-badge-${inv.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 font-mono text-xs font-bold text-[#0B2374]"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{similarityScore}% Match</span>
                </div>

                <Link
                  href={`/explorer/${inv.id}`}
                  data-testid={`inspect-study-btn-${inv.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-zinc-800 border border-gray-200 text-xs font-bold transition-all group-hover:border-gray-300"
                >
                  <span>Inspect in Explorer</span>
                  <ExternalLink className="w-3 h-3 text-[#0B2374]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-2 text-[11px] text-zinc-500">
        <Info className="w-4 h-4 text-zinc-400 shrink-0" />
        <span>
          Similarity scores reflect multi-attribute Euclidean matching across gravity, fuel class, oxygen fraction, total pressure, and ventilation velocity.
        </span>
      </div>
    </div>
  );
};
