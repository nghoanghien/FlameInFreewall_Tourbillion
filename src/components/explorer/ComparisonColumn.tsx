'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Droplet,
  Wind,
  Layers,
  X,
  Gauge,
  Activity,
  ShieldCheck,
  Building2,
  ExternalLink,
  Zap,
} from 'lucide-react';
import type { Investigation, FuelCategory } from '@/types';
import {
  getStudyMetrics,
  getStudyHighlightFlags,
} from '@/lib/comparisonUtils';

export interface ComparisonColumnProps {
  study: Investigation;
  allStudies: Investigation[];
  onRemove?: (id: string) => void;
}

function getFuelIcon(category: FuelCategory) {
  switch (category) {
    case 'solid':
    case 'fabric':
      return Flame;
    case 'droplet':
    case 'liquid':
      return Droplet;
    case 'gas':
      return Wind;
    default:
      return Layers;
  }
}

export const ComparisonColumn: React.FC<ComparisonColumnProps> = ({
  study,
  allStudies,
  onRemove,
}) => {
  const metrics = getStudyMetrics(study);
  const flags = getStudyHighlightFlags(study, allStudies);
  const FuelIcon = getFuelIcon(study.fuelType);

  return (
    <article
      data-testid={`comparison-column-${study.id}`}
      className="flex flex-col justify-between rounded-2xl bg-[#0d182e]/90 border border-white/10 hover:border-cyan-500/30 p-4 sm:p-5 backdrop-blur-xl shadow-lg transition-all"
    >
      {/* Top Header Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              data-testid={`comparison-code-${study.id}`}
              className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase bg-[#D4FC02]/15 text-[#D4FC02] border border-[#D4FC02]/30 font-mono"
            >
              {study.code}
            </span>
            <span
              data-testid={`comparison-confidence-${study.id}`}
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border ${
                study.confidence === 'A'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              Tier {study.confidence}
            </span>
          </div>

          {onRemove && (
            <button
              type="button"
              data-testid={`remove-column-${study.id}`}
              onClick={() => onRemove(study.id)}
              className="p-1 rounded-full text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title={`Remove ${study.code} from comparison`}
              aria-label={`Remove ${study.code} from comparison`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div>
          <h3
            data-testid={`comparison-title-${study.id}`}
            className="text-sm font-bold text-white line-clamp-2 leading-snug"
          >
            {study.title}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            {study.primaryInvestigator} {study.institution ? `· ${study.institution}` : ''}
          </p>
        </div>

        {/* Structured Parameter List */}
        <div className="space-y-2.5 pt-2 text-xs">
          {/* Fuel Parameter */}
          <div
            data-testid={`comparison-fuel-${study.id}`}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                <FuelIcon className="w-3 h-3 text-cyan-400" />
                <span>Fuel Category</span>
              </span>
              {flags.isUniqueFuel && allStudies.length > 1 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Distinct Phase
                </span>
              )}
            </div>
            <div className="font-semibold text-slate-200 capitalize">
              {study.fuelType}
            </div>
            <div className="text-[11px] text-slate-400 line-clamp-1">
              {study.fuelDetails.materials.join(', ')}
            </div>
          </div>

          {/* Facility / Hardware */}
          <div
            data-testid={`comparison-facility-${study.id}`}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
          >
            <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-400" />
              <span>Chamber & Platform</span>
            </span>
            <div className="font-semibold text-slate-200 truncate">
              {metrics.facilitySummary}
            </div>
          </div>

          {/* Oxygen Range Parameter */}
          <div
            data-testid={`comparison-o2-${study.id}`}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#4CC9F0]" />
                <span>Oxygen Limits</span>
              </span>
              {flags.isHighestO2 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Highest O₂
                </span>
              )}
              {flags.isLowestO2Moc && !flags.isHighestO2 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Lowest MOC
                </span>
              )}
            </div>
            <div className="font-mono font-bold text-slate-100">
              {metrics.o2RangeDisplay}
            </div>
          </div>

          {/* Pressure Envelope */}
          <div
            data-testid={`comparison-pressure-${study.id}`}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                <Gauge className="w-3 h-3 text-indigo-400" />
                <span>Pressure Envelope</span>
              </span>
              {flags.isLowestPressure && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Exploration Hypobaric
                </span>
              )}
            </div>
            <div className="font-mono text-slate-200">
              {metrics.pressureRangeDisplay}
            </div>
          </div>

          {/* Quenching Diameter */}
          <div
            data-testid={`comparison-quench-${study.id}`}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-rose-400" />
                <span>Quench Diameter</span>
              </span>
              {flags.isNarrowestQuench && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Narrowest Gap
                </span>
              )}
            </div>
            <div className="font-mono text-slate-200">
              {metrics.quenchDiameterDisplay}
            </div>
          </div>

          {/* Flame Spread Velocity */}
          <div
            data-testid={`comparison-spread-${study.id}`}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>Flame Spread Velocity</span>
              </span>
              {flags.isFastestSpread && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Fastest Velocity
                </span>
              )}
            </div>
            <div className="font-mono text-slate-200">
              {metrics.flameSpreadVelocityDisplay}
            </div>
          </div>

          {/* Verified Run Count */}
          <div
            data-testid={`comparison-runs-${study.id}`}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
          >
            <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-teal-400" />
              <span>Verified Runs</span>
            </span>
            <span className="font-mono font-bold text-[#F8F9FA]">
              {metrics.verifiedRunCount}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Link to detail page */}
      <div className="pt-4 border-t border-white/10 mt-3">
        <Link
          href={`/explorer/${study.id}`}
          data-testid={`comparison-column-details-${study.id}`}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white border border-white/10 transition-colors"
        >
          <span>Inspect Study</span>
          <ExternalLink className="w-3 h-3 text-[#4CC9F0]" />
        </Link>
      </div>
    </article>
  );
};
