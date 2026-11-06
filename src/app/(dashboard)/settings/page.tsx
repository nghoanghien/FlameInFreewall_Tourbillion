'use client';

import React from 'react';
import {
  Settings,
  Database,
  Download,
  RotateCcw,
  Trash2,
  Scale,
  Flame,
  Gauge,
  CheckCircle2,
  Shield,
  FileSpreadsheet,
  FileCode,
  Sliders,
} from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';
import { TEST_RUNS } from '@/data/testRuns';
import { EVIDENCE_CLAIMS } from '@/data/evidenceClaims';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';

const GRAVITY_CONSTANTS = [
  { label: 'Microgravity (Quiescent)', value: '0.000 g', desc: 'ISS CIR chamber — suppressed buoyant convection' },
  { label: 'Lunar Surface', value: '0.166 g', desc: 'Artemis surface exploration partial gravity regime' },
  { label: 'Martian Surface', value: '0.380 g', desc: 'Mars atmospheric regime with reduced buoyancy' },
  { label: 'Terrestrial 1G', value: '1.000 g', desc: 'Standard Earth gravity (9.80665 m/s²) — buoyant plume' },
];

const LOI_LIMITS = [
  { material: 'Nomex', loi: '28.5% O₂', type: 'Flame-resistant flight textile' },
  { material: 'Cotton', loi: '18.0% O₂', type: 'Cellulose garment textile' },
  { material: 'PMMA (Acrylic)', loi: '17.5% O₂', type: 'Structural polymer / window material' },
  { material: 'Polyethylene (LDPE)', loi: '17.0% O₂', type: 'Cable insulation & containers' },
  { material: 'Heptane (Droplet)', loi: '14.5% O₂', type: 'Model hydrocarbon liquid fuel' },
  { material: 'Methane (Gas Jet)', loi: '12.0% O₂', type: 'Cabin trace contaminant / fuel' },
];

const ATMOSPHERIC_RANGES = [
  { param: 'Oxygen Fraction', range: '15.0% – 40.0%', nominal: '21.0% (ISS)', note: 'NASA STD-6001 fire threshold' },
  { param: 'Total Pressure', range: '8.0 – 15.0 psia', nominal: '14.7 psia (101.3 kPa)', note: '55.2 to 103.4 kPa flight range' },
  { param: 'Ventilation Airflow', range: '0.0 – 50.0 cm/s', nominal: '5.0 cm/s', note: 'Quiescent to forced convection cabin ducts' },
];

