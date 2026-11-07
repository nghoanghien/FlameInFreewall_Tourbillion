'use client';

import React, { useState } from 'react';
import { ShieldAlert, Wind, Atom, CheckCircle2, Flame } from 'lucide-react';

interface AtmospherePreset {
  id: string;
  name: string;
  totalPsi: number;
  o2Pct: number;
  environment: string;
  flammabilityIndex: number;
  riskLevel: 'Nominal' | 'Elevated' | 'Extreme Flammability Risk';
  notes: string;
}

const ATMOSPHERE_PRESETS: AtmospherePreset[] = [
  {
    id: 'earth',
    name: 'Earth Sea-Level (1.00g)',
    totalPsi: 14.7,
    o2Pct: 21.0,
    environment: 'Terrestrial Baseline',
    flammabilityIndex: 1.0,
    riskLevel: 'Nominal',
    notes: '79% N₂ acts as a massive thermal heat sink, absorbing reaction enthalpy.',
  },
  {
    id: 'lunar',
    name: 'Artemis Moon Base (0.16g)',
    totalPsi: 10.2,
    o2Pct: 30.0,
    environment: 'Lunar Habitat',
    flammabilityIndex: 2.3,
    riskLevel: 'Extreme Flammability Risk',
    notes: 'Same breathing ppO₂, but 43% higher O₂ fraction. Nomex burns readily.',
  },
  {
    id: 'mars',
    name: 'Mars Habitat (0.38g)',
    totalPsi: 8.2,
    o2Pct: 28.0,
    environment: 'Martian Hab',
    flammabilityIndex: 1.9,
    riskLevel: 'Elevated',
    notes: 'Reduced pressure paired with 28% O₂ reduces pre-breathe times for EVA.',
  },
  {
    id: 'eva',
    name: 'EVA Spacesuit (0.00g)',
    totalPsi: 7.2,
    o2Pct: 34.0,
    environment: 'Space Garment',
    flammabilityIndex: 2.8,
    riskLevel: 'Extreme Flammability Risk',
    notes: 'Hyper-oxygenated low-pressure envelope creates severe flashover hazard.',
  },
];

