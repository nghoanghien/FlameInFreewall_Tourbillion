'use client';

/**
 * MissionControlCTA Component
 * Highlights the three workspace pillars with StructPaper light cards
 * and Electric Lime (#D4FC02) CTAs directing users to the research modules.
 */

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Layers,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface MissionCard {
  id: string;
  href: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  ctaText: string;
  ctaStyle: 'primary' | 'secondary';
}

const MISSION_CARDS: MissionCard[] = [
  {
    id: 'dashboard',
    href: '/dashboard',
    title: 'NASA PSI Research Dashboard',
    badge: 'Telemetry & Catalog',
    badgeColor: 'text-zinc-950 border-lime-300 bg-[#D4FC02]',
    description:
      'High-density telemetry overview across 20 NASA PSI investigations. Access 148+ flight test runs, peak flame spread rates, and fuel category distributions.',
    icon: Compass,
    features: ['20 Microgravity Flight Studies', '148+ Verified Ignition Events', 'Interactive KPI Telemetry'],
    ctaText: 'Enter Dashboard',
    ctaStyle: 'primary',
  },
  {
    id: 'explorer',
    href: '/explorer',
    title: 'Faceted Experiment Explorer',
    badge: 'Cross-Study Synthesis',
    badgeColor: 'text-blue-900 border-blue-200 bg-blue-50',
    description:
      'Filter investigations across droplet, solid, and gaseous fuels. Inspect Limiting Oxygen Indexes (LOI) and launch synchronized multi-study comparison modals.',
    icon: Layers,
    features: ['Faceted Multi-Parametric Search', 'Side-by-Side Study Comparison', 'Empirical Telemetry Curves'],
    ctaText: 'Explore Studies',
    ctaStyle: 'secondary',
  },
  {
    id: 'mission',
    href: '/mission',
    title: 'Mission Scenario & Gap Matrix',
    badge: 'Fire Safety Guardrails',
    badgeColor: 'text-amber-800 border-amber-200 bg-amber-50',
    description:
      'Evaluate habitat risk envelopes for ISS, Artemis Moon Base, and Mars. Enforce NASA PSI safety guardrails against unverified partial-gravity extrapolations.',
    icon: ShieldAlert,
    features: ['6-Dimension Condition Gap Matrix', 'NASA Safety Disclaimer Enforcement', 'Predictive Lab Readiness Audit'],
    ctaText: 'Run Risk Evaluation',
    ctaStyle: 'secondary',
  },
];

export const MissionControlCTA: React.FC = () => {
  return (
    <section id="mission-modules" className="py-16 relative w-full overflow-hidden bg-[#F8F9FA]" data-testid="mission-control-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold text-[#0B2374] shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0B2374]" />
            <span>Mission Control Workspace</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4FC02]" />
            <span>Interactive Spaceflight Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight mb-4">
            Explore the <span className="text-[#0B2374]">Three Core Pillars</span>
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Transition seamlessly between high-level NASA telemetry, deep cross-study empirical synthesis,
            and mission-critical fire safety hazard evaluation.
          </p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {MISSION_CARDS.map((card) => {
            const Icon = card.icon;
            const isPrimary = card.ctaStyle === 'primary';
            return (
              <div
                key={card.id}
                className="group rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-gray-300 transition-all duration-300"
                data-testid={`card-${card.id}`}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0B2374] group-hover:scale-105 transition-transform shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-black text-xl text-zinc-950 mb-2.5 group-hover:text-[#0B2374] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-gray-100">
                    {card.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B2374] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <Link
                  href={card.href}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isPrimary
                      ? 'bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 shadow-xs hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-gray-100 hover:bg-gray-200 text-zinc-800 border border-gray-200 shadow-2xs hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                  data-testid={`cta-btn-${card.id}`}
                >
                  <span>{card.ctaText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};