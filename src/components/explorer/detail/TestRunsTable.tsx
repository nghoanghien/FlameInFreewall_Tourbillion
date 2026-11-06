'use client';

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Search,
  CheckCircle2,
  Gauge,
  Thermometer,
  Clock,
  Wind,
  Layers,
} from 'lucide-react';
import type { Investigation, TestRun } from '@/types';
import { TEST_RUNS } from '@/data/testRuns';

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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#111827]/70 border border-white/10">
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Total Runs</div>
            <div className="text-lg font-black text-[#4CC9F0] mt-0.5">{stats.totalRuns} Verified</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Peak Spread Rate</div>
            <div className="text-lg font-black text-[#D4FC02] mt-0.5">
              {stats.maxSpread !== null ? `${stats.maxSpread.toFixed(2)} mm/s` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Max Chamber Temp</div>
            <div className="text-lg font-black text-[#F72585] mt-0.5">
              {stats.maxTemp !== null ? `${stats.maxTemp} K` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Avg Burn Duration</div>
            <div className="text-lg font-black text-slate-200 mt-0.5">
              {stats.avgDuration !== null ? `${stats.avgDuration} s` : 'N/A'}
            </div>
          </div>
        </div>
      )}

      {/* Search Input for runs */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            data-testid="runs-search-input"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter runs by ID, sample material..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#4CC9F0] text-xs text-[#F8F9FA] outline-none"
          />
        </div>
        <div className="text-xs font-mono text-slate-400">
          Showing {filteredRuns.length} of {studyRuns.length} Runs
        </div>
      </div>

      {/* Runs Table */}
      {filteredRuns.length === 0 ? (
        <div
          data-testid="no-runs-message"
          className="p-8 text-center rounded-2xl bg-black/20 border border-white/5 text-slate-400 text-xs"
        >
          {studyRuns.length === 0
            ? 'No discrete test runs recorded for this investigation yet in NASA PSI database.'
            : 'No test runs match your search filter.'}
        </div>
      ) : (
        <div className="w-full bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]" data-testid="runs-table">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-3.5 min-w-[130px]">Run ID &amp; Key</th>
                  <th className="py-3 px-3.5 min-w-[160px]">Sample Material</th>
                  <th className="py-3 px-3.5 min-w-[120px]">Chamber (O₂/P)</th>
                  <th className="py-3 px-3.5 min-w-[90px]">Airflow</th>
                  <th className="py-3 px-3.5 min-w-[110px]">Spread Rate</th>
                  <th className="py-3 px-3.5 min-w-[100px]">Quench / Peak</th>
                  <th className="py-3 px-3.5 min-w-[80px] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-mono">
                {filteredRuns.map((run) => (
                  <tr
                    key={run.id}
                    data-testid={`run-row-${run.id}`}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    {/* Run ID & External Key */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-[#D4FC02]">{run.id}</div>
                      <div className="text-[10px] text-slate-400">{run.externalRunKey}</div>
                    </td>

                    {/* Sample Material & Geometry */}
                    <td className="py-3 px-3.5 font-sans">
                      <div className="font-medium text-[#F8F9FA]">{run.materialType}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{run.sampleGeometry}</div>
                    </td>

                    {/* Conditions */}
                    <td className="py-3 px-3.5">
                      <div className="text-slate-200">{run.conditions.oxygenPct}% O₂</div>
                      <div className="text-[10px] text-slate-400">{run.conditions.pressurePsi} psia</div>
                    </td>

                    {/* Airflow */}
                    <td className="py-3 px-3.5 text-slate-200">
                      {run.conditions.flowVelocityCmS} cm/s
                    </td>

                    {/* Spread Rate */}
                    <td className="py-3 px-3.5">
                      {typeof run.measurements.flameSpreadRateMmS === 'number' ? (
                        <span className="font-bold text-[#4CC9F0]">
                          {run.measurements.flameSpreadRateMmS.toFixed(2)} mm/s
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
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
                        <div className="text-[10px] text-slate-400">
                          {run.measurements.burnDurationSec}s burn
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3.5 text-right font-sans">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-2.5 h-2.5" />
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
    </div>
  );
};
