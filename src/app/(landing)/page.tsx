/**
 * Landing Page - FlameGuard AI
 * Kurzgesagt cosmic vector art style landing page synchronized with StructPaper light theme.
 */

import React from 'react';
import { LandingHero } from '@/components/landing/LandingHero';
import { KurzgesagtFlameScene } from '@/components/landing/KurzgesagtFlameScene';
import { AtmosphericPhysics } from '@/components/landing/AtmosphericPhysics';
import { MissionControlCTA } from '@/components/landing/MissionControlCTA';
import { LandingFooter } from '@/components/landing/LandingFooter';

export const metadata = {
  title: 'FlameGuard AI — Flame in Freefall | NASA Space Apps Challenge 2026',
  description:
    'Visual storytelling and evidence-first intelligence platform exploring microgravity combustion investigations from NASA Physical Sciences Informatics (PSI).',
};

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1A1A1A] overflow-x-hidden">
      <LandingHero />
      <KurzgesagtFlameScene />
      <AtmosphericPhysics />
      <MissionControlCTA />
      <LandingFooter />
    </main>
  );
}