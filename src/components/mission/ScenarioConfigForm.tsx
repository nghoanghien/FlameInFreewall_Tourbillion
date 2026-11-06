'use client';

import React from 'react';
import {
  Orbit,
  Moon,
  Globe,
  Sliders,
  Wind,
  Gauge,
  Flame,
  Activity,
  Sparkles,
} from 'lucide-react';
import { SCENARIO_PRESETS } from '@/data/presets';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';
import type { ScenarioState } from '@/types';

const MATERIALS = ['PMMA', 'Nomex', 'Cotton', 'Polyethylene', 'Methane'] as const;

export const ScenarioConfigForm: React.FC = () => {
  const activeScenario = useWorkspaceStore((state) => state.activeScenario);
  const setActiveScenario = useWorkspaceStore((state) => state.setActiveScenario);
  const updateActiveScenario = useWorkspaceStore((state) => state.updateActiveScenario);

  const ppO2Val = activeScenario.pressurePsi * (activeScenario.oxygenPct / 100);
  const ppO2Display = ppO2Val.toFixed(2);

  // Classify ppO2 status
  let ppO2Status = 'Normoxic Alveolar Target';
  let ppO2Color = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  if (ppO2Val < 2.3) {
    ppO2Status = 'Hypoxic Hazard (< 2.3 psi)';
    ppO2Color = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  } else if (ppO2Val > 3.6) {
    ppO2Status = 'Hyperoxic / Flammability Surge (> 3.6 psi)';
    ppO2Color = 'text-red-400 border-red-500/30 bg-red-500/10';
  }

  const handlePresetSelect = (presetId: string) => {
    const preset = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setActiveScenario(preset);
    toast.info(
      `Scenario Preset Loaded: ${preset.name}`,
      `Environment configured for ${preset.gravity.toFixed(2)}g, ${preset.oxygenPct}% O₂, ${preset.pressurePsi} psia (${preset.material}).`
    );
  };

  const isPresetActive = (presetId: string) => activeScenario.id === presetId;

  return (
    <div
      data-testid="scenario-config-form"
      className="p-5 sm:p-6 rounded-3xl bg-[#0d1322]/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6"
    >
      {/* Header & Presets Selector */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D4FC02]/15 text-[#D4FC02] flex items-center justify-center border border-[#D4FC02]/30">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#F8F9FA] tracking-tight">
                Mission Scenario Workbench
              </h2>
              <p className="text-xs text-slate-400">
                Configure spacecraft habitat atmosphere, gravitational acceleration, and combustible materials.
              </p>
            </div>
          </div>

          {/* Live ppO2 Telemetry Badge */}
          <div
            data-testid="badge-ppo2"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border ${ppO2Color} backdrop-blur-md self-start sm:self-auto`}
            title={`Oxygen Partial Pressure ppO2 = ${activeScenario.pressurePsi} psia × ${activeScenario.oxygenPct}% = ${ppO2Display} psia`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <div className="text-left font-mono">
              <span className="text-xs font-bold">ppO₂: {ppO2Display} psia</span>
              <span className="hidden sm:inline text-[10px] opacity-75 ml-1.5">({ppO2Status})</span>
            </div>
          </div>
        </div>

        {/* Preset Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <button
            type="button"
            data-testid="preset-iss-baseline"
            onClick={() => handlePresetSelect('iss-baseline')}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
              isPresetActive('iss-baseline')
                ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Orbit className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold">ISS Baseline</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">0.00g · 21% O₂</div>
          </button>

          <button
            type="button"
            data-testid="preset-artemis-lunar-base"
            onClick={() => handlePresetSelect('artemis-lunar-base')}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
              isPresetActive('artemis-lunar-base')
                ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Moon className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold">Artemis Moon</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">0.16g · 30% O₂</div>
          </button>

          <button
            type="button"
            data-testid="preset-mars-surface-habitat"
            onClick={() => handlePresetSelect('mars-surface-habitat')}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
              isPresetActive('mars-surface-habitat')
                ? 'bg-rose-500/20 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Globe className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[11px] font-bold">Mars Colony</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">0.38g · 28% O₂</div>
          </button>

          <button
            type="button"
            data-testid="preset-custom-sandbox"
            onClick={() => handlePresetSelect('custom-sandbox')}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
              isPresetActive('custom-sandbox')
                ? 'bg-[#4CC9F0]/20 border-[#4CC9F0] text-white shadow-[0_0_15px_rgba(76,201,240,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#4CC9F0]" />
              <span className="text-[11px] font-bold">Custom Sandbox</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">User Tuned</div>
          </button>
        </div>
      </div>

      {/* Interactive Controls Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2 border-t border-white/10">
        {/* Control 1: Gravity Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between">
            <label htmlFor="gravity-slider" className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Orbit className="w-3.5 h-3.5 text-[#4CC9F0]" />
              Gravitational Acceleration
            </label>
            <span className="font-mono text-xs font-bold text-[#D4FC02]">
              {activeScenario.gravity.toFixed(2)}g
            </span>
          </div>
          <input
            id="gravity-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={activeScenario.gravity}
            data-testid="slider-gravity"
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              updateActiveScenario({
                id: 'custom-scenario',
                gravity: val,
                environment: val === 0 ? 'iss' : val === 0.16 ? 'lunar' : val === 0.38 ? 'mars' : 'custom',
              });
            }}
            className="w-full accent-[#D4FC02] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0.00g (Microgravity)</span>
            <span>0.16g</span>
            <span>0.38g</span>
            <span>1.00g (Earth)</span>
          </div>
        </div>

        {/* Control 2: Oxygen % Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between">
            <label htmlFor="oxygen-slider" className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#F97316]" />
              Oxygen Concentration
            </label>
            <span className="font-mono text-xs font-bold text-[#F97316]">
              {activeScenario.oxygenPct.toFixed(1)}% O₂
            </span>
          </div>
          <input
            id="oxygen-slider"
            type="range"
            min="15"
            max="40"
            step="0.5"
            value={activeScenario.oxygenPct}
            data-testid="slider-oxygen"
            onChange={(e) => {
              updateActiveScenario({
                id: 'custom-scenario',
                oxygenPct: parseFloat(e.target.value),
              });
            }}
            className="w-full accent-[#F97316] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>15.0% (Hypoxic)</span>
            <span>21.0% (Earth)</span>
            <span>30.0% (Artemis)</span>
            <span>40.0% (Max)</span>
          </div>
        </div>

        {/* Control 3: Total Pressure psia Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between">
            <label htmlFor="pressure-slider" className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#A855F7]" />
              Cabin Total Pressure
            </label>
            <span className="font-mono text-xs font-bold text-[#A855F7]">
              {activeScenario.pressurePsi.toFixed(1)} psia
            </span>
          </div>
          <input
            id="pressure-slider"
            type="range"
            min="7"
            max="16"
            step="0.1"
            value={activeScenario.pressurePsi}
            data-testid="slider-pressure"
            onChange={(e) => {
              updateActiveScenario({
                id: 'custom-scenario',
                pressurePsi: parseFloat(e.target.value),
              });
            }}
            className="w-full accent-[#A855F7] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>7.0 psia</span>
            <span>8.2 (Mars)</span>
            <span>10.2 (Moon)</span>
            <span>14.7 (ISS)</span>
            <span>16.0</span>
          </div>
        </div>

        {/* Control 4: Material Select */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between">
            <label htmlFor="material-select" className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#D4FC02]" />
              Combustible Fuel Material
            </label>
            <span className="font-mono text-[10px] text-slate-400">
              PSI Verified Baseline
            </span>
          </div>
          <select
            id="material-select"
            value={activeScenario.material}
            data-testid="select-material"
            onChange={(e) => {
              updateActiveScenario({
                id: 'custom-scenario',
                material: e.target.value,
              });
            }}
            className="w-full p-2.5 rounded-xl bg-[#080C18] border border-white/15 text-slate-200 text-xs font-medium focus:outline-none focus:border-[#D4FC02] cursor-pointer"
          >
            {MATERIALS.map((mat) => (
              <option key={mat} value={mat}>
                {mat} {mat === 'PMMA' ? '(Standard Acrylic Polymer)' : mat === 'Nomex' ? '(Aramid Flame-Retardant)' : ''}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-slate-500">
            Standard NASA flight materials investigated in BASS, SoFIE, and Saffire programs.
          </p>
        </div>

        {/* Control 5: Airflow Velocity Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 md:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <label htmlFor="airflow-slider" className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-[#4CC9F0]" />
              HVAC Forced Ventilation Speed
            </label>
            <span className="font-mono text-xs font-bold text-[#4CC9F0]">
              {activeScenario.airflowVelocity.toFixed(1)} cm/s
            </span>
          </div>
          <input
            id="airflow-slider"
            type="range"
            min="0"
            max="25"
            step="0.5"
            value={activeScenario.airflowVelocity}
            data-testid="slider-airflow"
            onChange={(e) => {
              updateActiveScenario({
                id: 'custom-scenario',
                airflowVelocity: parseFloat(e.target.value),
              });
            }}
            className="w-full accent-[#4CC9F0] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0.0 cm/s (Quiescent)</span>
            <span>2.0–8.0 cm/s (ISS Nominal)</span>
            <span>15.0 cm/s</span>
            <span>25.0 cm/s (High Duct Flow)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
