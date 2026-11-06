'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Plus,
  Flame,
  Droplet,
  Wind,
  Layers,
  Activity,
  ExternalLink,
} from 'lucide-react';
import type { Investigation } from '@/types';
import { getFuelBadge } from './InvestigationCard';

export interface InvestigationTableProps {
  investigations: Investigation[];
  compareList: string[];
  onToggleCompare: (id: string) => void;
  runsByInvestigationId?: Record<string, number>;
}

export const InvestigationTable: React.FC<InvestigationTableProps> = ({
  investigations,
  compareList,
  onToggleCompare,
  runsByInvestigationId = {},
}) => {
  return (
    <div
      data-testid="investigations-table"
      className="w-full bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 w-14 text-center">Compare</th>
              <th className="py-3.5 px-4 min-w-[220px]">Code &amp; Study Title</th>
              <th className="py-3.5 px-4 min-w-[120px]">Fuel Phase</th>
              <th className="py-3.5 px-4 min-w-[140px]">Facility &amp; Flight</th>
              <th className="py-3.5 px-4 min-w-[160px]">Chamber Envelope</th>
              <th className="py-3.5 px-4 min-w-[90px] text-center">Runs</th>
              <th className="py-3.5 px-4 min-w-[110px]">Confidence</th>
              <th className="py-3.5 px-4 w-28 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {investigations.map((study) => {
              const isComparing = compareList.includes(study.id);
              const fuelBadge = getFuelBadge(study.fuelType);
              const FuelIcon = fuelBadge.icon;
              const runsCount =
                runsByInvestigationId[study.id] ?? study.dataAvailability.runCount ?? 0;

              return (
                <tr
                  key={study.id}
                  data-testid={`investigation-row-${study.id}`}
                  className={`transition-colors hover:bg-white/[0.03] group ${
                    isComparing ? 'bg-[#4CC9F0]/[0.06]' : ''
                  }`}
                >
                  {/* Compare Checkbox */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      data-testid={`table-compare-btn-${study.id}`}
                      onClick={() => onToggleCompare(study.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 cursor-pointer ${
                        isComparing
                          ? 'bg-[#4CC9F0] border-[#4CC9F0] text-slate-950 font-bold shadow-sm shadow-[#4CC9F0]/40'
                          : 'border-white/20 hover:border-white/40 bg-white/5 text-transparent'
                      }`}
                      title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
                    >
                      <Check className={`w-3.5 h-3.5 stroke-[3] ${isComparing ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                  </td>

                  {/* Code & Title */}
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/explorer/${study.id}`}
                      className="group/link block space-y-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#D4FC02] group-hover/link:underline">
                          {study.code}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">({study.yearRange})</span>
                      </div>
                      <div className="font-medium text-[#F8F9FA] group-hover/link:text-[#4CC9F0] transition-colors line-clamp-1">
                        {study.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">
                        PI: {study.primaryInvestigator}
                      </div>
                    </Link>
                  </td>

                  {/* Fuel Phase */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${fuelBadge.bg} ${fuelBadge.text} ${fuelBadge.border}`}
                    >
                      <FuelIcon className="w-3 h-3" />
                      <span>{fuelBadge.label}</span>
                    </span>
                  </td>

                  {/* Facility & Hardware */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-xs text-slate-200">{study.hardware}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 truncate max-w-[180px]">
                      {study.platform}
                    </div>
                  </td>

                  {/* Chamber Conditions */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">
                    <div>
                      {study.oxygenRange[0]}–{study.oxygenRange[1]}% O₂
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      {study.pressureRangePsi[0]}–{study.pressureRangePsi[1]} psia · {study.flowRangeCmPerSec[1]} cm/s
                    </div>
                  </td>

                  {/* Runs Count */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#4CC9F0]">
                      <Activity className="w-3 h-3" />
                      <span>{runsCount}</span>
                    </span>
                  </td>

                  {/* Confidence Tier */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                          study.confidence === 'A'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        Tier {study.confidence}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {study.badge}
                      </span>
                    </div>
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/explorer/${study.id}`}
                      data-testid={`table-inspect-${study.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#4CC9F0] hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
