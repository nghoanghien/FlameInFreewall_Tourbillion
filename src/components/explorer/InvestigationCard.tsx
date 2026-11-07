'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Flame,
  Droplet,
  Wind,
  Layers,
  ArrowRight,
  Check,
  Plus,
  User,
  Activity,
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
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        icon: Flame,
      };
    case 'liquid':
    case 'droplet':
      return {
        label: 'Droplet',
        bg: 'bg-cyan-50',
        text: 'text-cyan-800',
        border: 'border-cyan-200',
        icon: Droplet,
      };
    case 'gas':
      return {
        label: 'Gas',
        bg: 'bg-purple-50',
        text: 'text-purple-800',
        border: 'border-purple-200',
        icon: Wind,
      };
    default:
      return {
        label: fuelType,
        bg: 'bg-gray-100',
        text: 'text-zinc-800',
        border: 'border-gray-200',
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
    <motion.div
      data-testid={`investigation-card-${investigation.id}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`group relative rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer bg-gray-200/50 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] select-none ${
        isComparing
          ? 'ring-2 ring-[#D4FC02] shadow-[0_8px_30px_rgba(212,252,2,0.3)] bg-white'
          : ''
      }`}
    >
      {/* Top Header: Code, Badges, Compare Button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Domain badge, Apparatus badge & Fuel Phase badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-blue-50 text-[#0B2374] border border-blue-100 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-2xs">
              {investigation.code}
            </span>
            <span className="bg-lime-50 text-lime-900 border border-lime-200 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-2xs">
              {investigation.hardware}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-2xs border ${fuelBadge.bg} ${fuelBadge.text} ${fuelBadge.border}`}
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
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 ${
              isComparing
                ? 'bg-[#D4FC02] text-zinc-950 shadow-xs'
                : 'bg-white hover:bg-gray-100 text-zinc-700 shadow-2xs'
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
          <h3 className="text-base font-bold text-zinc-900 group-hover/link:text-[#0B2374] transition-colors line-clamp-1">
            {investigation.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
            {investigation.subtitle}
          </p>
        </Link>

        {/* Investigator & Affiliation */}
        <div className="flex items-center gap-1.5 mt-3 text-xs text-zinc-700">
          <User className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="truncate font-medium">{investigation.primaryInvestigator}</span>
          {investigation.institution && (
            <>
              <span className="text-zinc-400">·</span>
              <span className="text-zinc-500 truncate">{investigation.institution}</span>
            </>
          )}
        </div>

        {/* Hardware & Facility Pill */}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-zinc-500">
          <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="truncate text-zinc-600">{investigation.platform}</span>
          <span className="text-zinc-400">({investigation.yearRange})</span>
        </div>

        {/* Chamber Conditions Spec Bar */}
        <div className="mt-4 p-2.5 rounded-2xl bg-white/70 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">O2 Range</div>
            <div className="text-xs font-bold text-zinc-900 mt-0.5">
              {investigation.oxygenRange[0]}–{investigation.oxygenRange[1]}%
            </div>
          </div>
          <div className="border-x border-gray-200/50 px-1">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Pressure</div>
            <div className="text-xs font-bold text-zinc-900 mt-0.5">
              {investigation.pressureRangePsi[0]}–{investigation.pressureRangePsi[1]} psi
            </div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Flow</div>
            <div className="text-xs font-bold text-zinc-900 mt-0.5">
              {investigation.flowRangeCmPerSec[0]}–{investigation.flowRangeCmPerSec[1]} cm/s
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Stats, Badges & Inspect Study Link */}
      <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between gap-2">
        {/* Runs Count & Confidence */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[11px] font-bold shadow-2xs text-zinc-700">
            <Activity className="w-3 h-3 text-[#0B2374]" />
            <span>{runsCount} Runs</span>
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-2xs uppercase ${
              investigation.confidence === 'A'
                ? 'bg-[#D4FC02]/25 text-zinc-950'
                : 'bg-amber-50 text-amber-800'
            }`}
          >
            Tier {investigation.confidence}
          </span>
        </div>

        {/* Inspect Link */}
        <Link
          href={`/explorer/${investigation.id}`}
          data-testid={`inspect-link-${investigation.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2374] hover:text-[#081b59] transition-colors"
        >
          <span>Inspect Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};
