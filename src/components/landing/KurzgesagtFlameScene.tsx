'use client';

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Sliders,
  SplitSquareVertical,
  Maximize2,
  Info,
} from 'lucide-react';
import { computeCombustionPhysics } from '@/lib/combustionMath';
import { EarthFlameSvg, IssFlameSvg, MorphFlameSvg } from './FlameVectorGraphics';

interface GravityPreset {
  id: string;
  name: string;
  label: string;
  gravity: number;
}

const PRESETS: GravityPreset[] = [
  { id: 'iss', name: 'Microgravity (0.00g)', label: 'ISS Orbit', gravity: 0.0 },
  { id: 'lunar', name: 'Lunar Base (0.16g)', label: 'Moon (Artemis)', gravity: 0.16 },
  { id: 'mars', name: 'Martian Hab (0.38g)', label: 'Mars Surface', gravity: 0.38 },
  { id: 'earth', name: 'Terrestrial (1.00g)', label: 'Earth Sea-Level', gravity: 1.0 },
];

export const KurzgesagtFlameScene: React.FC = () => {
  const [gravity, setGravity] = useState<number>(0.0);
  const [viewMode, setViewMode] = useState<'morph' | 'side-by-side'>('side-by-side');

  // Compute live combustion telemetry from combustionMath engine
  const telemetry = useMemo(() => {
    return computeCombustionPhysics({
      name: 'Interactive Flame Visualizer',
      environment: gravity === 0 ? 'iss' : gravity === 1 ? 'earth' : 'custom',
      gravity,
      oxygenPct: 21,
      pressurePsi: 14.7,
      material: 'PMMA',
      airflowVelocity: 3.0,
    });
  }, [gravity]);

  return (
    <section id="flame-physics" className="py-20 relative w-full overflow-hidden" data-testid="kurzgesagt-flame-scene">
      {/* Background neon ambient gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#06B6D4]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#F97316]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4CC9F0]/30 bg-[#0B2374]/40 px-3 py-1 text-xs font-semibold text-[#4CC9F0] backdrop-blur-md mb-4">
            <Flame className="w-3.5 h-3.5 text-[#4CC9F0]" />
            <span>Kurzgesagt Vector Physics</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#4CC9F0]" />
            <span>Buoyant Convection vs Pure Diffusion</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#F8F9FA] tracking-tight mb-4">
            Why Do Flames Burn <span className="text-[#4CC9F0]">Round &amp; Blue</span> in Freefall?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            On Earth, gravity pulls colder, denser air downward, forcing hot combustion gases to rise
            in a vigorous buoyant chimney draft (30–60 cm/s). In microgravity, buoyancy vanishes entirely.
          </p>
        </div>

        {/* View Mode & Preset Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#111827]/80 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#D4FC02]" /> Gravity Preset:
            </span>
            {PRESETS.map((preset) => {
              const isActive = Math.abs(gravity - preset.gravity) < 0.05;
              return (
                <button
                  key={preset.id}
                  onClick={() => setGravity(preset.gravity)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#D4FC02] text-[#080C18] shadow-md shadow-[#D4FC02]/30 scale-105'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                  data-testid={`preset-btn-${preset.id}`}
                >
                  {preset.label} ({preset.gravity}g)
                </button>
              );
            })}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-[#080C18] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'side-by-side'
                  ? 'bg-[#0B2374] text-[#D4FC02] shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              data-testid="mode-side-by-side"
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setViewMode('morph')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'morph'
                  ? 'bg-[#0B2374] text-[#D4FC02] shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              data-testid="mode-morph"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Interactive Morph</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" data-testid="side-by-side-grid">
            {/* Earth 1.0g Chamber */}
            <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-6 flex flex-col relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#F97316] animate-pulse" />
                  <span className="font-heading font-bold text-lg text-[#F8F9FA]">
                    Earth 1.00g Terrestrial Flame
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30">
                  Buoyant Plume
                </span>
              </div>
              <div className="relative w-full h-72 flex items-center justify-center bg-[#080C18]/80 rounded-xl border border-white/5 overflow-hidden">
                <EarthFlameSvg />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-[#080C18] p-2 rounded-lg border border-white/5">
                  <div className="text-slate-400">Sphericity</div>
                  <div className="text-base font-bold text-[#F97316]">0.25 (Teardrop)</div>
                </div>
                <div className="bg-[#080C18] p-2 rounded-lg border border-white/5">
                  <div className="text-slate-400">Peak Temp</div>
                  <div className="text-base font-bold text-amber-300">~1,760 K</div>
                </div>
                <div className="bg-[#080C18] p-2 rounded-lg border border-white/5">
                  <div className="text-slate-400">Flicker</div>
                  <div className="text-base font-bold text-slate-200">~10.0 Hz</div>
                </div>
              </div>
            </div>

            {/* ISS 0.0g Chamber */}
            <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-6 flex flex-col relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#06B6D4] animate-pulse" />
                  <span className="font-heading font-bold text-lg text-[#F8F9FA]">
                    ISS 0.00g Microgravity Flame
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30">
                  Spherical Diffusion
                </span>
              </div>
              <div className="relative w-full h-72 flex items-center justify-center bg-[#080C18]/80 rounded-xl border border-white/5 overflow-hidden">
                <IssFlameSvg />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-[#080C18] p-2 rounded-lg border border-white/5">
                  <div className="text-slate-400">Sphericity</div>
                  <div className="text-base font-bold text-[#06B6D4]">0.98 (Spherical)</div>
                </div>
                <div className="bg-[#080C18] p-2 rounded-lg border border-white/5">
                  <div className="text-slate-400">Peak Temp</div>
                  <div className="text-base font-bold text-cyan-300">~1,420 K</div>
                </div>
                <div className="bg-[#080C18] p-2 rounded-lg border border-white/5">
                  <div className="text-slate-400">Flicker</div>
                  <div className="text-base font-bold text-slate-200">0.4 Hz (Steady)</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Morph Flame Chamber */
          <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-6 sm:p-8 backdrop-blur-md mb-8" data-testid="morph-chamber">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-[#F8F9FA] flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#D4FC02]" />
                  Continuous Gravitational Flame Morphing
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Adjust gravity from 0.00g (pure diffusion sphere) to 1.00g (buoyant elongated teardrop)
                </p>
              </div>

              {/* Slider */}
              <div className="flex items-center gap-3 w-full md:w-72 bg-[#080C18] p-3 rounded-xl border border-white/10">
                <span className="text-xs font-mono font-bold text-slate-300">0.0g</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={gravity}
                  onChange={(e) => setGravity(parseFloat(e.target.value))}
                  className="w-full accent-[#D4FC02] cursor-pointer"
                  data-testid="gravity-slider"
                  aria-label="Gravity Slider"
                />
                <span className="text-xs font-mono font-bold text-[#D4FC02] min-w-[42px] text-right">
                  {gravity.toFixed(2)}g
                </span>
              </div>
            </div>

            <div className="relative w-full h-80 flex items-center justify-center bg-[#080C18] rounded-xl border border-white/10 overflow-hidden">
              <MorphFlameSvg gravity={gravity} />
            </div>
          </div>
        )}

        {/* Live Combustion Physics Telemetry Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-mono mb-8" data-testid="live-telemetry-hud">
          <div className="bg-[#111827]/80 border border-white/10 rounded-xl p-3">
            <span className="text-slate-400 block text-[11px]">Sphericity</span>
            <span className="text-base font-bold text-[#D4FC02]">
              {(telemetry.sphericity * 100).toFixed(0)}%
            </span>
          </div>

          <div className="bg-[#111827]/80 border border-white/10 rounded-xl p-3">
            <span className="text-slate-400 block text-[11px]">Flame Elongation</span>
            <span className="text-base font-bold text-[#4CC9F0]">
              {telemetry.elongation.toFixed(2)}x
            </span>
          </div>

          <div className="bg-[#111827]/80 border border-white/10 rounded-xl p-3">
            <span className="text-slate-400 block text-[11px]">Peak Temperature</span>
            <span className="text-base font-bold text-amber-300">
              {telemetry.peakTempK} K
            </span>
          </div>

          <div className="bg-[#111827]/80 border border-white/10 rounded-xl p-3">
            <span className="text-slate-400 block text-[11px]">Soot Fraction</span>
            <span className="text-base font-bold text-slate-200">
              {(telemetry.sootFraction * 100).toFixed(0)}%
            </span>
          </div>

          <div className="bg-[#111827]/80 border border-white/10 rounded-xl p-3">
            <span className="text-slate-400 block text-[11px]">Flicker Rate</span>
            <span className="text-base font-bold text-purple-300">
              {telemetry.flickerFrequencyHz} Hz
            </span>
          </div>

          <div className="bg-[#111827]/80 border border-white/10 rounded-xl p-3">
            <span className="text-slate-400 block text-[11px]">Regime</span>
            <span className="text-[11px] font-bold text-lime-400 truncate block" title={telemetry.regimeLabel}>
              {telemetry.regimeLabel}
            </span>
          </div>
        </div>

        {/* Kurzgesagt Key Physics Takeaway Card */}
        <div className="rounded-2xl border border-[#D4FC02]/20 bg-gradient-to-r from-[#0B2374]/50 to-[#111827]/70 p-6 flex items-start gap-4 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-[#D4FC02]/10 border border-[#D4FC02]/30 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-[#D4FC02]" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading text-[#F8F9FA] mb-1">
              NASA PSI Microgravity Discovery: Why ISS Flames Burn Longer &amp; Cooler
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Without upward buoyant evacuation, hot carbon dioxide and water vapor linger around the flame,
              impeding fresh oxygen flow. This lowers flame temperature to ~1,200–1,400 K (or ~700 K in droplet
              cool flames) and eliminates soot incandescence. The flame burns with a dim blue luminescence
              that is nearly invisible under bright cabin lighting!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
