'use client';

import React from 'react';
import {
  Orbit,
  Sliders,
  Wind,
  Gauge,
  Flame,
  Activity,
} from 'lucide-react';
import { SCENARIO_PRESETS } from '@/data/presets';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';
import { ScenarioPresetSelector } from './ScenarioPresetSelector';

const MATERIALS = ['PMMA', 'Nomex', 'Cotton', 'Polyethylene', 'Methane'] as const;

export const ScenarioConfigForm: React.FC = () => {
  const activeScenario = useWorkspaceStore((state) => state.activeScenario);
  const setActiveScenario = useWorkspaceStore((state) => state.setActiveScenario);
  const updateActiveScenario = useWorkspaceStore((state) => state.updateActiveScenario);

  const ppO2Val = activeScenario.pressurePsi * (activeScenario.oxygenPct / 100);
  const ppO2Display = ppO2Val.toFixed(2);

  // Classify ppO2 status
  let ppO2Status = 'Normoxic Alveolar Target';
  let ppO2Color = 'text-lime-900 border-lime-300 bg-lime-50';
  if (ppO2Val < 2.3) {
    ppO2Status = 'Hypoxic Hazard (< 2.3 psi)';
    ppO2Color = 'text-amber-700 border-amber-200 bg-amber-50';
  } else if (ppO2Val > 3.6) {
    ppO2Status = 'Hyperoxic / Flammability Surge (> 3.6 psi)';
    ppO2Color = 'text-rose-700 border-rose-200 bg-rose-50';
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

  return (
    <div
      data-testid="scenario-config-form"
      className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-6"
    >
      {/* Header & Presets Selector */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D4FC02] text-zinc-950 flex items-center justify-center border border-lime-300 font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-zinc-950 tracking-tight">
                Mission Scenario Workbench
              </h2>
              <p className="text-xs text-zinc-500">
                Configure spacecraft habitat atmosphere, gravitational acceleration, and combustible materials.
              </p>
            </div>
          </div>

          {/* Live ppO2 Telemetry Badge */}
          <div
            data-testid="badge-ppo2"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border ${ppO2Color} shadow-2xs self-start sm:self-auto`}
            title={`Oxygen Partial Pressure ppO2 = ${activeScenario.pressurePsi} psia × ${activeScenario.oxygenPct}% = ${ppO2Display} psia`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <div className="text-left font-mono">
              <span className="text-xs font-bold">ppO₂: {ppO2Display} psia</span>
              <span className="hidden sm:inline text-[10px] opacity-75 ml-1.5">({ppO2Status})</span>
            </div>
          </div>
        </div>

        {/* Modular Planetary Presets Grid */}
        <ScenarioPresetSelector
          activePresetId={activeScenario.id}
          onSelectPreset={handlePresetSelect}
        />
      </div>

      {/* Interactive Controls Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2 border-t border-gray-100">
        {/* Control 1: Gravity Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
          <div className="flex items-center justify-between">
            <label htmlFor="gravity-slider" className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <Orbit className="w-3.5 h-3.5 text-[#0B2374]" />
              Gravitational Acceleration
            </label>
            <span className="font-mono text-xs font-bold text-[#0B2374]">
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
            className="w-full accent-[#0B2374] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>0.00g (Microgravity)</span>
            <span>0.16g</span>
            <span>0.38g</span>
            <span>1.00g (Earth)</span>
          </div>
        </div>

        {/* Control 2: Oxygen % Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
          <div className="flex items-center justify-between">
            <label htmlFor="oxygen-slider" className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              Oxygen Concentration
            </label>
            <span className="font-mono text-xs font-bold text-orange-600">
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
            className="w-full accent-orange-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>15.0% (Hypoxic)</span>
            <span>21.0% (Earth)</span>
            <span>30.0% (Artemis)</span>
            <span>40.0% (Max)</span>
          </div>
        </div>

        {/* Control 3: Total Pressure psia Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
          <div className="flex items-center justify-between">
            <label htmlFor="pressure-slider" className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-purple-700" />
              Cabin Total Pressure
            </label>
            <span className="font-mono text-xs font-bold text-purple-700">
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
            className="w-full accent-purple-700 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>7.0 psia</span>
            <span>8.2 (Mars)</span>
            <span>10.2 (Moon)</span>
            <span>14.7 (ISS)</span>
            <span>16.0</span>
          </div>
        </div>

        {/* Control 4: Material Select */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
          <div className="flex items-center justify-between">
            <label htmlFor="material-select" className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#0B2374]" />
              Combustible Fuel Material
            </label>
            <span className="font-mono text-[10px] text-zinc-500">
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
            className="w-full p-2.5 rounded-2xl bg-white border border-gray-200 text-zinc-900 text-xs font-medium focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-100 shadow-2xs cursor-pointer"
          >
            {MATERIALS.map((mat) => (
              <option key={mat} value={mat}>
                {mat} {mat === 'PMMA' ? '(Standard Acrylic Polymer)' : mat === 'Nomex' ? '(Aramid Flame-Retardant)' : ''}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-zinc-500">
            Standard NASA flight materials investigated in BASS, SoFIE, and Saffire programs.
          </p>
        </div>

        {/* Control 5: Airflow Velocity Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 md:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <label htmlFor="airflow-slider" className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-[#0B2374]" />
              HVAC Forced Ventilation Speed
            </label>
            <span className="font-mono text-xs font-bold text-[#0B2374]">
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
            className="w-full accent-[#0B2374] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
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
