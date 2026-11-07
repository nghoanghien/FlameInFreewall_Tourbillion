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
import { EndOfListIndicator } from '@/components/ui/EndOfListIndicator';

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
      {/* Top Header - StructPaper Minimalist Templates Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 pb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Rocket className="w-6 h-6 text-[#0B2374]" strokeWidth={2.5} />
            <span>Mission Scenario Workbench</span>
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4FC02]/25 text-zinc-950">
            ISS · Moon · Mars
          </span>
        </div>

        {/* View Mode Switcher */}
        <div
          data-testid="mission-view-switcher"
          className="flex items-center p-1 rounded-2xl bg-white border border-gray-200/80 shrink-0 self-start md:self-auto shadow-2xs"
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
      </div>

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

      {/* End of List Indicator */}
      <EndOfListIndicator text="Bạn đã xem hết danh sách dữ liệu kịch bản" />
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
