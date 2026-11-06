'use client';

import React from 'react';
import {
  Database,
  ExternalLink,
  FileSpreadsheet,
  FileCode,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import type { Investigation } from '@/types';
import { TEST_RUNS } from '@/data/testRuns';
import { toast } from '@/components/toast/toast-store';

export interface PsiExportTabProps {
  study: Investigation;
}

export const PsiExportTab: React.FC<PsiExportTabProps> = ({ study }) => {
  const studyRuns = TEST_RUNS.filter((r) => r.investigationId === study.id);

  const handleExportJson = () => {
    const exportData = {
      investigation: study,
      testRuns: studyRuns,
      exportedAt: new Date().toISOString(),
      source: 'NASA Physical Science Informatics (PSI) Repository / FlameGuard AI',
    };
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flameguard-${study.code.toLowerCase()}-psi-export.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success(
      `Exported ${study.code} JSON metadata`,
      'Download started with full chamber conditions and test run parameters.'
    );
  };

  const handleExportCsv = () => {
    if (studyRuns.length === 0) {
      toast.warning('No test runs available to export as CSV.');
      return;
    }
    const headers = [
      'id',
      'externalRunKey',
      'materialType',
      'oxygenPct',
      'pressurePsi',
      'flowVelocityCmS',
      'flameSpreadRateMmS',
      'quenchingDiameterMm',
      'peakTempK',
      'burnDurationSec',
      'status',
    ];
    const rows = studyRuns.map((r) => [
      r.id,
      r.externalRunKey,
      `"${r.materialType}"`,
      r.conditions.oxygenPct,
      r.conditions.pressurePsi,
      r.conditions.flowVelocityCmS,
      r.measurements.flameSpreadRateMmS ?? '',
      r.measurements.quenchingDiameterMm ?? '',
      r.measurements.peakTempK ?? '',
      r.measurements.burnDurationSec ?? '',
      r.dataStatus,
    ]);
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flameguard-${study.code.toLowerCase()}-runs.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success(
      `Exported ${studyRuns.length} test runs to CSV`,
      'Tabular dataset ready for numerical modeling or analysis.'
    );
  };

  return (
    <div data-testid="psi-export-tab" className="space-y-6">
      {/* Overview Card */}
      <div className="p-6 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#4CC9F0]" />
              <span>NASA Physical Science Informatics (PSI) Open Data Export</span>
            </h3>
            <p className="text-xs text-slate-400">
              Download calibrated flight test runs and telemetry sets formatted for space science researchers.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Open Access NASA License</span>
          </div>
        </div>

        {/* Dataset Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono">
          <div>
            <span className="text-slate-400 text-[10px] uppercase">PSI Dataset ID</span>
            <div className="font-bold text-[#D4FC02] mt-0.5">{study.dataAvailability.psiDatasetId}</div>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase">Verified Test Runs</span>
            <div className="font-bold text-[#4CC9F0] mt-0.5">{studyRuns.length} Archived</div>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase">Available Formats</span>
            <div className="font-bold text-slate-200 mt-0.5">
              {study.dataAvailability.fileTypes.join(', ')}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            data-testid="export-json-btn"
            onClick={handleExportJson}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4CC9F0] hover:bg-[#38b6dd] text-slate-950 font-bold text-xs shadow-lg transition-colors cursor-pointer"
          >
            <FileCode className="w-4 h-4" />
            <span>Export Investigation (JSON)</span>
          </button>

          <button
            type="button"
            data-testid="export-csv-btn"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#D4FC02]" />
            <span>Export Test Runs (CSV)</span>
          </button>

          <a
            href={study.dataAvailability.psiUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="psi-portal-button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs transition-colors font-medium ml-auto"
          >
            <span>Open in NASA PSI Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#4CC9F0]" />
          </a>
        </div>
      </div>

      {/* Provenance & Citation Notice */}
      <div className="p-4 rounded-2xl bg-black/30 border border-white/5 flex items-start gap-3 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          Data courtesy of the NASA Physical Science Informatics (PSI) system. Researchers utilizing these datasets are requested to acknowledge the original Primary Investigators ({study.primaryInvestigator}) and cite the NASA PSI data archive.
        </p>
      </div>
    </div>
  );
};
