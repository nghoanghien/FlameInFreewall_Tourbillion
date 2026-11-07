'use client';

/**
 * LandingHero Component
 * StructPaper light aesthetic with Space Apps Electric Lime (#D4FC02) accents
 * and clean typography directing users into the research modules.
 */

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  ArrowRight,
  Sparkles,
  Compass,
  ShieldAlert,
  Activity,
  Layers,
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F9FA]" data-testid="landing-hero">
      {/* Top Space Apps Announcement Banner */}
      <div
        data-testid="announcement-banner"
        className="w-full bg-[#D4FC02] text-zinc-950 py-2.5 px-4 font-semibold text-xs sm:text-sm tracking-wide shadow-xs border-b border-lime-300"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-zinc-950 text-[#D4FC02] px-2.5 py-0.5 text-xs font-black uppercase tracking-wider">
              Space Apps 2026
            </span>
            <span className="font-bold text-zinc-950">
              Space Apps Connect is now open!
            </span>
            <span className="hidden md:inline text-zinc-800">
              Join the global collaboration for Flame in Freefall.
            </span>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            <span>Explore Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Space Apps Navigation Bar */}
      <nav
        data-testid="landing-navbar"
        className="sticky top-0 z-40 w-full border-b border-gray-200 bg-[#0B2374]/80 backdrop-blur-md shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Space Apps Identity */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4FC02] to-[#4CC9F0] p-0.5 flex items-center justify-center shadow-md shadow-[#D4FC02]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B2374] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#D4FC02]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                FlameGuard <span className="text-[#D4FC02]">AI</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                NASA Space Apps 2026
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-100">
            <a href="#flame-physics" className="hover:text-[#D4FC02] transition-colors">
              Flame Physics (0g vs 1g)
            </a>
            <a href="#lunar-paradox" className="hover:text-[#D4FC02] transition-colors">
              Lunar Flammability Paradox
            </a>
            <a href="#mission-modules" className="hover:text-[#D4FC02] transition-colors">
              Research Workspace
            </a>
            <Link href="/explorer" className="hover:text-[#D4FC02] transition-colors">
              PSI Studies
            </Link>
          </div>

          {/* Quick CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 text-xs sm:text-sm font-bold shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Visual Area with StructPaper Light Backdrop */}
      <div className="relative pt-12 pb-16 md:pt-18 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft Ambient Light Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-[#D4FC02]/15 via-blue-50/60 to-purple-50/30 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-zinc-900 shadow-2xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#0B2374]" />
            <span>NASA Space Apps Challenge 2026</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4FC02]" />
            <span className="text-zinc-600">Flame in Freefall</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-zinc-950 mb-6">
            Microgravity Combustion &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2374] via-[#1E40AF] to-indigo-700">
              Spacecraft Fire Safety
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-10">
            Evidence-first intelligence platform synthesizing 20 NASA Physical Sciences Informatics
            (PSI) microgravity investigations. Uncover why flames burn spherical and blue in freefall,
            and resolve the lethal flammability paradox of lunar exploration habitats.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 font-bold text-sm sm:text-base shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Compass className="w-5 h-5 text-zinc-950" />
              <span>Enter Research Workspace</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </Link>

            <Link
              href="/explorer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-gray-50 text-zinc-900 font-bold text-sm sm:text-base border border-gray-200/90 hover:border-gray-300 shadow-2xs hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Layers className="w-5 h-5 text-[#0B2374]" />
              <span>Explore 20 PSI Studies</span>
            </Link>

            <Link
              href="/mission"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-gray-50 text-zinc-900 font-bold text-sm sm:text-base border border-gray-200/90 hover:border-gray-300 shadow-2xs hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Run Scenario Simulation</span>
            </Link>
          </div>

          {/* Telemetry Highlight Badges in StructPaper Light Cards */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all">
              <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold uppercase mb-1">
                <Activity className="w-3.5 h-3.5 text-[#0B2374]" />
                <span>PSI Archive</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-zinc-950">
                20 Studies
              </div>
              <p className="text-xs text-zinc-500 mt-1">BASS, ACME, FLEX, SoFIE flight tests</p>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all">
              <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold uppercase mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Test Runs</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-zinc-950">
                148+ Runs
              </div>
              <p className="text-xs text-zinc-500 mt-1">Quench diameters &amp; spread rates</p>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all">
              <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold uppercase mb-1">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>Physics Model</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-zinc-950">
                0g vs 1g
              </div>
              <p className="text-xs text-zinc-500 mt-1">Pure diffusion vs buoyant plume</p>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all">
              <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span>Exploration Gap</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-zinc-950">
                0 &lt; g &lt; 1
              </div>
              <p className="text-xs text-zinc-500 mt-1">Lunar &amp; Mars flammability paradox</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};