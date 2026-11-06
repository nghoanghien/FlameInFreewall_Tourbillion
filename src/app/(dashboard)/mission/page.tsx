'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Rocket,
  Layers,
  Sparkles,
  ShieldAlert,
  Sliders,
  Compass,
} from 'lucide-react';
import { ScenarioConfigForm } from '@/components/mission/ScenarioConfigForm';
import { ConditionGapMatrix } from '@/components/mission/ConditionGapMatrix';
import { RankedEvidenceList } from '@/components/mission/RankedEvidenceList';
import { PredictiveLabPanel } from '@/components/mission/PredictiveLabPanel';

type MissionView = 'evidence' | 'prediction';

function MissionContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentView: MissionView =
    searchParams.get('view') === 'prediction' ? 'prediction' : 'evidence';

  const handleViewChange = (view: MissionView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      data-testid="mission-workbench"
      className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 py-2"
    >
      {/* Page Title & Context Header */}
      <section
        aria-label="Mission Simulator Header"
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0B2374]/80 via-[#080C18]/95 to-[#080C18] border border-white/10 shadow-2xl backdrop-blur-xl"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#D4FC02]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-[#4CC9F0]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FC02]/15 border border-[#D4FC02]/30 text-[#D4FC02] text-xs font-mono font-bold">
              <Rocket className="w-3.5 h-3.5 text-[#D4FC02]" />
              Mission Scenario &amp; Evidence Gap Matrix
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F8F9FA] tracking-tight">
              Mission Environment Scenario Workbench
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Synthesize planetary mission parameters (ISS, Moon, Mars) against 160 NASA PSI test runs. Audit 6-dimensional empirical condition gaps and execute guarded predictive models.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div
            data-testid="mission-view-switcher"
            className="flex items-center p-1.5 rounded-2xl bg-[#080C18]/90 border border-white/15 backdrop-blur-xl shrink-0 self-start md:self-auto"
          >
            <button
              type="button"
              data-testid="view-tab-evidence"
              onClick={() => handleViewChange('evidence')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'evidence'
                  ? 'bg-gradient-to-r from-[#0B2374] to-[#102B82] text-white border border-[#D4FC02]/40 shadow-lg text-[#D4FC02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>NASA Evidence Analysis</span>
            </button>

            <button
              type="button"
              data-testid="view-tab-prediction"
              onClick={() => handleViewChange('prediction')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'prediction'
                  ? 'bg-gradient-to-r from-[#0B2374] to-[#102B82] text-white border border-purple-400/40 shadow-lg text-purple-300'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Predictive Lab (Could Have)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Shared Scenario Configuration Form */}
      <ScenarioConfigForm />

      {/* Main View Area */}
      {currentView === 'evidence' ? (
        <div data-testid="evidence-view-container" className="space-y-6">
          {/* Condition Gap Matrix Audit */}
          <ConditionGapMatrix />

          {/* Ranked Relevant NASA PSI Studies */}
          <RankedEvidenceList />
        </div>
      ) : (
        <div data-testid="prediction-view-container" className="space-y-6">
          {/* Predictive Lab Panel */}
          <PredictiveLabPanel onSwitchToEvidence={() => handleViewChange('evidence')} />
        </div>
      )}
    </div>
  );
}

export default function MissionPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-7xl mx-auto py-12 text-center text-slate-400 font-mono text-sm animate-pulse">
          Loading Mission Scenario Workbench...
        </div>
      }
    >
      <MissionContent />
    </Suspense>
  );
}
