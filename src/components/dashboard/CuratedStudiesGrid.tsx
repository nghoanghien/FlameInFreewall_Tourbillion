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
  Sparkles,
} from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';
import type { Investigation, FuelCategory } from '@/types';

// Curated list of 5 flagship microgravity investigations
export const FEATURED_INVESTIGATION_IDS = [
  'bass-ii',
  'saffire-i',
  'sofie-gel',
  'flex-2',
  'acme-cfi-g',
];

export function getFuelBadgeConfig(fuelType: FuelCategory) {
  switch (fuelType) {
    case 'solid':
    case 'fabric':
      return {
        label: 'Solid Polymers',
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        icon: Flame,
      };
    case 'liquid':
    case 'droplet':
      return {
        label: 'Liquid Droplets',
        bg: 'bg-cyan-50',
        text: 'text-cyan-800',
        border: 'border-cyan-200',
        icon: Droplet,
      };
    case 'gas':
      return {
        label: 'Gaseous Flames',
        bg: 'bg-purple-50',
        text: 'text-purple-800',
        border: 'border-purple-200',
        icon: Wind,
      };
    default:
      return {
        label: 'Fuel Specimen',
        bg: 'bg-slate-50',
        text: 'text-slate-800',
        border: 'border-slate-200',
        icon: Layers,
      };
  }
}

export const CuratedStudiesGrid: React.FC = () => {
  const compareList = useWorkspaceStore((state) => state.compareList);
  const toggleCompare = useWorkspaceStore((state) => state.toggleCompare);
  const setSelectedInvestigationId = useWorkspaceStore((state) => state.setSelectedInvestigationId);

  // Filter curated investigations in explicit order
  const featuredInvestigations: Investigation[] = FEATURED_INVESTIGATION_IDS.map((id) =>
    INVESTIGATIONS.find((item) => item.id === id)
  ).filter((item): item is Investigation => Boolean(item));

  const handleToggleCompare = (
    e: React.MouseEvent,
    investigationId: string,
    investigationCode: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const isCurrentlyInCompare = compareList.includes(investigationId);
    const toggled = toggleCompare(investigationId);

    if (toggled) {
      if (isCurrentlyInCompare) {
        toast.info(
          'Removed from Comparison',
          `${investigationCode} has been removed from active comparison workspace.`
        );
      } else {
        toast.success(
          'Added to Comparison',
          `${investigationCode} is now queued for multi-study comparative analysis.`
        );
      }
    }
  };

  return (
    <section aria-label="Curated PSI Studies" className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A1A1A] flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#0B2374]" />
            Curated PSI Investigations
          </h2>
        </div>
        <Link
          href="/explorer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2374] hover:text-[#102B82] transition-colors self-start sm:self-auto"
        >
          View all 20 PSI studies <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div
        data-testid="curated-studies-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4"
      >
        {featuredInvestigations.map((inv) => {
          const isComparing = compareList.includes(inv.id);
          const fuelConfig = getFuelBadgeConfig(inv.fuelType);
          const FuelIcon = fuelConfig.icon;

          return (
            <motion.article
              key={inv.id}
              data-testid={`study-card-${inv.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`rounded-[36px] p-5 bg-gray-200/50 transition-all duration-300 flex flex-col justify-between relative group select-none cursor-pointer hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${
                isComparing
                  ? 'ring-2 ring-[#D4FC02] shadow-[0_8px_30px_rgba(212,252,2,0.3)] bg-white'
                  : ''
              }`}
            >
              <div>
                {/* Header Row: Fuel Badge, Apparatus Pill & Evidence Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-2xs border flex items-center gap-1.5 ${fuelConfig.bg} ${fuelConfig.text} ${fuelConfig.border}`}
                  >
                    <FuelIcon className="w-3 h-3" />
                    {fuelConfig.label}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-2xs bg-blue-50 text-[#0B2374] border border-blue-100">
                      {inv.hardware}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-2xs ${
                        inv.badge === 'Measured'
                          ? 'bg-[#D4FC02]/25 text-zinc-950'
                          : inv.badge === 'Modeled'
                          ? 'bg-purple-50 text-purple-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {inv.badge}
                    </span>
                  </div>
                </div>

                {/* Study Code & Title */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-black text-[#1A1A1A] tracking-tight group-hover:text-[#0B2374] transition-colors">
                      {inv.code}
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      ({inv.yearRange})
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#1A1A1A] line-clamp-1 mt-0.5">
                    {inv.title}
                  </h3>
                </div>

                {/* Primary Investigator & Platform */}
                <div className="space-y-1 mb-4 text-[11px] text-[#64748B]">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <User className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                    <span className="font-medium truncate">{inv.primaryInvestigator}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1 pl-5">
                    {inv.platform}
                  </p>
                </div>

                {/* Chamber Environment Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-white/70 mb-4 text-center">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">
                      Oxygen O₂
                    </div>
                    <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">
                      {inv.oxygenRange[0]}–{inv.oxygenRange[1]}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">
                      Pressure
                    </div>
                    <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">
                      {inv.pressureRangePsi[0]}–{inv.pressureRangePsi[1]} psi
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">
                      Test Runs
                    </div>
                    <div className="text-xs font-bold text-[#0B2374] mt-0.5">
                      {inv.dataAvailability.runCount} PSI
                    </div>
                  </div>
                </div>

                {/* Summary / Purpose */}
                <p className="text-[11px] text-[#64748B] line-clamp-2 leading-relaxed mb-4">
                  {inv.researchPurpose}
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-3 border-t border-black/5 flex items-center gap-2">
                <Link
                  href={`/explorer/${inv.id}`}
                  onClick={() => setSelectedInvestigationId(inv.id)}
                  data-testid={`view-investigation-${inv.id}`}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0B2374] hover:bg-[#102B82] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>View Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  data-testid={`toggle-compare-${inv.id}`}
                  onClick={(e) => handleToggleCompare(e, inv.id, inv.code)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border shrink-0 ${
                    isComparing
                      ? 'bg-[#D4FC02] text-zinc-950 border-[#D4FC02] hover:bg-[#c3e802]'
                      : 'bg-gray-50 hover:bg-gray-100 text-[#1A1A1A] border-gray-200'
                  }`}
                  title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
                >
                  {isComparing ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>In Compare</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Compare</span>
                    </>
                  )}
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
