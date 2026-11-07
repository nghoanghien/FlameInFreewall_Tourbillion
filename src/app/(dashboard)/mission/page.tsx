'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Rocket,
  Layers,
  Sparkles,
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
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#D4FC02]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-[#0B2374]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FC02] border border-lime-300 text-zinc-950 text-xs font-mono font-bold">
              <Rocket className="w-3.5 h-3.5 text-zinc-950" />
              Mission Scenario &amp; Evidence Gap Matrix
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">
              Mission Environment Scenario Workbench
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Synthesize planetary mission parameters (ISS, Moon, Mars) against 160 NASA PSI test runs. Audit 6-dimensional empirical condition gaps and execute guarded predictive models.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div
            data-testid="mission-view-switcher"
            className="flex items-center p-1.5 rounded-2xl bg-gray-100 border border-gray-200 shrink-0 self-start md:self-auto"
          >
            <button
              type="button"
              data-testid="view-tab-evidence"
              onClick={() => handleViewChange('evidence')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'evidence'
                  ? 'bg-white text-zinc-950 border border-gray-200 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 hover:bg-gray-200/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#0B2374]" />
              <span>NASA Evidence Analysis</span>
            </button>

            <button
              type="button"
              data-testid="view-tab-prediction"
              onClick={() => handleViewChange('prediction')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'prediction'
                  ? 'bg-white text-zinc-950 border border-gray-200 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 hover:bg-gray-200/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
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
        <div className="w-full max-w-7xl mx-auto py-12 text-center text-zinc-400 font-mono text-sm animate-pulse">
          Loading Mission Scenario Workbench...
        </div>
      }
    >
      <MissionContent />
    </Suspense>
  );
}
