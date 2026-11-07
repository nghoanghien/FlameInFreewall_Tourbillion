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
      {/* Page Title & Context Header - Compact Plain Background */}
      <header
        aria-label="Mission Simulator Header"
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-1"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D4FC02]/20 border border-[#D4FC02]/60 text-zinc-950 text-[10px] font-mono font-bold">
            <Rocket className="w-3 h-3 text-[#0B2374]" />
            <span>Mission Scenario &amp; Evidence Gap Matrix</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
            Mission Environment Scenario Workbench
          </h1>
          <p className="text-xs text-[#64748B]">
            Synthesize planetary mission parameters (ISS, Moon, Mars) against 160 NASA PSI test runs and audit condition gaps.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div
          data-testid="mission-view-switcher"
          className="flex items-center p-1 rounded-xl bg-gray-200/60 border border-gray-200/80 shrink-0 self-start md:self-auto"
        >
          <button
            type="button"
            data-testid="view-tab-evidence"
            onClick={() => handleViewChange('evidence')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'evidence'
                ? 'bg-white text-zinc-950 border border-gray-200 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-gray-100/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#0B2374]" />
            <span>NASA Evidence Analysis</span>
          </button>

          <button
            type="button"
            data-testid="view-tab-prediction"
            onClick={() => handleViewChange('prediction')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'prediction'
                ? 'bg-white text-zinc-950 border border-gray-200 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-gray-100/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Predictive Lab (Could Have)</span>
          </button>
        </div>
      </header>

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
