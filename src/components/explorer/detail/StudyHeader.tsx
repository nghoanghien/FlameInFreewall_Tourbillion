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
  ChevronRight,
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
      className="w-full bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden"
    >
      {/* Top Breadcrumb & External PSI Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-500 font-medium">
          <Link
            href="/explorer"
            data-testid="back-to-explorer-link"
            className="inline-flex items-center gap-1 text-[#0B2374] hover:text-[#081b59] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explorer</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-900 font-bold">{study.code}</span>
        </div>

        {/* External PSI Link */}
        <a
          href={study.dataAvailability.psiUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="study-nasa-psi-link"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-zinc-700 hover:text-zinc-950 text-xs font-semibold transition-colors"
        >
          <span>NASA PSI Repository</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#0B2374]" />
        </a>
      </div>

      {/* Main Title & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Space Apps Electric Lime Badge */}
          <span className="px-3 py-1 rounded-xl text-xs font-black tracking-wider uppercase bg-[#D4FC02] text-zinc-950 shadow-2xs">
            {study.code}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border ${fuelBadge.bg} ${fuelBadge.text} ${fuelBadge.border}`}
          >
            <FuelIcon className="w-3.5 h-3.5" />
            <span>{fuelBadge.label}</span>
          </span>
          <span
            className={`px-2.5 py-1 rounded-xl text-xs font-bold uppercase border ${
              study.confidence === 'A'
                ? 'bg-lime-50 text-lime-900 border-lime-300'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            Tier {study.confidence} Confidence
          </span>
          <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-50 text-[#0B2374] border border-blue-200">
            {study.badge || study.hardware}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">
          {study.title}
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-4xl font-normal">
          {study.subtitle}
        </p>
      </div>

      {/* Metadata Row: PI, Institution, Hardware, Platform, Compare Button */}
      <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-zinc-400" />
            <span className="font-semibold text-zinc-900">{study.primaryInvestigator}</span>
            {study.institution && (
              <span className="text-zinc-500">({study.institution})</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-zinc-400" />
            <span>{study.hardware} · {study.platform}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-500 font-medium">{study.yearRange}</span>
          </div>
        </div>

        {/* Compare Button */}
        <button
          type="button"
          data-testid="header-compare-btn"
          onClick={() => onToggleCompare(study.id)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            isComparing
              ? 'bg-[#D4FC02] text-zinc-950 shadow-xs hover:bg-[#c4eb02]'
              : 'bg-gray-100 hover:bg-gray-200 text-zinc-800 border border-gray-200'
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
