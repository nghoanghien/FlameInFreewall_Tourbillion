'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Plus,
  Check,
  Building2,
  User,
  Flame,
  Droplet,
  Wind,
  Layers,
  ChevronRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import type { Investigation } from '@/types';
import { getFuelBadge } from '../InvestigationCard';

export interface StudyHeaderProps {
  study: Investigation;
  isComparing: boolean;
  onToggleCompare: (id: string) => void;
}

export const StudyHeader: React.FC<StudyHeaderProps> = ({
  study,
  isComparing,
  onToggleCompare,
}) => {
  const fuelBadge = getFuelBadge(study.fuelType);
  const FuelIcon = fuelBadge.icon;

  return (
    <div
      data-testid="study-header"
      className="w-full bg-[#111827]/85 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-[#4CC9F0]/10 blur-3xl pointer-events-none" />

      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Link
            href="/explorer"
            data-testid="back-to-explorer-link"
            className="inline-flex items-center gap-1 text-[#4CC9F0] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explorer</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-[#D4FC02] font-bold">{study.code}</span>
        </div>

        {/* External PSI Link */}
        <a
          href={study.dataAvailability.psiUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="study-nasa-psi-link"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs transition-colors"
        >
          <span>NASA PSI Repository</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#4CC9F0]" />
        </a>
      </div>

      {/* Main Title & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-xl text-xs font-black tracking-wider uppercase bg-[#D4FC02]/15 text-[#D4FC02] border border-[#D4FC02]/30 font-mono">
            {study.code}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border ${fuelBadge.bg} ${fuelBadge.text} ${fuelBadge.border}`}
          >
            <FuelIcon className="w-3.5 h-3.5" />
            <span>{fuelBadge.label}</span>
          </span>
          <span
            className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold uppercase border ${
              study.confidence === 'A'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
          >
            Tier {study.confidence} Confidence
          </span>
          <span className="px-2.5 py-1 rounded-xl text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30">
            {study.badge}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F8F9FA] tracking-tight">
          {study.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
          {study.subtitle}
        </p>
      </div>

      {/* Metadata Row: PI, Institution, Hardware, Platform, Compare Button */}
      <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-[#F8F9FA]">{study.primaryInvestigator}</span>
            {study.institution && (
              <span className="text-slate-400">({study.institution})</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>{study.hardware} · {study.platform}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-mono text-slate-400">{study.yearRange}</span>
          </div>
        </div>

        {/* Compare Button */}
        <button
          type="button"
          data-testid="header-compare-btn"
          onClick={() => onToggleCompare(study.id)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            isComparing
              ? 'bg-[#4CC9F0] text-slate-950 shadow-lg shadow-[#4CC9F0]/30'
              : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
          }`}
        >
          {isComparing ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Comparing Study</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Compare Study</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
