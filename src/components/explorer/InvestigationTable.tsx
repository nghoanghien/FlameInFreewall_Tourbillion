'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Activity,
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
      className="w-full bg-white rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/90 text-[11px] uppercase tracking-wider text-zinc-600 font-bold">
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
          <tbody className="divide-y divide-gray-100 text-xs text-zinc-800">
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
                  className={`border-b border-gray-100 hover:bg-gray-50/70 text-zinc-800 transition-colors group ${
                    isComparing ? 'bg-lime-50/40' : ''
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
                          ? 'bg-[#D4FC02] border-[#D4FC02] text-zinc-950 font-bold shadow-2xs'
                          : 'border-gray-300 hover:border-gray-400 bg-white text-transparent'
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
                        <span className="font-bold text-xs text-[#0B2374] group-hover/link:underline">
                          {study.code}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-medium">({study.yearRange})</span>
                      </div>
                      <div className="font-semibold text-zinc-900 group-hover/link:text-[#0B2374] transition-colors line-clamp-1">
                        {study.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 line-clamp-1">
                        PI: {study.primaryInvestigator}
                      </div>
                    </Link>
                  </td>

                  {/* Fuel Phase */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${fuelBadge.bg} ${fuelBadge.text} ${fuelBadge.border}`}
                    >
                      <FuelIcon className="w-3 h-3" />
                      <span>{fuelBadge.label}</span>
                    </span>
                  </td>

                  {/* Facility & Hardware */}
                  <td className="py-3.5 px-4">
                    <div className="text-xs font-semibold text-zinc-900">{study.hardware}</div>
                    <div className="text-[11px] text-zinc-500 line-clamp-1 truncate max-w-[180px]">
                      {study.platform}
                    </div>
                  </td>

                  {/* Chamber Conditions */}
                  <td className="py-3.5 px-4 font-semibold text-[11px] text-zinc-700">
                    <div>
                      {study.oxygenRange[0]}–{study.oxygenRange[1]}% O₂
                    </div>
                    <div className="text-zinc-500 text-[10px] font-normal">
                      {study.pressureRangePsi[0]}–{study.pressureRangePsi[1]} psia · {study.flowRangeCmPerSec[1]} cm/s
                    </div>
                  </td>

                  {/* Runs Count */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-xs font-bold text-[#0B2374]">
                      <Activity className="w-3 h-3" />
                      <span>{runsCount}</span>
                    </span>
                  </td>

                  {/* Confidence Tier */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          study.confidence === 'A'
                            ? 'bg-lime-50 text-lime-900 border-lime-300'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        Tier {study.confidence}
                      </span>
                      <span className="text-[10px] font-medium text-zinc-500">
                        {study.badge}
                      </span>
                    </div>
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/explorer/${study.id}`}
                      data-testid={`table-inspect-${study.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#0B2374] hover:bg-blue-50 transition-colors"
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
