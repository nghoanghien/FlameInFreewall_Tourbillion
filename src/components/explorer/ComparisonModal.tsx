'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Download, ArrowRight, Columns3, Flame, Table2, LayoutGrid, FileText, Activity, AlertCircle,
} from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';
import { ComparisonColumn } from './ComparisonColumn';
import { ComparisonMatrixTable } from './ComparisonMatrixTable';
import { ParameterDeltaSummary } from './ParameterDeltaSummary';
import { calculateComparisonDeltas, generateComparisonCsv } from '@/lib/comparisonUtils';

export interface ComparisonModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  compareList?: string[];
  onRemove?: (id: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  compareList: propCompareList,
  onRemove: propOnRemove,
}) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const storeIsOpen = useWorkspaceStore((state) => state.isComparisonModalOpen);
  const storeClose = useWorkspaceStore((state) => state.closeComparisonModal);
  const storeCompareList = useWorkspaceStore((state) => state.compareList);
  const storeRemove = useWorkspaceStore((state) => state.removeFromCompare);

  const isOpen = propIsOpen ?? storeIsOpen;
  const onClose = propOnClose ?? storeClose;
  const compareList = propCompareList ?? storeCompareList;
  const onRemove = propOnRemove ?? storeRemove;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const comparedStudies = compareList
    .map((id) => INVESTIGATIONS.find((inv) => inv.id === id))
    .filter((inv): inv is (typeof INVESTIGATIONS)[0] => inv !== undefined);

  const deltas = calculateComparisonDeltas(comparedStudies);
  const sameFuelClass = new Set(comparedStudies.map((s) => s.fuelType)).size <= 1;

  const handleExportCsv = () => {
    if (comparedStudies.length === 0) return;
    try {
      const csvData = generateComparisonCsv(comparedStudies);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `flameguard-comparison-${comparedStudies.map((s) => s.code).join('-').toLowerCase()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success('Comparison CSV Exported', `Comparative metrics downloaded.`);
    } catch {
      toast.error('Export Error', 'Unable to create CSV download.');
    }
  };

  const handleOpenWorkbench = () => {
    if (comparedStudies.length === 0) return;
    onClose();
    router.push(`/mission?compare=${comparedStudies.map((s) => s.id).join(',')}`);
    toast.info('Loading Mission Workbench', 'Transferring selected studies to Gap Matrix.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-testid="comparison-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            data-testid="comparison-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-md cursor-pointer z-[100]"
            aria-hidden="true"
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="comparison-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[110] w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-gray-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] text-[#1A1A1A] overflow-hidden"
          >
            {/* Header */}
            <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0B2374]">
                  <Columns3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="comparison-modal-title" className="text-lg sm:text-xl font-black text-zinc-950 tracking-tight flex items-center gap-2">
                    Multi-Study Comparison
                    <span className="text-xs font-bold text-zinc-950 px-2.5 py-0.5 rounded-full bg-[#D4FC02] border border-lime-300">
                      {comparedStudies.length}/3 Studies
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-500">Side-by-side chamber parameter deltas &amp; combustion kinetics</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {comparedStudies.length >= 2 && (
                  <div className="hidden sm:flex items-center p-1 rounded-xl bg-gray-100 border border-gray-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setViewMode('table')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        viewMode === 'table' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Table2 className="w-3.5 h-3.5 text-[#0B2374]" />
                      <span>Table Matrix</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('cards')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        viewMode === 'cards' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5 text-[#0B2374]" />
                      <span>Cards</span>
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  data-testid="comparison-modal-close-icon"
                  onClick={onClose}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close Comparison Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gray-50/50">
              {comparedStudies.length < 2 ? (
                <div className="text-center py-16 space-y-3">
                  <Flame className="w-10 h-10 text-amber-500 mx-auto opacity-75" />
                  <h4 className="text-base font-bold text-zinc-900">Select at least 2 studies</h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Multi-study comparative analysis requires 2 or 3 active investigations to calculate parameter deltas.
                  </p>
                </div>
              ) : (
                <>
                  {/* Selected Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    {comparedStudies.map((study) => (
                      <span key={study.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-gray-200 text-xs font-bold text-zinc-800 shadow-2xs">
                        <Flame className="w-3 h-3 text-[#0B2374]" />
                        <span>{study.code}</span>
                        {onRemove && (
                          <button
                            type="button"
                            onClick={() => onRemove(study.id)}
                            className="p-0.5 rounded-full hover:bg-gray-100 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                            aria-label={`Remove ${study.code}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-200/80 text-xs text-zinc-700 shadow-2xs">
                      <Flame className="w-4 h-4 text-[#0B2374] shrink-0" />
                      <span className="font-semibold truncate">{sameFuelClass ? 'Same broad fuel class' : 'Different fuel classes'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-200/80 text-xs text-zinc-700 shadow-2xs">
                      <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="font-semibold truncate">{comparedStudies.length} / {comparedStudies.length} source URLs mapped</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-200/80 text-xs text-zinc-700 shadow-2xs">
                      <Activity className="w-4 h-4 text-lime-600 shrink-0" />
                      <span className="font-semibold truncate">Calculated across {comparedStudies.length} flight studies</span>
                    </div>
                  </div>

                  {/* Parameter Deltas */}
                  <ParameterDeltaSummary comparedStudies={comparedStudies} deltas={deltas} />

                  {/* Comparative View */}
                  {viewMode === 'table' ? (
                    <ComparisonMatrixTable studies={comparedStudies} onRemove={onRemove} />
                  ) : (
                    <div
                      data-testid="comparison-grid"
                      className={`grid gap-4 ${comparedStudies.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}
                    >
                      {comparedStudies.map((study) => (
                        <ComparisonColumn key={study.id} study={study} allStudies={comparedStudies} onRemove={onRemove} />
                      ))}
                    </div>
                  )}

                  {/* HTML Reference Disclaimer Banner */}
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-medium">Similar research topics do not establish equivalent experimental conditions or material safety.</span>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <footer className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 shrink-0 bg-white">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400 hidden sm:inline">Research demo · no operational safety inference</span>
                <button
                  type="button"
                  data-testid="export-comparison-csv-btn"
                  onClick={handleExportCsv}
                  disabled={comparedStudies.length < 2}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-zinc-800 font-semibold text-xs border border-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#0B2374]" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-testid="close-comparison-modal-btn"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-zinc-700 font-semibold text-xs border border-gray-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  data-testid="open-mission-workbench-btn"
                  onClick={handleOpenWorkbench}
                  disabled={comparedStudies.length < 2}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 font-bold text-xs shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Open in Mission Workbench</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </footer>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
};