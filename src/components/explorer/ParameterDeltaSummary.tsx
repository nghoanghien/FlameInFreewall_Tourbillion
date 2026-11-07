'use client';

import React from 'react';
import { Sparkles, Activity, Flame, Zap, Gauge } from 'lucide-react';
import type { Investigation } from '@/types';
import type { ComparisonDeltaSummary } from '@/lib/comparisonUtils';

export interface ParameterDeltaSummaryProps {
  comparedStudies: Investigation[];
  deltas: ComparisonDeltaSummary;
}

export const ParameterDeltaSummary: React.FC<ParameterDeltaSummaryProps> = ({
  comparedStudies,
  deltas,
}) => {
  return (
    <div
      data-testid="parameter-delta-summary"
      className="p-4 sm:p-5 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-[#0B2374] font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#0B2374]" />
          Parameter Delta Analysis
        </span>
        <span className="text-zinc-500 text-[11px] normal-case font-medium">
          Calculated across {comparedStudies.length} flight investigations
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Oxygen Delta */}
        <div
          data-testid="delta-summary-o2"
          className="p-3 rounded-2xl bg-gray-100 border border-gray-200 text-zinc-800 space-y-1"
        >
          <div className="text-[10px] uppercase text-zinc-500 flex items-center gap-1 font-semibold">
            <Activity className="w-3 h-3 text-[#0B2374]" />
            <span>O₂ Range Span</span>
          </div>
          <div className="font-bold text-zinc-950">
            {deltas.o2OverallMin}% – {deltas.o2OverallMax}% O₂
          </div>
          <div className="text-[10px] text-blue-700 font-semibold">
            Δ {deltas.o2SpanDelta}% range span
          </div>
        </div>

        {/* Fuel Phase Diversity */}
        <div
          data-testid="delta-summary-fuel"
          className="p-3 rounded-2xl bg-gray-100 border border-gray-200 text-zinc-800 space-y-1"
        >
          <div className="text-[10px] uppercase text-zinc-500 flex items-center gap-1 font-semibold">
            <Flame className="w-3 h-3 text-amber-600" />
            <span>Fuel Diversity</span>
          </div>
          <div className="font-semibold text-zinc-950 capitalize truncate">
            {deltas.isMixedFuel ? 'Multi-Phase' : deltas.uniqueFuelTypes[0] || 'Single'}
          </div>
          <div className="text-[10px] text-zinc-500 truncate">
            {deltas.uniqueFuelTypes.join(' vs ')}
          </div>
        </div>

        {/* Quenching Threshold */}
        <div
          data-testid="delta-summary-quench"
          className="p-3 rounded-2xl bg-gray-100 border border-gray-200 text-zinc-800 space-y-1"
        >
          <div className="text-[10px] uppercase text-zinc-500 flex items-center gap-1 font-semibold">
            <Zap className="w-3 h-3 text-rose-600" />
            <span>Quench Threshold</span>
          </div>
          <div className="font-bold text-zinc-950">
            {deltas.quenchMin !== null ? `${deltas.quenchMin} mm` : 'N/A'}
          </div>
          <div className="text-[10px] text-rose-700 font-semibold">
            {deltas.quenchDelta !== null
              ? `Δ ${deltas.quenchDelta} mm variance`
              : 'Consistent'}
          </div>
        </div>

        {/* Flame Spread Differential */}
        <div
          data-testid="delta-summary-spread"
          className="p-3 rounded-2xl bg-gray-100 border border-gray-200 text-zinc-800 space-y-1"
        >
          <div className="text-[10px] uppercase text-zinc-500 flex items-center gap-1 font-semibold">
            <Gauge className="w-3 h-3 text-lime-700" />
            <span>Spread Velocity</span>
          </div>
          <div className="font-bold text-zinc-950">
            {deltas.spreadMax !== null ? `${deltas.spreadMax.toFixed(2)} mm/s` : 'N/A'}
          </div>
          <div className="text-[10px] text-lime-800 font-semibold">
            {deltas.spreadRatio !== null ? `${deltas.spreadRatio}x max ratio` : 'Nominal'}
          </div>
        </div>
      </div>
    </div>
  );
};
