'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Wind,
  Atom,
  CheckCircle2,
  Flame,
} from 'lucide-react';

interface AtmospherePreset {
  id: string;
  name: string;
  totalPsi: number;
  o2Pct: number;
  environment: string;
  flammabilityIndex: number; // relative to Earth 1.0x
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

  // SVG particle count calculation
  const totalDots = 40;
  const o2Dots = Math.round((current.o2Pct / 100) * totalDots);
  const n2Dots = totalDots - o2Dots;

  return (
    <section id="lunar-paradox" className="py-20 relative w-full overflow-hidden" data-testid="atmospheric-physics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/30 px-3 py-1 text-xs font-semibold text-red-400 backdrop-blur-md mb-4">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Lunar Base Flammability Paradox</span>
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <span>Equal ppO₂ ≠ Equal Fire Safety</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#F8F9FA] tracking-tight mb-4">
            The <span className="text-red-400">Moon Base Trap</span>: Why Space Habitats Burn Faster
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#0B2374] text-[#D4FC02] border-[#D4FC02]/60 shadow-lg shadow-[#0B2374]/50 scale-105'
                    : 'bg-[#111827]/70 text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
                }`}
                data-testid={`atmo-tab-${preset.id}`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Infographic Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          {/* Left Column: Kurzgesagt Molecular Gas Chamber SVG (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#111827]/80 p-6 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1.5">
                  <Atom className="w-4 h-4 text-[#4CC9F0]" /> Gas Mixture Chamber
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {current.totalPsi} psia Total
                </span>
              </div>

              {/* Vector Chamber SVG */}
              <div className="relative w-full h-56 bg-[#080C18] rounded-xl border border-white/5 p-4 flex flex-col justify-center items-center overflow-hidden">
                <svg viewBox="0 0 280 160" className="w-full h-full" aria-label="Atmospheric Molecules Diagram">
                  {/* Oxygen (Cyan) particles */}
                  {Array.from({ length: o2Dots }).map((_, i) => {
                    const cx = 25 + ((i * 37) % 230);
                    const cy = 20 + ((i * 29) % 120);
                    return (
                      <circle
                        key={`o2-${i}`}
                        cx={cx}
                        cy={cy}
                        r="5.5"
                        fill="#4CC9F0"
                        className="drop-shadow-[0_0_6px_rgba(76,201,240,0.8)]"
                      />
                    );
                  })}
                  {/* Nitrogen (Indigo) particles */}
                  {Array.from({ length: n2Dots }).map((_, i) => {
                    const cx = 35 + ((i * 43) % 215);
                    const cy = 25 + ((i * 31) % 115);
                    return (
                      <circle
                        key={`n2-${i}`}
                        cx={cx}
                        cy={cy}
                        r="4.5"
                        fill="#334155"
                        stroke="#64748B"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-2 flex items-center gap-4 bg-[#080C18]/90 px-3 py-1 rounded-full border border-white/10 text-[10px] font-semibold">
                  <span className="flex items-center gap-1 text-[#4CC9F0]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4CC9F0]" /> O₂ ({current.o2Pct}%)
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" /> N₂ ({(100 - current.o2Pct).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Chamber Summary */}
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs font-semibold">
              <div className="bg-[#080C18] p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[11px]">Breathing ppO₂</span>
                <span className="text-base font-bold text-[#D4FC02]">{ppO2} psia</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Alveolar match</span>
              </div>
              <div className="bg-[#080C18] p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[11px]">Inert Dilution ppN₂</span>
                <span className="text-base font-bold text-slate-200">{ppN2} psia</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Heat-sink capacity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Paradox Mathematics & Risk Comparison (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#111827]/80 p-6 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-xl text-[#F8F9FA] flex items-center gap-2">
                  <Wind className="w-5 h-5 text-[#D4FC02]" />
                  Combustion Enthalpy vs Oxygen Mole Fraction
                </h3>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    current.riskLevel === 'Nominal'
                      ? 'bg-lime-950/40 text-lime-400 border-lime-500/40'
                      : current.riskLevel === 'Elevated'
                      ? 'bg-amber-950/40 text-amber-400 border-amber-500/40'
                      : 'bg-red-950/40 text-red-400 border-red-500/40'
                  }`}
                  data-testid="risk-badge"
                >
                  {current.riskLevel}
                </span>
              </div>

              {/* Scientific Paradox Breakdown */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="bg-[#080C18] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-200">Human Respiration Impact</span>
                    <span className="text-xs text-lime-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Nominal Oxygenation
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    At {ppO2} psia oxygen partial pressure, blood hemoglobin saturation is identical to sea-level Earth.
                    Astronauts suffer no hypoxia and can transition to low-pressure spacesuits rapidly.
                  </p>
                </div>

                <div className="bg-[#080C18] p-4 rounded-xl border border-red-500/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-red-300">Spacecraft Fire Spread Multiplier</span>
                    <span className="text-xs text-red-400 font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> {current.flammabilityIndex.toFixed(1)}x Spread Rate
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {current.id === 'earth'
                      ? 'Standard 1.0x flammability index. Nitrogen absorbs 79% of gas thermal energy.'
                      : `Oxygen mole fraction is ${o2MoleDiff}% higher than Earth! Inert nitrogen heat absorption drops by 38%, causing polymer combustion temperatures to spike by ~300 K.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Risk Gauge Meter */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400 font-medium">Polymer Flame Spread Multiplier:</span>
                <span className="font-bold text-[#D4FC02]">{current.flammabilityIndex}x Earth Baseline</span>
              </div>
              <div className="w-full bg-[#080C18] h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    current.flammabilityIndex <= 1.0
                      ? 'bg-lime-400'
                      : current.flammabilityIndex < 2.0
                      ? 'bg-amber-400'
                      : 'bg-gradient-to-r from-amber-400 to-red-500'
                  }`}
                  style={{ width: `${Math.min((current.flammabilityIndex / 3.0) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                {current.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
