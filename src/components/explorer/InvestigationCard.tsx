'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Droplet,
  Wind,
  Layers,
  ArrowRight,
  Check,
  Plus,
  User,
  Gauge,
  Activity,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import type { Investigation, FuelCategory } from '@/types';

export interface InvestigationCardProps {
  investigation: Investigation;
  isComparing: boolean;
  onToggleCompare: (id: string) => void;
  testRunsCount?: number;
}

export function getFuelBadge(fuelType: FuelCategory) {
  switch (fuelType) {
    case 'solid':
    case 'fabric':
      return {
        label: 'Solid',
        bg: 'bg-amber-500/15',
        text: 'text-amber-300',
        border: 'border-amber-500/30',
        icon: Flame,
      };
    case 'liquid':
    case 'droplet':
      return {
        label: 'Droplet',
        bg: 'bg-cyan-500/15',
        text: 'text-cyan-300',
        border: 'border-cyan-500/30',
        icon: Droplet,
      };
    case 'gas':
      return {
        label: 'Gas',
        bg: 'bg-purple-500/15',
        text: 'text-purple-300',
        border: 'border-purple-500/30',
        icon: Wind,
      };
    default:
      return {
        label: fuelType,
        bg: 'bg-slate-500/15',
        text: 'text-slate-300',
        border: 'border-slate-500/30',
        icon: Layers,
      };
  }
}

export const InvestigationCard: React.FC<InvestigationCardProps> = ({
  investigation,
  isComparing,
  onToggleCompare,
  testRunsCount,
}) => {
  const fuelBadge = getFuelBadge(investigation.fuelType);
  const FuelIcon = fuelBadge.icon;
  const runsCount = testRunsCount ?? investigation.dataAvailability.runCount ?? 0;

  return (
    <div
      data-testid={`investigation-card-${investigation.id}`}
      className={`group relative rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl border ${
        isComparing
          ? 'bg-[#111827]/95 border-[#4CC9F0] shadow-[0_0_30px_rgba(76,201,240,0.25)] ring-1 ring-[#4CC9F0]/60'
          : 'bg-[#111827]/75 border-white/10 hover:border-white/25 hover:bg-[#111827]/90 hover:shadow-2xl'
      }`}
    >
      {/* Top Header: Code, Badges, Compare Button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Code pill badge */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#D4FC02]/15 text-[#D4FC02] border border-[#D4FC02]/30 font-mono">
              {investigation.code}
            </span>
            {/* Fuel Phase Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${fuelBadge.bg} ${fuelBadge.text} ${fuelBadge.border}`}
            >
              <FuelIcon className="w-3 h-3" />
              <span>{fuelBadge.label}</span>
            </span>
          </div>

          {/* Compare Toggle Button */}
          <button
            type="button"
            data-testid={`compare-btn-${investigation.id}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare(investigation.id);
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              isComparing
                ? 'bg-[#4CC9F0] text-slate-950 font-bold shadow-md shadow-[#4CC9F0]/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
            }`}
            title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
          >
            {isComparing ? (
              <>
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Comparing</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Compare</span>
              </>
            )}
          </button>
        </div>

        {/* Title & Subtitle */}
        <Link
          href={`/explorer/${investigation.id}`}
          className="block group/link"
        >
          <h3 className="text-base font-bold text-[#F8F9FA] group-hover/link:text-[#4CC9F0] transition-colors line-clamp-1">
            {investigation.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {investigation.subtitle}
          </p>
        </Link>

        {/* Investigator & Affiliation */}
        <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-300">
          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{investigation.primaryInvestigator}</span>
          {investigation.institution && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 truncate">{investigation.institution}</span>
            </>
          )}
        </div>

        {/* Hardware & Facility Pill */}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400">
          <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="font-mono text-[11px] text-slate-300">{investigation.hardware}</span>
          <span className="text-slate-600">({investigation.yearRange})</span>
        </div>

        {/* Chamber Conditions Spec Bar */}
        <div className="mt-4 p-2.5 rounded-2xl bg-black/40 border border-white/5 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">O2 Range</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {investigation.oxygenRange[0]}–{investigation.oxygenRange[1]}%
            </div>
          </div>
          <div className="border-x border-white/5 px-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Pressure</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {investigation.pressureRangePsi[0]}–{investigation.pressureRangePsi[1]} psi
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Flow</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {investigation.flowRangeCmPerSec[0]}–{investigation.flowRangeCmPerSec[1]} cm/s
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Stats, Badges & Inspect Study Link */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        {/* Runs Count & Confidence */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
            <Activity className="w-3 h-3 text-[#4CC9F0]" />
            <span>{runsCount} Runs</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase border ${
              investigation.confidence === 'A'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
          >
            Tier {investigation.confidence}
          </span>
        </div>

        {/* Inspect Link */}
        <Link
          href={`/explorer/${investigation.id}`}
          data-testid={`inspect-link-${investigation.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4CC9F0] group-hover:text-white transition-colors"
        >
          <span>Inspect Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
