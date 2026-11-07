'use client';

import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  Database,
  Layers,
} from 'lucide-react';
import { evaluateGapMatrix } from '@/lib/gapMatrixEngine';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import type { GapMatchStatus } from '@/types';

function getStatusBadgeConfig(status: GapMatchStatus) {
  switch (status) {
    case 'MATCH':
      return {
        label: 'MATCH',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        icon: CheckCircle2,
      };
    case 'RELATED':
      return {
        label: 'RELATED',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        icon: Info,
      };
    case 'PARTIAL':
      return {
        label: 'PARTIAL',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: AlertTriangle,
      };
    case 'GAP':
    default:
      return {
        label: 'GAP',
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        icon: ShieldAlert,
      };
  }
}

export const ConditionGapMatrix: React.FC = () => {
  const activeScenario = useWorkspaceStore((state) => state.activeScenario);
  const gapResult = evaluateGapMatrix(activeScenario);

  const overallBadge = getStatusBadgeConfig(gapResult.overallStatus);
  const OverallIcon = overallBadge.icon;

  return (
    <div
      data-testid="condition-gap-matrix"
      className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-6"
    >
      {/* Header and Overall Match Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0B2374]" />
            <h2 className="text-lg font-black text-zinc-950 tracking-tight">
              Evidence Gap Matrix
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-zinc-600 font-mono border border-gray-200">
              6-Dimension Audit
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Rigorous cross-comparison of scenario parameters against 160 NASA PSI experimental runs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            data-testid="badge-matched-runs"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 border border-gray-200 text-xs font-mono text-zinc-700"
          >
            <Database className="w-3.5 h-3.5 text-[#0B2374]" />
            <span>Matched PSI Runs:</span>
            <strong className="text-zinc-950">{gapResult.matchedRunsCount}</strong>
          </div>

          <div
            data-testid="badge-overall-status"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${overallBadge.bg} ${overallBadge.text} ${overallBadge.border} font-mono font-bold text-xs`}
          >
            <OverallIcon className="w-3.5 h-3.5" />
            <span>OVERALL {overallBadge.label}</span>
          </div>
        </div>
      </div>

      {/* Partial Gravity Warning Banner (if applicable) */}
      {gapResult.isPartialGravityGap && (
        <div
          data-testid="partial-gravity-warning"
          className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h3 className="font-bold text-amber-900 uppercase tracking-wide">
              NASA Safety Guardrail — Partial Gravity Empirical Gap
            </h3>
            <p className="leading-relaxed text-amber-800">
              Cannot conclude safe or unsafe — Empirical NASA PSI tests under exact habitat conditions are required. Partial gravity (0 &lt; g &lt; 1, such as Moon 0.16g and Mars 0.38g) represents an empirical knowledge gap between orbital microgravity and terrestrial 1g. Buoyant plume dynamics and convective boundary layer physics cannot be reliably modeled without in-situ flight tests.
            </p>
          </div>
        </div>
      )}

      {/* 6-Dimension Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {gapResult.dimensions.map((dim) => {
          const badge = getStatusBadgeConfig(dim.status);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={dim.dimension}
              data-testid={`dimension-card-${dim.dimension}`}
              className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-gray-300 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    {dim.dimensionLabel}
                  </span>
                  <span
                    data-testid={`badge-dim-${dim.dimension}`}
                    className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full text-xs border ${badge.bg} ${badge.text} ${badge.border}`}
                  >
                    <BadgeIcon className="w-3 h-3" />
                    {badge.label}
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="text-[10px] uppercase">Scenario:</span>
                    <span className="text-zinc-900 font-bold">{dim.scenarioValue}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 text-zinc-500">
                    <span className="text-[10px] uppercase shrink-0">Benchmark:</span>
                    <span className="text-[11px] text-right text-zinc-700 truncate max-w-[180px]" title={dim.benchmarkValue}>
                      {dim.benchmarkValue}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-relaxed border-t border-gray-200/60 pt-2">
                {dim.explanation}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mandatory NASA Safety Protocol Notice */}
      <div
        data-testid="nasa-safety-disclaimer"
        className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3"
      >
        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-black uppercase tracking-wider text-rose-900">
            Mandatory NASA Fire Safety Guardrail
          </div>
          <p className="text-xs text-rose-800 leading-relaxed">
            {gapResult.safetyVerdictNotice}
          </p>
        </div>
      </div>
    </div>
  );
};