export default function SettingsPage() {
  const { activeScenario, compareList, selectedInvestigationId, resetWorkspace, clearCompare } = useWorkspaceStore();

  const handleExportCatalogJson = () => {
    const catalog = {
      dataVersion: '1.0.0',
      exportedAt: new Date().toISOString(),
      repository: 'NASA Physical Science Informatics (PSI)',
      license: 'NASA Open Science Data License / Public Domain',
      stats: { investigationsCount: INVESTIGATIONS.length, testRunsCount: TEST_RUNS.length, evidenceClaimsCount: EVIDENCE_CLAIMS.length },
      investigations: INVESTIGATIONS,
      testRuns: TEST_RUNS,
      evidenceClaims: EVIDENCE_CLAIMS,
    };
    const blob = new Blob([JSON.stringify(catalog, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flameguard-psi-catalog-complete.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success('Export Complete PSI Catalog JSON', `Exported ${INVESTIGATIONS.length} investigations, ${TEST_RUNS.length} test runs, and ${EVIDENCE_CLAIMS.length} claims.`);
  };

  const handleExportRunsCsv = () => {
    const headers = ['id', 'investigationId', 'externalRunKey', 'materialType', 'sampleGeometry', 'gravityG', 'oxygenPct', 'pressurePsi', 'flowVelocityCmS', 'flameSpreadRateMmS', 'quenchingDiameterMm', 'peakTempK', 'burnDurationSec', 'dataStatus'];
    const rows = TEST_RUNS.map((r) => [r.id, r.investigationId, r.externalRunKey, `"${r.materialType.replace(/"/g, '""')}"`, `"${r.sampleGeometry.replace(/"/g, '""')}"`, r.gravity, r.conditions.oxygenPct, r.conditions.pressurePsi, r.conditions.flowVelocityCmS, r.measurements.flameSpreadRateMmS ?? '', r.measurements.quenchingDiameterMm ?? '', r.measurements.peakTempK ?? '', r.measurements.burnDurationSec ?? '', r.dataStatus]);
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flameguard-all-test-runs.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success('Export All Test Runs CSV', `Exported ${TEST_RUNS.length} calibrated test runs to CSV.`);
  };

  return (
    <div data-testid="settings-page" className="w-full max-w-7xl mx-auto space-y-8 py-2 pb-24">
      {/* Header Banner */}
      <section aria-label="Settings Header" className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0B2374]/80 via-[#080C18]/95 to-[#080C18] border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#4CC9F0]/10 blur-3xl pointer-events-none" />
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4CC9F0]/15 border border-[#4CC9F0]/30 text-[#4CC9F0] text-xs font-mono font-bold">
            <Settings className="w-3.5 h-3.5 text-[#4CC9F0]" /> Configuration &amp; Open Science
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F8F9FA] tracking-tight">Mission Control Settings &amp; Data Provenance</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Audit NASA Physical Science Informatics (PSI) repository data integrity, export standardized datasets, manage client workspace state, and review physical computing constants for microgravity combustion modeling.
          </p>
        </div>
      </section>

      {/* Section 1: NASA PSI Dataset Information & Provenance */}
      <section data-testid="section-provenance" aria-label="NASA PSI Dataset Information & Provenance" className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#4CC9F0]/10 text-[#4CC9F0] border border-[#4CC9F0]/20"><Database className="w-5 h-5" /></div>
            <div>
              <h2 className="text-lg font-bold text-[#F8F9FA]">NASA PSI Dataset Information &amp; Provenance</h2>
              <p className="text-xs text-slate-400">Open Science repository parameters and flight investigation pedigree</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Data Version 1.0.0
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <p className="text-xs text-slate-400 font-medium">Investigations</p>
            <p className="text-2xl font-black text-[#F8F9FA]">{INVESTIGATIONS.length}</p>
            <p className="text-[11px] text-slate-400">Solid, Droplet &amp; Gas Studies</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <p className="text-xs text-slate-400 font-medium">Test Runs</p>
            <p className="text-2xl font-black text-[#4CC9F0]">{TEST_RUNS.length}</p>
            <p className="text-[11px] text-slate-400">Calibrated Flight Runs</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <p className="text-xs text-slate-400 font-medium">Evidence Claims</p>
            <p className="text-2xl font-black text-[#D4FC02]">{EVIDENCE_CLAIMS.length}</p>
            <p className="text-[11px] text-slate-400">Empirically Grounded</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <p className="text-xs text-slate-400 font-medium">Data License</p>
            <p className="text-sm font-bold text-emerald-400 pt-1">Open Science</p>
            <p className="text-[11px] text-slate-400">Public Domain / NASA PSI</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-[#F8F9FA]"><Shield className="w-4 h-4 text-[#4CC9F0]" /><span>Flight Facility &amp; Data Pipeline Provenance</span></div>
          <p>
            Data sourced from the NASA Physical Science Informatics (PSI) system at NASA Glenn Research Center (GRC), encompassing microgravity experiments from the Combustion Integrated Rack (CIR) on the International Space Station (ISS), the Saffire vehicle-scale experiments on Cygnus automated resupply vehicles, and complementary drop towers.
          </p>
        </div>
      </section>

      {/* Section 2: Bulk Export Actions */}
      <section data-testid="section-bulk-export" aria-label="Bulk Export Actions" className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2.5 rounded-xl bg-[#D4FC02]/10 text-[#D4FC02] border border-[#D4FC02]/20"><Download className="w-5 h-5" /></div>
          <div>
            <h2 className="text-lg font-bold text-[#F8F9FA]">Bulk Export Actions</h2>
            <p className="text-xs text-slate-400">Download repository snapshots for numerical modeling and analytical tools</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F8F9FA]"><FileCode className="w-4 h-4 text-[#4CC9F0]" /><span>Export Complete PSI Catalog JSON</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">Full structured JSON artifact containing all 20 investigations, 160 calibrated test runs, and 45 empirical claims with complete schema metadata.</p>
            </div>
            <button type="button" data-testid="btn-export-catalog-json" onClick={handleExportCatalogJson} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#4CC9F0] hover:bg-[#38b6dd] text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer">
              <Download className="w-4 h-4" /><span>Export Complete PSI Catalog JSON</span>
            </button>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F8F9FA]"><FileSpreadsheet className="w-4 h-4 text-[#D4FC02]" /><span>Export All Test Runs CSV</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">Tabular CSV dataset including all 160 test runs with oxygen %, pressure, flow velocities, flame spread rates, and extinguishing limits.</p>
            </div>
            <button type="button" data-testid="btn-export-runs-csv" onClick={handleExportRunsCsv} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4FC02] hover:bg-[#c3e802] text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer">
              <Download className="w-4 h-4" /><span>Export All Test Runs CSV</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Workspace State Management */}
      <section data-testid="section-state-management" aria-label="Workspace State Management" className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2.5 rounded-xl bg-[#F72585]/10 text-[#F72585] border border-[#F72585]/20"><RotateCcw className="w-5 h-5" /></div>
          <div>
            <h2 className="text-lg font-bold text-[#F8F9FA]">Workspace State Management</h2>
            <p className="text-xs text-slate-400">Manage client-side scenario cache, active filters, and docked comparison studies</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <p className="text-slate-400">Active Scenario</p>
            <p className="text-sm font-bold text-[#F8F9FA]">{activeScenario.name}</p>
            <p className="text-[11px] text-slate-400 font-mono">{activeScenario.gravity}g | {activeScenario.oxygenPct}% O₂ | {activeScenario.pressurePsi} psi</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <p className="text-slate-400">Comparison Dock</p>
            <p className="text-sm font-bold text-[#4CC9F0]">{compareList.length} / 3 studies queued</p>
            <p className="text-[11px] text-slate-400">{compareList.length > 0 ? compareList.join(', ') : 'Dock is empty'}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <p className="text-slate-400">Selected Investigation</p>
            <p className="text-sm font-bold text-[#D4FC02] font-mono">{selectedInvestigationId || 'None'}</p>
            <p className="text-[11px] text-slate-400">Active focus in workbench</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button type="button" data-testid="btn-reset-workspace" onClick={() => { resetWorkspace(); toast.success('Workspace Reset to Nominal ISS Baseline', 'Restored active scenario to ISS baseline and reset all filters.'); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all border border-white/10 cursor-pointer">
            <RotateCcw className="w-4 h-4 text-[#4CC9F0]" /><span>Reset Workspace to Nominal ISS Baseline</span>
          </button>
          <button type="button" data-testid="btn-clear-compare" onClick={() => { clearCompare(); toast.info('Comparison Dock Cleared', 'Cleared all investigations from the comparison queue.'); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all border border-white/10 cursor-pointer">
            <Trash2 className="w-4 h-4 text-rose-400" /><span>Clear Comparison Dock</span>
          </button>
        </div>
      </section>

      {/* Section 4: Physical Computing Constants */}
      <section data-testid="section-computing-constants" aria-label="Physical Computing Constants" className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20"><Scale className="w-5 h-5" /></div>
          <div>
            <h2 className="text-lg font-bold text-[#F8F9FA]">Physical Computing Constants</h2>
            <p className="text-xs text-slate-400">Reference physical parameters governing microgravity combustion simulations</p>
          </div>
        </div>
        <div className="space-y-6 text-xs">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F8F9FA] flex items-center gap-2"><Gauge className="w-4 h-4 text-[#4CC9F0]" /><span>Gravitational Acceleration Regimes</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {GRAVITY_CONSTANTS.map((g) => (
                <div key={g.label} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between"><span className="font-semibold text-slate-300">{g.label}</span><span className="font-mono font-bold text-[#4CC9F0]">{g.value}</span></div>
                  <p className="text-[11px] text-slate-400 leading-snug">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F8F9FA] flex items-center gap-2"><Flame className="w-4 h-4 text-[#D4FC02]" /><span>Limiting Oxygen Index (LOI) Combustion Thresholds</span></h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {LOI_LIMITS.map((mat) => (
                <div key={mat.material} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="font-bold text-[#F8F9FA] truncate">{mat.material}</p>
                  <p className="text-sm font-mono font-black text-[#D4FC02]">{mat.loi}</p>
                  <p className="text-[10px] text-slate-400 truncate">{mat.type}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F8F9FA] flex items-center gap-2"><Sliders className="w-4 h-4 text-[#F72585]" /><span>Spacecraft Atmospheric Test Ranges (NASA STD-6001)</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ATMOSPHERIC_RANGES.map((atm) => (
                <div key={atm.param} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between"><span className="font-semibold text-[#F8F9FA]">{atm.param}</span><span className="font-mono text-xs text-[#F72585] font-bold">{atm.range}</span></div>
                  <p className="text-[11px] text-slate-400">Nominal: <span className="text-slate-300 font-medium">{atm.nominal}</span></p>
                  <p className="text-[10px] text-slate-500">{atm.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
