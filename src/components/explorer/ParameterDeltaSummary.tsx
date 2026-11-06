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
      className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B2374]/30 to-purple-950/30 border border-cyan-500/30 space-y-3 shadow-inner"
    >
      <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4FC02]" />
          Parameter Delta Analysis
        </span>
        <span className="text-slate-400 text-[11px] normal-case font-normal">
          Calculated across {comparedStudies.length} flight investigations
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Oxygen Delta */}
        <div
          data-testid="delta-summary-o2"
          className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1"
        >
          <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>O₂ Range Span</span>
          </div>
          <div className="font-mono font-bold text-white">
            {deltas.o2OverallMin}% – {deltas.o2OverallMax}% O₂
          </div>
          <div className="text-[10px] text-cyan-300 font-mono">
            Δ {deltas.o2SpanDelta}% range span
          </div>
        </div>

        {/* Fuel Phase Diversity */}
        <div
          data-testid="delta-summary-fuel"
          className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1"
        >
          <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Fuel Diversity</span>
          </div>
          <div className="font-semibold text-white capitalize truncate">
            {deltas.isMixedFuel ? 'Multi-Phase' : deltas.uniqueFuelTypes[0] || 'Single'}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            {deltas.uniqueFuelTypes.join(' vs ')}
          </div>
        </div>

        {/* Quenching Threshold */}
        <div
          data-testid="delta-summary-quench"
          className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1"
        >
          <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-rose-400" />
            <span>Quench Threshold</span>
          </div>
          <div className="font-mono font-bold text-white">
            {deltas.quenchMin !== null ? `${deltas.quenchMin} mm` : 'N/A'}
          </div>
          <div className="text-[10px] text-rose-300 font-mono">
            {deltas.quenchDelta !== null
              ? `Δ ${deltas.quenchDelta} mm variance`
              : 'Consistent'}
          </div>
        </div>

        {/* Flame Spread Differential */}
        <div
          data-testid="delta-summary-spread"
          className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1"
        >
          <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-emerald-400" />
            <span>Spread Velocity</span>
          </div>
          <div className="font-mono font-bold text-white">
            {deltas.spreadMax !== null ? `${deltas.spreadMax.toFixed(2)} mm/s` : 'N/A'}
          </div>
          <div className="text-[10px] text-emerald-300 font-mono">
            {deltas.spreadRatio !== null ? `${deltas.spreadRatio}x max ratio` : 'Nominal'}
          </div>
        </div>
      </div>
    </div>
  );
};
