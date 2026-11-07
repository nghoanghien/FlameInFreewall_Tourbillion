'use client';

/**
 * LandingHero Component
 * Kurzgesagt flat vector art style with cosmic dark backdrop (#080C18)
 * and Space Apps Electric Lime (#D4FC02) CTAs directing into the StructPaper light dashboard.
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
    <section className="relative w-full overflow-hidden" data-testid="landing-hero">
      {/* Top Space Apps Announcement Banner */}
      <div
        data-testid="announcement-banner"
        className="w-full bg-[#D4FC02] text-[#080C18] py-2.5 px-4 font-semibold text-xs sm:text-sm tracking-wide shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#080C18] text-[#D4FC02] px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
              Space Apps 2026
            </span>
            <span className="font-bold text-[#080C18]">
              Space Apps Connect is now open!
            </span>
            <span className="hidden md:inline text-[#080C18]/80">
              Join the global collaboration for Flame in Freefall.
            </span>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#080C18] underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            <span>Explore Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Royal Navy Space Navigation Bar */}
      <nav
        data-testid="landing-navbar"
        className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B2374]/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Space Apps Identity */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4FC02] to-[#4CC9F0] p-0.5 flex items-center justify-center shadow-lg shadow-[#D4FC02]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080C18] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#D4FC02]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base tracking-tight text-[#F8F9FA] flex items-center gap-1.5">
                FlameGuard <span className="text-[#D4FC02]">AI</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                NASA Space Apps 2026
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4FC02] text-[#080C18] text-xs sm:text-sm font-bold shadow-md hover:bg-[#E2FF3B] hover:shadow-[#D4FC02]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Visual Area with Deep Cosmic Glow */}
      <div className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0B2374]/40 via-[#4CC9F0]/15 to-[#D4FC02]/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4FC02]/30 bg-[#0B2374]/40 px-3.5 py-1.5 text-xs font-semibold text-[#D4FC02] backdrop-blur-md mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4FC02]" />
            <span>NASA Space Apps Challenge 2026</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4FC02]" />
            <span className="text-slate-200">Flame in Freefall</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-[1.08] text-[#F8F9FA] mb-6">
            Microgravity Combustion &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FC02] via-[#4CC9F0] to-[#8B5CF6]">
              Spacecraft Fire Safety
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Evidence-first intelligence platform synthesizing 20 NASA Physical Sciences Informatics
            (PSI) microgravity investigations. Uncover why flames burn spherical and blue in freefall,
            and resolve the lethal flammability paradox of lunar exploration habitats.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4FC02] text-[#080C18] font-bold text-sm sm:text-base shadow-lg shadow-[#D4FC02]/25 hover:bg-[#E2FF3B] hover:shadow-[#D4FC02]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Compass className="w-5 h-5 text-[#080C18]" />
              <span>Enter Research Workspace</span>
              <ArrowRight className="w-4 h-4 text-[#080C18]" />
            </Link>

            <Link
              href="/explorer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111827]/80 text-[#F8F9FA] font-medium text-sm sm:text-base border border-white/10 hover:border-[#D4FC02]/40 hover:bg-[#162036] hover:text-[#D4FC02] transition-all backdrop-blur-sm"
            >
              <Layers className="w-5 h-5 text-slate-300" />
              <span>Explore 20 PSI Studies</span>
            </Link>

            <Link
              href="/mission"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111827]/80 text-[#F8F9FA] font-medium text-sm sm:text-base border border-white/10 hover:border-[#4CC9F0]/40 hover:bg-[#162036] hover:text-[#4CC9F0] transition-all backdrop-blur-sm"
            >
              <Flame className="w-5 h-5 text-[#4CC9F0]" />
              <span>Run Scenario Simulation</span>
            </Link>
          </div>

          {/* Telemetry Highlight Badges */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="rounded-xl border border-white/10 bg-[#111827]/60 backdrop-blur-sm p-4 hover:border-[#D4FC02]/30 transition-colors">
              <div className="flex items-center gap-2 text-[#D4FC02] text-xs font-mono uppercase mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>PSI Archive</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#F8F9FA] font-heading">
                20 Studies
              </div>
              <p className="text-xs text-slate-400 mt-1">BASS, ACME, FLEX, SoFIE flight tests</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111827]/60 backdrop-blur-sm p-4 hover:border-[#4CC9F0]/30 transition-colors">
              <div className="flex items-center gap-2 text-[#4CC9F0] text-xs font-mono uppercase mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Test Runs</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#F8F9FA] font-heading">
                148+ Runs
              </div>
              <p className="text-xs text-slate-400 mt-1">Quench diameters & spread rates</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111827]/60 backdrop-blur-sm p-4 hover:border-[#8B5CF6]/30 transition-colors">
              <div className="flex items-center gap-2 text-[#8B5CF6] text-xs font-mono uppercase mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Physics Model</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#F8F9FA] font-heading">
                0g vs 1g
              </div>
              <p className="text-xs text-slate-400 mt-1">Pure diffusion vs buoyant plume</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111827]/60 backdrop-blur-sm p-4 hover:border-red-400/30 transition-colors">
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Exploration Gap</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#F8F9FA] font-heading">
                0 &lt; g &lt; 1
              </div>
              <p className="text-xs text-slate-400 mt-1">Lunar & Mars flammability paradox</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
