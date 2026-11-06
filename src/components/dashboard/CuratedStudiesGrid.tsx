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
        bg: 'bg-amber-500/15',
        text: 'text-amber-300',
        border: 'border-amber-500/30',
        icon: Flame,
      };
    case 'liquid':
    case 'droplet':
      return {
        label: 'Liquid Droplets',
        bg: 'bg-cyan-500/15',
        text: 'text-cyan-300',
        border: 'border-cyan-500/30',
        icon: Droplet,
      };
    case 'gas':
      return {
        label: 'Gaseous Flames',
        bg: 'bg-purple-500/15',
        text: 'text-purple-300',
        border: 'border-purple-500/30',
        icon: Wind,
      };
    default:
      return {
        label: 'Fuel Specimen',
        bg: 'bg-slate-500/15',
        text: 'text-slate-300',
        border: 'border-slate-500/30',
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
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#F8F9FA] flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#D4FC02]" />
            Curated PSI Investigations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Featured flagship investigations spanning solid polymers, droplet extinction, cool flames, and spacecraft safety.
          </p>
        </div>
        <Link
          href="/explorer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4FC02] hover:text-[#E2FF3B] transition-colors self-start sm:self-auto"
        >
          View all 20 PSI studies <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div
        data-testid="curated-studies-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        {featuredInvestigations.map((inv) => {
          const isComparing = compareList.includes(inv.id);
          const fuelConfig = getFuelBadgeConfig(inv.fuelType);
          const FuelIcon = fuelConfig.icon;

          return (
            <article
              key={inv.id}
              data-testid={`study-card-${inv.id}`}
              className={`rounded-3xl p-5 bg-[#111827]/75 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between relative group select-none ${
                isComparing
                  ? 'border-[#D4FC02] shadow-[0_0_30px_rgba(212,252,2,0.18)] bg-[#111827]/90'
                  : 'border-white/10 hover:border-[#D4FC02]/60 hover:shadow-[0_8px_30px_rgba(212,252,2,0.12)]'
              }`}
            >
              <div>
                {/* Header Row: Fuel Badge, Hardware & Evidence Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${fuelConfig.bg} ${fuelConfig.text} ${fuelConfig.border}`}
                  >
                    <FuelIcon className="w-3 h-3" />
                    {fuelConfig.label}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0B2374]/80 text-blue-200 border border-blue-400/30">
                      {inv.hardware}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        inv.badge === 'Measured'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : inv.badge === 'Modeled'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                      }`}
                    >
                      {inv.badge}
                    </span>
                  </div>
                </div>

                {/* Study Code & Title */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-black text-[#F8F9FA] tracking-tight group-hover:text-[#D4FC02] transition-colors">
                      {inv.code}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      ({inv.yearRange})
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-200 line-clamp-1 mt-0.5">
                    {inv.title}
                  </h3>
                </div>

                {/* Primary Investigator & Platform */}
                <div className="space-y-1 mb-4 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium truncate">{inv.primaryInvestigator}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1 pl-5">
                    {inv.platform}
                  </p>
                </div>

                {/* Chamber Environment Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-[#080C18]/60 border border-white/5 mb-4 text-center">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Oxygen O₂
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                      {inv.oxygenRange[0]}–{inv.oxygenRange[1]}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Pressure
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                      {inv.pressureRangePsi[0]}–{inv.pressureRangePsi[1]} psi
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Test Runs
                    </div>
                    <div className="text-xs font-mono font-bold text-[#D4FC02] mt-0.5">
                      {inv.dataAvailability.runCount} PSI
                    </div>
                  </div>
                </div>

                {/* Summary / Purpose */}
                <p className="text-[11px] text-slate-300/90 line-clamp-2 leading-relaxed mb-4">
                  {inv.researchPurpose}
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <Link
                  href={`/explorer/${inv.id}`}
                  onClick={() => setSelectedInvestigationId(inv.id)}
                  data-testid={`view-investigation-${inv.id}`}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0B2374] hover:bg-[#102B82] text-[#F8F9FA] text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
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
                      ? 'bg-[#D4FC02] text-[#080C18] border-[#D4FC02] hover:bg-[#E2FF3B]'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/15'
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
            </article>
          );
        })}
      </div>
    </section>
  );
};
