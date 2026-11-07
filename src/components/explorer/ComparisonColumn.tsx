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
      className="flex flex-col justify-between rounded-2xl bg-gray-50 border border-gray-200 hover:border-gray-300 p-4 sm:p-5 shadow-xs transition-all"
    >
      {/* Top Header Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              data-testid={`comparison-code-${study.id}`}
              className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase bg-[#D4FC02] text-zinc-950 border border-lime-300 font-mono"
            >
              {study.code}
            </span>
            <span
              data-testid={`comparison-confidence-${study.id}`}
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border ${
                study.confidence === 'A'
                  ? 'bg-lime-50 text-lime-900 border-lime-300'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
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
              className="p-1 rounded-full text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
            className="text-sm font-bold text-zinc-900 line-clamp-2 leading-snug"
          >
            {study.title}
          </h3>
          <p className="text-[11px] text-zinc-500 mt-1 truncate">
            {study.primaryInvestigator} {study.institution ? `· ${study.institution}` : ''}
          </p>
        </div>

        {/* Structured Parameter List */}
        <div className="space-y-2.5 pt-2 text-xs">
          {/* Fuel Parameter */}
          <div
            data-testid={`comparison-fuel-${study.id}`}
            className="p-2 rounded-xl bg-white border border-gray-200/80 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-zinc-500 flex items-center gap-1">
                <FuelIcon className="w-3 h-3 text-[#0B2374]" />
                <span>Fuel Category</span>
              </span>
              {flags.isUniqueFuel && allStudies.length > 1 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  Distinct Phase
                </span>
              )}
            </div>
            <div className="font-semibold text-zinc-900 capitalize">
              {study.fuelType}
            </div>
            <div className="text-[11px] text-zinc-500 line-clamp-1">
              {study.fuelDetails.materials.join(', ')}
            </div>
          </div>

          {/* Facility / Hardware */}
          <div
            data-testid={`comparison-facility-${study.id}`}
            className="p-2 rounded-xl bg-white border border-gray-200/80 space-y-1"
          >
            <span className="text-[10px] uppercase font-mono text-zinc-500 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-zinc-400" />
              <span>Chamber & Platform</span>
            </span>
            <div className="font-semibold text-zinc-900 truncate">
              {metrics.facilitySummary}
            </div>
          </div>

          {/* Oxygen Range Parameter */}
          <div
            data-testid={`comparison-o2-${study.id}`}
            className="p-2 rounded-xl bg-white border border-gray-200/80 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-zinc-500 flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#0B2374]" />
                <span>Oxygen Limits</span>
              </span>
              {flags.isHighestO2 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Highest O₂
                </span>
              )}
              {flags.isLowestO2Moc && !flags.isHighestO2 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-lime-50 text-lime-900 border border-lime-300">
                  Lowest MOC
                </span>
              )}
            </div>
            <div className="font-mono font-bold text-zinc-900">
              {metrics.o2RangeDisplay}
            </div>
          </div>

          {/* Pressure Envelope */}
          <div
            data-testid={`comparison-pressure-${study.id}`}
            className="p-2 rounded-xl bg-white border border-gray-200/80 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-zinc-500 flex items-center gap-1">
                <Gauge className="w-3 h-3 text-[#0B2374]" />
                <span>Pressure Envelope</span>
              </span>
              {flags.isLowestPressure && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  Exploration Hypobaric
                </span>
              )}
            </div>
            <div className="font-mono text-zinc-800">
              {metrics.pressureRangeDisplay}
            </div>
          </div>

          {/* Quenching Diameter */}
          <div
            data-testid={`comparison-quench-${study.id}`}
            className="p-2 rounded-xl bg-white border border-gray-200/80 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-zinc-500 flex items-center gap-1">
                <Zap className="w-3 h-3 text-rose-600" />
                <span>Quench Diameter</span>
              </span>
              {flags.isNarrowestQuench && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  Narrowest Gap
                </span>
              )}
            </div>
            <div className="font-mono text-zinc-800">
              {metrics.quenchDiameterDisplay}
            </div>
          </div>

          {/* Flame Spread Velocity */}
          <div
            data-testid={`comparison-spread-${study.id}`}
            className="p-2 rounded-xl bg-white border border-gray-200/80 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-zinc-500 flex items-center gap-1">
                <Activity className="w-3 h-3 text-lime-700" />
                <span>Flame Spread Velocity</span>
              </span>
              {flags.isFastestSpread && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-lime-50 text-lime-900 border border-lime-300">
                  Fastest Velocity
                </span>
              )}
            </div>
            <div className="font-mono text-zinc-800">
              {metrics.flameSpreadVelocityDisplay}
            </div>
          </div>

          {/* Verified Run Count */}
          <div
            data-testid={`comparison-runs-${study.id}`}
            className="p-2 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between"
          >
            <span className="text-[10px] uppercase font-mono text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-teal-600" />
              <span>Verified Runs</span>
            </span>
            <span className="font-mono font-bold text-zinc-950">
              {metrics.verifiedRunCount}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Link to detail page */}
      <div className="pt-3 border-t border-gray-200 mt-3">
        <Link
          href={`/explorer/${study.id}`}
          data-testid={`comparison-column-details-${study.id}`}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-xs font-semibold text-zinc-800 border border-gray-200 shadow-2xs transition-colors"
        >
          <span>Inspect Study</span>
          <ExternalLink className="w-3 h-3 text-[#0B2374]" />
        </Link>
      </div>
    </article>
  );
};
