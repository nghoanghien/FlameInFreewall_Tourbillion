'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
} from 'lucide-react';
import type { Investigation } from '@/types';
import { TEST_RUNS } from '@/data/testRuns';
import { EndOfListIndicator } from '@/components/ui/EndOfListIndicator';

export interface TestRunsTableProps {
  study: Investigation;
}

export const TestRunsTable: React.FC<TestRunsTableProps> = ({ study }) => {
  const [filterQuery, setFilterQuery] = useState('');

  // Runs for this study
  const studyRuns = useMemo(() => {
    return TEST_RUNS.filter((run) => run.investigationId === study.id);
  }, [study.id]);

  // Filtered runs
  const filteredRuns = useMemo(() => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return studyRuns;
    return studyRuns.filter(
      (run) =>
        run.id.toLowerCase().includes(q) ||
        run.externalRunKey.toLowerCase().includes(q) ||
        run.materialType.toLowerCase().includes(q) ||
        run.sampleGeometry.toLowerCase().includes(q)
    );
  }, [studyRuns, filterQuery]);

  // Compute stats across verified runs
  const stats = useMemo(() => {
    if (studyRuns.length === 0) return null;
    const spreadRates = studyRuns
      .map((r) => r.measurements.flameSpreadRateMmS)
      .filter((v): v is number => typeof v === 'number');
    const peakTemps = studyRuns
      .map((r) => r.measurements.peakTempK)
      .filter((v): v is number => typeof v === 'number');
    const durations = studyRuns
      .map((r) => r.measurements.burnDurationSec)
      .filter((v): v is number => typeof v === 'number');

    const maxSpread = spreadRates.length > 0 ? Math.max(...spreadRates) : null;
    const maxTemp = peakTemps.length > 0 ? Math.max(...peakTemps) : null;
    const avgDuration =
      durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : null;

    return { maxSpread, maxTemp, avgDuration, totalRuns: studyRuns.length };
  }, [studyRuns]);

  return (
    <div data-testid="test-runs-table-container" className="space-y-4">
      {/* KPI Summary Bar */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-3xl bg-white border border-gray-100 shadow-xs">
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">Total Runs</div>
            <div className="text-lg font-black text-[#0B2374] mt-0.5">{stats.totalRuns} Verified</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">Peak Spread Rate</div>
            <div className="text-lg font-black text-amber-600 mt-0.5">
              {stats.maxSpread !== null ? `${stats.maxSpread.toFixed(2)} mm/s` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">Max Chamber Temp</div>
            <div className="text-lg font-black text-rose-600 mt-0.5">
              {stats.maxTemp !== null ? `${stats.maxTemp} K` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">Avg Burn Duration</div>
            <div className="text-lg font-black text-zinc-900 mt-0.5">
              {stats.avgDuration !== null ? `${stats.avgDuration} s` : 'N/A'}
            </div>
          </div>
        </div>
      )}

      {/* Search Input for runs */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            data-testid="runs-search-input"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter runs by ID, sample material..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-[#0B2374] focus:ring-1 focus:ring-[#0B2374] text-xs text-zinc-900 placeholder:text-zinc-400 outline-none shadow-xs"
          />
        </div>
        <div className="text-xs font-mono text-zinc-500">
          Showing {filteredRuns.length} of {studyRuns.length} Runs
        </div>
      </div>

      {/* Runs Table */}
      {filteredRuns.length === 0 ? (
        <div
          data-testid="no-runs-message"
          className="p-8 text-center rounded-3xl bg-white border border-gray-100 text-zinc-500 text-xs shadow-xs"
        >
          {studyRuns.length === 0
            ? 'No discrete test runs recorded for this investigation yet in NASA PSI database.'
            : 'No test runs match your search filter.'}
        </div>
      ) : (
        <div className="w-full bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]" data-testid="runs-table">
              <thead>
                <tr className="border-b border-gray-200/80 bg-gray-50 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  <th className="py-3 px-3.5 min-w-[130px]">Run ID &amp; Key</th>
                  <th className="py-3 px-3.5 min-w-[160px]">Sample Material</th>
                  <th className="py-3 px-3.5 min-w-[120px]">Chamber (O₂/P)</th>
                  <th className="py-3 px-3.5 min-w-[90px]">Airflow</th>
                  <th className="py-3 px-3.5 min-w-[110px]">Spread Rate</th>
                  <th className="py-3 px-3.5 min-w-[100px]">Quench / Peak</th>
                  <th className="py-3 px-3.5 min-w-[80px] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-zinc-700 font-mono">
                {filteredRuns.map((run) => (
                  <tr
                    key={run.id}
                    data-testid={`run-row-${run.id}`}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Run ID & External Key */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-[#0B2374]">{run.id}</div>
                      <div className="text-[10px] text-zinc-400">{run.externalRunKey}</div>
                    </td>

                    {/* Sample Material & Geometry */}
                    <td className="py-3 px-3.5 font-sans">
                      <div className="font-medium text-zinc-900">{run.materialType}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{run.sampleGeometry}</div>
                    </td>

                    {/* Conditions */}
                    <td className="py-3 px-3.5">
                      <div className="text-zinc-800">{run.conditions.oxygenPct}% O₂</div>
                      <div className="text-[10px] text-zinc-500">{run.conditions.pressurePsi} psia</div>
                    </td>

                    {/* Airflow */}
                    <td className="py-3 px-3.5 text-zinc-800">
                      {run.conditions.flowVelocityCmS} cm/s
                    </td>

                    {/* Spread Rate */}
                    <td className="py-3 px-3.5">
                      {typeof run.measurements.flameSpreadRateMmS === 'number' ? (
                        <span className="font-bold text-[#0B2374]">
                          {run.measurements.flameSpreadRateMmS.toFixed(2)} mm/s
                        </span>
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </td>

                    {/* Quenching & Peak */}
                    <td className="py-3 px-3.5">
                      <div>
                        {typeof run.measurements.quenchingDiameterMm === 'number'
                          ? `Ø ${run.measurements.quenchingDiameterMm} mm`
                          : typeof run.measurements.peakTempK === 'number'
                          ? `${run.measurements.peakTempK} K`
                          : '—'}
                      </div>
                      {typeof run.measurements.burnDurationSec === 'number' && (
                        <div className="text-[10px] text-zinc-400">
                          {run.measurements.burnDurationSec}s burn
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3.5 text-right font-sans">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-2xs bg-lime-50 text-lime-900 border border-lime-200">
                        <CheckCircle2 className="w-2.5 h-2.5 text-lime-700" />
                        <span>{run.dataStatus}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* End of List Indicator */}
      {filteredRuns.length > 0 && (
        <EndOfListIndicator text="Bạn đã xem hết danh sách lượt thử nghiệm" />
      )}
    </div>
  );
};
