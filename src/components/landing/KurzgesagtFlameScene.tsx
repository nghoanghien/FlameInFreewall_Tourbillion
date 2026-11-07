'use client';

import React, { useState, useMemo } from 'react';
import { Flame, Sliders, SplitSquareVertical, Maximize2, Info } from 'lucide-react';
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
    <section id="flame-physics" className="py-16 relative w-full overflow-hidden bg-[#F8F9FA]" data-testid="kurzgesagt-flame-scene">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold text-[#0B2374] shadow-2xs mb-4">
            <Flame className="w-3.5 h-3.5 text-[#0B2374]" />
            <span>Kurzgesagt Vector Physics</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4FC02]" />
            <span>Buoyant Convection vs Pure Diffusion</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight mb-4">
            Why Do Flames Burn <span className="text-[#0B2374]">Round &amp; Blue</span> in Freefall?
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            On Earth, gravity pulls colder, denser air downward, forcing hot combustion gases to rise
            in a vigorous buoyant chimney draft (30–60 cm/s). In microgravity, buoyancy vanishes entirely.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white border border-gray-200/80 rounded-2xl p-3 sm:p-4 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500 mr-1 flex items-center gap-1 font-bold">
              <Sliders className="w-3.5 h-3.5 text-[#0B2374]" /> Gravity Preset:
            </span>
            {PRESETS.map((preset) => {
              const isActive = Math.abs(gravity - preset.gravity) < 0.05;
              return (
                <button
                  key={preset.id}
                  onClick={() => setGravity(preset.gravity)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D4FC02] text-zinc-950 border border-lime-300 shadow-2xs'
                      : 'bg-gray-100 text-zinc-700 hover:bg-gray-200'
                  }`}
                  data-testid={`preset-btn-${preset.id}`}
                >
                  {preset.label} ({preset.gravity}g)
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'side-by-side' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
              data-testid="mode-side-by-side"
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-[#0B2374]" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setViewMode('morph')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'morph' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
              data-testid="mode-morph"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#0B2374]" />
              <span>Interactive Morph</span>
            </button>
          </div>
        </div>

        {/* Chambers View */}
        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8" data-testid="side-by-side-grid">
            {/* Earth 1.00g */}
            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    <span className="font-black text-lg text-zinc-950">
                      Earth 1.00g Terrestrial Flame
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    Buoyant Plume
                  </span>
                </div>
                <div className="relative w-full h-72 flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-inner">
                  <EarthFlameSvg />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                  <div className="text-zinc-500 font-semibold">Sphericity</div>
                  <div className="text-base font-black text-amber-600">0.25 (Teardrop)</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                  <div className="text-zinc-500 font-semibold">Peak Temp</div>
                  <div className="text-base font-black text-zinc-900">~1,760 K</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                  <div className="text-zinc-500 font-semibold">Flicker</div>
                  <div className="text-base font-black text-zinc-800">~10.0 Hz</div>
                </div>
              </div>
            </div>

            {/* ISS 0.00g */}
            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="font-black text-lg text-zinc-950">
                      ISS 0.00g Microgravity Flame
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                    Spherical Diffusion
                  </span>
                </div>
                <div className="relative w-full h-72 flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-inner">
                  <IssFlameSvg />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                  <div className="text-zinc-500 font-semibold">Sphericity</div>
                  <div className="text-base font-black text-cyan-600">0.98 (Spherical)</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                  <div className="text-zinc-500 font-semibold">Peak Temp</div>
                  <div className="text-base font-black text-zinc-900">~1,420 K</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                  <div className="text-zinc-500 font-semibold">Flicker</div>
                  <div className="text-base font-black text-zinc-800">0.4 Hz (Steady)</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Morph Flame Chamber */
          <div className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-2xs mb-8" data-testid="morph-chamber">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div>
                <h3 className="text-xl font-black text-zinc-950 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  Continuous Gravitational Flame Morphing
                </h3>
                <p className="text-xs text-zinc-600 mt-1">
                  Adjust gravity from 0.00g (pure diffusion sphere) to 1.00g (buoyant elongated teardrop)
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-72 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-zinc-600">0.0g</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={gravity}
                  onChange={(e) => setGravity(parseFloat(e.target.value))}
                  className="w-full accent-[#0B2374] cursor-pointer"
                  data-testid="gravity-slider"
                  aria-label="Gravity Slider"
                />
                <span className="text-xs font-black text-[#0B2374] min-w-[42px] text-right">
                  {gravity.toFixed(2)}g
                </span>
              </div>
            </div>

            <div className="relative w-full h-80 flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-inner">
              <MorphFlameSvg gravity={gravity} />
            </div>
          </div>
        )}

        {/* Live Telemetry HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs mb-8" data-testid="live-telemetry-hud">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-3 shadow-2xs">
            <span className="text-zinc-500 block text-[11px] font-semibold">Sphericity</span>
            <span className="text-base font-black text-[#0B2374]">
              {(telemetry.sphericity * 100).toFixed(0)}%
            </span>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-2xl p-3 shadow-2xs">
            <span className="text-zinc-500 block text-[11px] font-semibold">Flame Elongation</span>
            <span className="text-base font-black text-cyan-600">
              {telemetry.elongation.toFixed(2)}x
            </span>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-2xl p-3 shadow-2xs">
            <span className="text-zinc-500 block text-[11px] font-semibold">Peak Temperature</span>
            <span className="text-base font-black text-amber-600">
              {telemetry.peakTempK} K
            </span>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-2xl p-3 shadow-2xs">
            <span className="text-zinc-500 block text-[11px] font-semibold">Soot Fraction</span>
            <span className="text-base font-black text-zinc-800">
              {(telemetry.sootFraction * 100).toFixed(0)}%
            </span>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-2xl p-3 shadow-2xs">
            <span className="text-zinc-500 block text-[11px] font-semibold">Flicker Rate</span>
            <span className="text-base font-black text-purple-600">
              {telemetry.flickerFrequencyHz} Hz
            </span>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-2xl p-3 shadow-2xs">
            <span className="text-zinc-500 block text-[11px] font-semibold">Regime</span>
            <span className="text-[11px] font-bold text-zinc-900 truncate block" title={telemetry.regimeLabel}>
              {telemetry.regimeLabel}
            </span>
          </div>
        </div>

        {/* Key Physics Takeaway Card */}
        <div className="rounded-3xl border border-blue-200 bg-blue-50/60 p-6 flex items-start gap-4 shadow-2xs">
          <div className="w-10 h-10 rounded-2xl bg-white border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-[#0B2374] shadow-2xs">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-zinc-950 mb-1">
              NASA PSI Microgravity Discovery: Why ISS Flames Burn Longer &amp; Cooler
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
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