export const AtmosphericPhysics: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('lunar');

  const current =
    ATMOSPHERE_PRESETS.find((p) => p.id === selectedId) || ATMOSPHERE_PRESETS[1];

  const ppO2 = (current.totalPsi * (current.o2Pct / 100)).toFixed(2);
  const ppN2 = (current.totalPsi * (1 - current.o2Pct / 100)).toFixed(2);
  const o2MoleDiff = (((current.o2Pct - 21.0) / 21.0) * 100).toFixed(0);

  const totalDots = 40;
  const o2Dots = Math.round((current.o2Pct / 100) * totalDots);
  const n2Dots = totalDots - o2Dots;

  return (
    <section id="lunar-paradox" className="py-16 relative w-full overflow-hidden bg-[#F8F9FA]" data-testid="atmospheric-physics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/80 px-3 py-1 text-xs font-bold text-rose-700 shadow-2xs mb-4">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Lunar Base Flammability Paradox</span>
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span>Equal ppO₂ ≠ Equal Fire Safety</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight mb-4">
            The <span className="text-rose-600">Moon Base Trap</span>: Why Space Habitats Burn Faster
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            NASA exploration atmospheres (like Artemis at 10.2 psia / 30% O₂) maintain the exact same
            human breathing oxygen partial pressure (~3.06 psia) as sea-level Earth. But to fire,
            it is a lethal accelerant.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10" data-testid="atmosphere-preset-tabs">
          {ATMOSPHERE_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedId(preset.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B2374] text-[#D4FC02] border-[#0B2374] shadow-xs scale-105'
                    : 'bg-white text-zinc-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                data-testid={`atmo-tab-${preset.id}`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Infographic Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8">
          {/* Left Column: Molecular Gas Chamber SVG (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-zinc-500 flex items-center gap-1.5">
                  <Atom className="w-4 h-4 text-[#0B2374]" /> Gas Mixture Chamber
                </span>
                <span className="text-xs font-black text-zinc-900 bg-gray-100 px-2 py-0.5 rounded-lg">
                  {current.totalPsi} psia Total
                </span>
              </div>

              <div className="relative w-full h-56 bg-zinc-950 rounded-2xl border border-zinc-800 p-4 flex flex-col justify-center items-center overflow-hidden shadow-inner">
                <svg viewBox="0 0 280 160" className="w-full h-full" aria-label="Atmospheric Molecules Diagram">
                  {Array.from({ length: o2Dots }).map((_, i) => (
                    <circle
                      key={`o2-${i}`}
                      cx={25 + ((i * 37) % 230)}
                      cy={20 + ((i * 29) % 120)}
                      r="5.5"
                      fill="#4CC9F0"
                      className="drop-shadow-[0_0_6px_rgba(76,201,240,0.8)]"
                    />
                  ))}
                  {Array.from({ length: n2Dots }).map((_, i) => (
                    <circle
                      key={`n2-${i}`}
                      cx={35 + ((i * 43) % 215)}
                      cy={25 + ((i * 31) % 115)}
                      r="4.5"
                      fill="#334155"
                      stroke="#64748B"
                      strokeWidth="1"
                    />
                  ))}
                </svg>

                <div className="absolute bottom-2 flex items-center gap-4 bg-zinc-900/90 px-3 py-1 rounded-full border border-zinc-700 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-[#4CC9F0]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4CC9F0]" /> O₂ ({current.o2Pct}%)
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" /> N₂ ({(100 - current.o2Pct).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                <span className="text-zinc-500 block text-[11px] font-semibold">Breathing ppO₂</span>
                <span className="text-base font-black text-[#0B2374]">{ppO2} psia</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">Alveolar match</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                <span className="text-zinc-500 block text-[11px] font-semibold">Inert Dilution ppN₂</span>
                <span className="text-base font-black text-zinc-900">{ppN2} psia</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">Heat-sink capacity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Paradox Mathematics & Risk Comparison (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-xl text-zinc-950 flex items-center gap-2">
                  <Wind className="w-5 h-5 text-[#0B2374]" />
                  Combustion Enthalpy vs Oxygen Mole Fraction
                </h3>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    current.riskLevel === 'Nominal'
                      ? 'bg-lime-50 text-lime-900 border-lime-300'
                      : current.riskLevel === 'Elevated'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                  data-testid="risk-badge"
                >
                  {current.riskLevel}
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-zinc-900">Human Respiration Impact</span>
                    <span className="text-xs text-lime-800 font-black flex items-center gap-1 bg-lime-100/80 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Nominal Oxygenation
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600">
                    At {ppO2} psia oxygen partial pressure, blood hemoglobin saturation is identical to sea-level Earth.
                    Astronauts suffer no hypoxia and can transition to low-pressure spacesuits rapidly.
                  </p>
                </div>

                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-rose-950">Spacecraft Fire Spread Multiplier</span>
                    <span className="text-xs text-rose-800 font-black flex items-center gap-1 bg-rose-100 px-2 py-0.5 rounded-md">
                      <Flame className="w-3.5 h-3.5" /> {current.flammabilityIndex.toFixed(1)}x Spread Rate
                    </span>
                  </div>
                  <p className="text-xs text-rose-900/80">
                    {current.id === 'earth'
                      ? 'Standard 1.0x flammability index. Nitrogen absorbs 79% of gas thermal energy.'
                      : `Oxygen mole fraction is ${o2MoleDiff}% higher than Earth! Inert nitrogen heat absorption drops by 38%, causing polymer combustion temperatures to spike by ~300 K.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-600 font-semibold">Polymer Flame Spread Multiplier:</span>
                <span className="font-black text-[#0B2374]">{current.flammabilityIndex}x Earth Baseline</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden p-0.5 border border-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    current.flammabilityIndex <= 1.0
                      ? 'bg-lime-400'
                      : current.flammabilityIndex < 2.0
                      ? 'bg-amber-400'
                      : 'bg-gradient-to-r from-amber-400 to-rose-500'
                  }`}
                  style={{ width: `${Math.min((current.flammabilityIndex / 3.0) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-2 font-medium">
                {current.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};