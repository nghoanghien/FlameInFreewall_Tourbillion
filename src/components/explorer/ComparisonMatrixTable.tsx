'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame, Droplet, Wind, Layers, X, Building2,
  ExternalLink, Activity, Gauge, Zap, ShieldCheck,
} from 'lucide-react';
import type { Investigation, FuelCategory } from '@/types';
import { getStudyMetrics, getStudyHighlightFlags } from '@/lib/comparisonUtils';

export interface ComparisonMatrixTableProps {
  studies: Investigation[];
  onRemove?: (id: string) => void;
}

function getFuelIcon(category: FuelCategory) {
  if (category === 'solid' || category === 'fabric') return Flame;
  if (category === 'droplet' || category === 'liquid') return Droplet;
  if (category === 'gas') return Wind;
  return Layers;
}

export const ComparisonMatrixTable: React.FC<ComparisonMatrixTableProps> = ({
  studies,
  onRemove,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xs">
      <div className="w-full overflow-x-auto">
        <table
          data-testid="comparison-matrix-table"
          className="w-full min-w-[680px] border-collapse text-left text-xs"
        >
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/90">
              <th className="sticky left-0 z-20 w-44 min-w-[160px] bg-gray-50/95 px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                ATTRIBUTE
              </th>
              {studies.map((study) => (
                <th
                  key={study.id}
                  data-testid={`comparison-column-${study.id}`}
                  className="px-4 py-3.5 min-w-[210px] align-top text-zinc-900 border-r last:border-r-0 border-gray-200/60"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        data-testid={`comparison-code-${study.id}`}
                        className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase bg-[#D4FC02] text-zinc-950 border border-lime-300"
                      >
                        {study.code}
                      </span>
                      <span
                        data-testid={`comparison-confidence-${study.id}`}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
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
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {/* Objective */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Objective
              </td>
              {studies.map((study) => (
                <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                  <div className="font-bold text-zinc-900 leading-snug">{study.title}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    {study.primaryInvestigator} {study.institution ? `· ${study.institution}` : ''}
                  </div>
                </td>
              ))}
            </tr>

            {/* Purpose & Platform */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Purpose &amp; Platform
              </td>
              {studies.map((study) => (
                <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                  <div className="flex items-center gap-1.5 font-semibold text-zinc-800">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{getStudyMetrics(study).facilitySummary}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Fuel Phase */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Fuel Phase
              </td>
              {studies.map((study) => {
                const FuelIcon = getFuelIcon(study.fuelType);
                const flags = getStudyHighlightFlags(study, studies);
                return (
                  <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-800 capitalize">
                      <FuelIcon className="w-3.5 h-3.5 text-[#0B2374] shrink-0" />
                      <span>{study.fuelType}</span>
                      {flags.isUniqueFuel && studies.length > 1 && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-purple-50 text-purple-700 border border-purple-200 ml-1">
                          Distinct Phase
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Sample Material */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Sample Material
              </td>
              {studies.map((study) => (
                <td key={study.id} className="px-4 py-3 align-top text-zinc-700 border-r last:border-r-0 border-gray-100">
                  <div className="line-clamp-2 leading-relaxed">{study.fuelDetails.materials.join(', ')}</div>
                </td>
              ))}
            </tr>

            {/* Oxygen Limits */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Oxygen Limits
              </td>
              {studies.map((study) => {
                const metrics = getStudyMetrics(study);
                const flags = getStudyHighlightFlags(study, studies);
                return (
                  <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                    <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                      <Activity className="w-3.5 h-3.5 text-[#0B2374] shrink-0" />
                      <span>{metrics.o2RangeDisplay}</span>
                    </div>
                    {flags.isHighestO2 && (
                      <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Highest O₂
                      </span>
                    )}
                    {flags.isLowestO2Moc && !flags.isHighestO2 && (
                      <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded font-bold bg-lime-50 text-lime-900 border border-lime-300">
                        Lowest MOC
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Pressure Envelope */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Pressure Envelope
              </td>
              {studies.map((study) => {
                const metrics = getStudyMetrics(study);
                const flags = getStudyHighlightFlags(study, studies);
                return (
                  <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-800">
                      <Gauge className="w-3.5 h-3.5 text-[#0B2374] shrink-0" />
                      <span>{metrics.pressureRangeDisplay}</span>
                    </div>
                    {flags.isLowestPressure && (
                      <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Hypobaric
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Airflow Velocity */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Airflow Velocity
              </td>
              {studies.map((study) => (
                <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                  <div className="flex items-center gap-1.5 font-semibold text-zinc-800">
                    <Wind className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{study.flowRangeCmPerSec[0]} – {study.flowRangeCmPerSec[1]} cm/s</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Quench Diameter */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Quench Diameter
              </td>
              {studies.map((study) => (
                <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                  <div className="flex items-center gap-1.5 font-semibold text-zinc-800">
                    <Zap className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{getStudyMetrics(study).quenchDiameterDisplay}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* NASA Source & Runs */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                NASA Source &amp; Runs
              </td>
              {studies.map((study) => (
                <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                  <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{getStudyMetrics(study).verifiedRunCount} Verified Runs</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">NASA PSI Mapped</div>
                </td>
              ))}
            </tr>

            {/* Detail View Action */}
            <tr className="bg-gray-50/30">
              <td className="sticky left-0 z-10 bg-gray-50/90 px-4 py-3 font-bold text-zinc-600 border-r border-gray-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                Detail View
              </td>
              {studies.map((study) => (
                <td key={study.id} className="px-4 py-3 align-top border-r last:border-r-0 border-gray-100">
                  <Link
                    href={`/explorer/${study.id}`}
                    data-testid={`comparison-column-details-${study.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-xs font-semibold text-zinc-800 border border-gray-200 shadow-2xs transition-colors"
                  >
                    <span>Inspect Study</span>
                    <ExternalLink className="w-3 h-3 text-[#0B2374]" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};