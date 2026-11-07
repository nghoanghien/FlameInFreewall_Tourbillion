'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  Flame,
  Activity,
  FileText,
  Download,
  Gauge,
} from 'lucide-react';
import type { Investigation } from '@/types';
import { INVESTIGATIONS } from '@/data/investigations';
import { TEST_RUNS } from '@/data/testRuns';
import { EVIDENCE_CLAIMS } from '@/data/evidenceClaims';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { StudyHeader } from '@/components/explorer/detail/StudyHeader';
import { ChamberOverviewTab } from '@/components/explorer/detail/ChamberOverviewTab';
import { TestRunsTable } from '@/components/explorer/detail/TestRunsTable';
import { TelemetryPane } from '@/components/explorer/detail/TelemetryPane';
import { ClaimsList } from '@/components/explorer/detail/ClaimsList';
import { PsiExportTab } from '@/components/explorer/detail/PsiExportTab';
import { ComparisonBar } from '@/components/explorer/ComparisonBar';
import { ComparisonModal } from '@/components/explorer/ComparisonModal';

export type StudyDetailTab = 'overview' | 'runs' | 'telemetry' | 'claims' | 'psi-export';

export interface StudyDetailClientProps {
  params?: Promise<{ id: string }>;
  investigation?: Investigation;
}

export function StudyDetailClient({ params, investigation: propsInvestigation }: StudyDetailClientProps) {
  const routerParams = useParams();
  const unwrappedParams = params ? React.use(params) : undefined;

  const id = useMemo(() => {
    if (propsInvestigation?.id) return propsInvestigation.id;
    if (routerParams?.id) {
      return Array.isArray(routerParams.id) ? routerParams.id[0] : routerParams.id;
    }
    if (unwrappedParams?.id) {
      return unwrappedParams.id;
    }
    return '';
  }, [propsInvestigation, routerParams, unwrappedParams]);

  const [activeTab, setActiveTab] = useState<StudyDetailTab>('overview');

  const compareList = useWorkspaceStore((state) => state.compareList);
  const toggleCompare = useWorkspaceStore((state) => state.toggleCompare);
  const removeFromCompare = useWorkspaceStore((state) => state.removeFromCompare);
  const clearCompare = useWorkspaceStore((state) => state.clearCompare);
  const isComparisonModalOpen = useWorkspaceStore((state) => state.isComparisonModalOpen);
  const setComparisonModalOpen = useWorkspaceStore((state) => state.setComparisonModalOpen);

  const study = useMemo(() => {
    if (propsInvestigation) return propsInvestigation;
    return INVESTIGATIONS.find((inv) => inv.id === id);
  }, [propsInvestigation, id]);

  const studyRuns = useMemo(() => {
    if (!study) return [];
    return TEST_RUNS.filter((r) => r.investigationId === study.id);
  }, [study]);

  const studyClaims = useMemo(() => {
    if (!study) return [];
    return EVIDENCE_CLAIMS.filter((c) => c.investigationId === study.id);
  }, [study]);

  // Not Found State
  if (!study) {
    return (
      <div
        data-testid="study-not-found"
        className="w-full max-w-4xl mx-auto py-16 px-4 text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-zinc-950">Investigation Not Found</h1>
          <p className="text-sm text-zinc-600 max-w-md mx-auto">
            The requested NASA PSI study identifier &ldquo;<span className="text-[#0B2374] font-mono font-bold">{id}</span>&rdquo; could not be found in the current catalog.
          </p>
        </div>
        <div>
          <Link
            href="/explorer"
            data-testid="not-found-return-link"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2374] hover:bg-[#081b59] text-white font-bold text-xs shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Experiment Explorer</span>
          </Link>
        </div>
      </div>
    );
  }

  const isComparing = compareList.includes(study.id);

  const TABS = [
    {
      id: 'overview' as const,
      label: 'Chamber Overview',
      icon: Gauge,
    },
    {
      id: 'runs' as const,
      label: `Test Runs (${studyRuns.length})`,
      icon: Activity,
    },
    {
      id: 'telemetry' as const,
      label: 'Telemetry Curves',
      icon: Flame,
    },
    {
      id: 'claims' as const,
      label: `Claims (${studyClaims.length})`,
      icon: FileText,
    },
    {
      id: 'psi-export' as const,
      label: 'PSI Raw Export',
      icon: Download,
    },
  ];

  return (
    <div
      data-testid="study-detail-page"
      className="w-full max-w-7xl mx-auto space-y-6 py-2 pb-24"
    >
      {/* Study Header Banner */}
      <StudyHeader
        study={study}
        isComparing={isComparing}
        onToggleCompare={toggleCompare}
      />

      {/* StructPaper Pill Tabs Navigation Bar */}
      <div
        data-testid="study-tabs-nav"
        className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-gray-100/80 border border-gray-200/60"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              data-testid={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-white text-zinc-950 font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      <section aria-label="Tab Content" className="transition-all duration-200">
        {activeTab === 'overview' && <ChamberOverviewTab study={study} />}
        {activeTab === 'runs' && <TestRunsTable study={study} />}
        {activeTab === 'telemetry' && <TelemetryPane study={study} />}
        {activeTab === 'claims' && <ClaimsList study={study} />}
        {activeTab === 'psi-export' && <PsiExportTab study={study} />}
      </section>

      {/* Floating Comparison Dock */}
      <ComparisonBar
        compareList={compareList}
        onRemove={removeFromCompare}
        onClear={clearCompare}
        onOpenModal={() => setComparisonModalOpen(true)}
      />

      {/* Multi-Study Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        compareList={compareList}
        onRemove={removeFromCompare}
      />
    </div>
  );
}

export default StudyDetailClient;
