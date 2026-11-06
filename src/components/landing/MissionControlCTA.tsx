'use client';

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
    badgeColor: 'text-[#D4FC02] border-[#D4FC02]/30 bg-[#0B2374]/30',
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
    badgeColor: 'text-[#4CC9F0] border-[#4CC9F0]/30 bg-[#0B2374]/30',
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
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
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
    <section id="mission-modules" className="py-20 relative w-full overflow-hidden" data-testid="mission-control-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4FC02]/30 bg-[#0B2374]/40 px-3 py-1 text-xs font-semibold text-[#D4FC02] backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4FC02]" />
            <span>Mission Control Workspace</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4FC02]" />
            <span>Interactive Spaceflight Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#F8F9FA] tracking-tight mb-4">
            Explore the <span className="text-[#D4FC02]">Three Core Pillars</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
                className="group rounded-2xl border border-white/10 bg-[#111827]/70 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md hover:border-[#D4FC02]/40 hover:bg-[#162036] transition-all duration-300 hover:shadow-xl hover:shadow-[#D4FC02]/5"
                data-testid={`card-${card.id}`}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#080C18] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#D4FC02]/40 transition-transform">
                      <Icon className="w-6 h-6 text-[#D4FC02]" />
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-extrabold text-xl text-[#F8F9FA] mb-2.5 group-hover:text-[#D4FC02] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                    {card.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FC02] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <Link
                  href={card.href}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    isPrimary
                      ? 'bg-[#D4FC02] text-[#080C18] hover:bg-[#E2FF3B] shadow-md shadow-[#D4FC02]/20 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-[#080C18] text-[#F8F9FA] border border-white/10 hover:border-[#D4FC02]/40 hover:text-[#D4FC02] hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                  data-testid={`cta-btn-${card.id}`}
                >
                  <span>{card.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
