'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Compass,
  AlertCircle,
  ArrowLeft,
  Flame,
  Activity,
  Layers,
  FileText,
  Download,
  Gauge,
} from 'lucide-react';
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
import { ExplorerComparisonBar } from '@/components/explorer/ExplorerComparisonBar';

export type StudyDetailTab = 'overview' | 'runs' | 'telemetry' | 'claims' | 'psi-export';

interface PageProps {
  params?: Promise<{ id: string }> | { id: string };
}

export default function StudyDetailPage({ params }: PageProps) {
  const routerParams = useParams();

  // Handle both hook params and potential props
  const id = useMemo(() => {
    if (routerParams?.id) {
      return Array.isArray(routerParams.id) ? routerParams.id[0] : routerParams.id;
    }
    if (params) {
      if (typeof (params as { id?: string }).id === 'string') {
        return (params as { id: string }).id;
      }
    }
    return '';
  }, [routerParams, params]);

  const [activeTab, setActiveTab] = useState<StudyDetailTab>('overview');

  const compareList = useWorkspaceStore((state) => state.compareList);
  const toggleCompare = useWorkspaceStore((state) => state.toggleCompare);
  const removeFromCompare = useWorkspaceStore((state) => state.removeFromCompare);
  const clearCompare = useWorkspaceStore((state) => state.clearCompare);

  const study = useMemo(() => {
    return INVESTIGATIONS.find((inv) => inv.id === id);
  }, [id]);

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
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#F8F9FA]">Investigation Not Found</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            The requested NASA PSI study identifier &ldquo;<span className="text-[#D4FC02] font-mono">{id}</span>&rdquo; could not be found in the current catalog.
          </p>
        </div>
        <div>
          <Link
            href="/explorer"
            data-testid="not-found-return-link"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4CC9F0] hover:bg-[#38b6dd] text-slate-950 font-bold text-xs shadow-lg transition-colors"
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
      label: 'Overview & Chamber',
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
      className="w-full max-w-7xl mx-auto space-y-8 py-2 pb-24"
    >
      {/* Study Header Banner */}
      <StudyHeader
        study={study}
        isComparing={isComparing}
        onToggleCompare={toggleCompare}
      />

      {/* Tabs Navigation Bar */}
      <div
        data-testid="study-tabs-nav"
        className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-[#111827]/80 backdrop-blur-xl border border-white/10"
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
                  ? 'bg-[#4CC9F0] text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
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
      <ExplorerComparisonBar
        compareList={compareList}
        onRemove={removeFromCompare}
        onClear={clearCompare}
      />
    </div>
  );
}
