'use client';

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Info,
} from 'lucide-react';
import type { Investigation, TelemetryDataPoint } from '@/types';
import { TEST_RUNS } from '@/data/testRuns';

export interface TelemetryPaneProps {
  study: Investigation;
}

export const TelemetryPane: React.FC<TelemetryPaneProps> = ({ study }) => {
  const studyRuns = useMemo(() => {
    return TEST_RUNS.filter((r) => r.investigationId === study.id);
  }, [study.id]);

  // Selected run state
  const [selectedRunId, setSelectedRunId] = useState<string>(() => {
    return studyRuns[0]?.id ?? '';
  });

  const activeRun = useMemo(() => {
    return studyRuns.find((r) => r.id === selectedRunId) || studyRuns[0] || null;
  }, [studyRuns, selectedRunId]);

  // Telemetry data points: use run's telemetrySeries, or generate smooth curve from measurements
  const telemetryData: TelemetryDataPoint[] = useMemo(() => {
    if (activeRun?.telemetrySeries && activeRun.telemetrySeries.length > 0) {
      return activeRun.telemetrySeries;
    }
    if (!activeRun) return [];

    const duration = activeRun.measurements.burnDurationSec || 60;
    const peakT = activeRun.measurements.peakTempK || 1550;
    const maxR = (activeRun.measurements.flameLengthMm || 20) / 2;
    const baseSoot = activeRun.measurements.sootVolumeFraction || 0.3;

    const points: TelemetryDataPoint[] = [];
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const t = Math.round(frac * duration);
      const r = parseFloat((maxR * Math.sin((frac * Math.PI) / 2)).toFixed(2));
      const temp = Math.round(300 + (peakT - 300) * Math.sin(Math.pow(frac, 0.6) * (Math.PI / 2)));
      const soot = parseFloat((baseSoot * Math.sin(frac * Math.PI)).toFixed(3));
      points.push({
        timeSec: t,
        flameRadiusMm: r,
        temperatureK: temp,
        sootDensity: Math.max(0.01, soot),
      });
    }
    return points;
  }, [activeRun]);

  // SVG Chart bounds & helpers
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = { top: 20, right: 30, bottom: 35, left: 55 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxTime = useMemo(() => {
    return Math.max(...telemetryData.map((d) => d.timeSec), 10);
  }, [telemetryData]);

  const maxTemp = useMemo(() => {
    return Math.max(...telemetryData.map((d) => d.temperatureK), 1800);
  }, [telemetryData]);

  const maxRadius = useMemo(() => {
    return Math.max(...telemetryData.map((d) => d.flameRadiusMm), 25);
  }, [telemetryData]);

  // Generate SVG path strings
  const tempPath = useMemo(() => {
    if (telemetryData.length === 0) return '';
    return telemetryData
      .map((d, i) => {
        const x = padding.left + (d.timeSec / maxTime) * plotWidth;
        const y = padding.top + plotHeight - (d.temperatureK / maxTemp) * plotHeight;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [telemetryData, maxTime, maxTemp, plotWidth, plotHeight, padding]);

  const radiusPath = useMemo(() => {
    if (telemetryData.length === 0) return '';
    return telemetryData
      .map((d, i) => {
        const x = padding.left + (d.timeSec / maxTime) * plotWidth;
        const y = padding.top + plotHeight - (d.flameRadiusMm / maxRadius) * plotHeight;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [telemetryData, maxTime, maxRadius, plotWidth, plotHeight, padding]);

  if (!activeRun) {
    return (
      <div
        data-testid="telemetry-empty"
        className="p-8 text-center rounded-3xl bg-white border border-gray-100 text-xs text-zinc-500 shadow-xs"
      >
        No test run telemetry available for this investigation.
      </div>
    );
  }

  return (
    <div data-testid="telemetry-pane" className="space-y-6">
      {/* Header & Run Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0B2374]" />
            <span>Time-Series Sensor Telemetry</span>
          </h3>
          <p className="text-xs text-zinc-500">
            Microgravity pyrometry and optical schlieren radiometry curves from ISS flight runs.
          </p>
        </div>

        {/* Run Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-2xl bg-gray-100 border border-gray-200/60 shrink-0">
          {studyRuns.map((run) => (
            <button
              key={run.id}
              type="button"
              data-testid={`telemetry-run-btn-${run.id}`}
              onClick={() => setSelectedRunId(run.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeRun.id === run.id
                  ? 'bg-[#4CC9F0] text-slate-950 font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
              }`}
            >
              {run.id}
            </button>
          ))}
        </div>
      </div>

      {/* Chart 1: Temperature & Flame Radius Overlay */}
      <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-[#F97316] font-semibold">
              <span className="w-3 h-0.5 bg-[#F97316] inline-block rounded-full" />
              <span>Chamber Flame Temp (K)</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#0B2374] font-semibold">
              <span className="w-3 h-0.5 bg-[#0B2374] inline-block rounded-full" />
              <span>Flame Radius (mm)</span>
            </span>
          </div>
          <span className="text-[11px] font-medium text-zinc-500">
            Sample: {activeRun.materialType} · {activeRun.conditions.oxygenPct}% O₂
          </span>
        </div>

        {/* SVG Curve Display */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            data-testid="telemetry-svg-chart"
            className="w-full h-56 min-w-[500px]"
          >
            {/* Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const y = padding.top + plotHeight * (1 - frac);
              return (
                <g key={frac}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={svgWidth - padding.right}
                    y2={y}
                    stroke="#CBD5E1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] font-semibold fill-[#475569]"
                  >
                    {Math.round(frac * maxTemp)}
                  </text>
                </g>
              );
            })}

            {/* Time Gridlines & X Labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const x = padding.left + plotWidth * frac;
              return (
                <g key={frac}>
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={svgHeight - padding.bottom}
                    stroke="#E2E8F0"
                  />
                  <text
                    x={x}
                    y={svgHeight - padding.bottom + 15}
                    textAnchor="middle"
                    className="text-[10px] font-semibold fill-[#475569]"
                  >
                    {Math.round(frac * maxTime)}s
                  </text>
                </g>
              );
            })}

            {/* Temperature Curve */}
            {tempPath && (
              <path
                d={tempPath}
                fill="none"
                stroke="#F97316"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}

            {/* Flame Radius Curve */}
            {radiusPath && (
              <path
                d={radiusPath}
                fill="none"
                stroke="#0B2374"
                strokeWidth="2"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />
            )}

            {/* Data points */}
            {telemetryData.map((d, i) => {
              const cx = padding.left + (d.timeSec / maxTime) * plotWidth;
              const cyTemp = padding.top + plotHeight - (d.temperatureK / maxTemp) * plotHeight;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cyTemp}
                  r="3.5"
                  fill="#F97316"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Sensor Calibration & Provenance Notes */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3 text-xs text-zinc-600">
        <Info className="w-4 h-4 text-[#0B2374] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-zinc-900">Instrument Provenance &amp; Sensor Calibration</span>
          <p className="text-zinc-500 leading-relaxed text-[11px]">
            Acquired using high-speed dual-wavelength color pyrometry and optical radiometer photodiode arrays aboard the {study.platform}. Time synchronization precision ±2 ms relative to chamber spark ignition.
          </p>
        </div>
      </div>
    </div>
  );
};
