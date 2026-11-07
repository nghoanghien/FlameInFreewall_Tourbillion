'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ArrowRight, Columns3, Flame } from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';
import { ComparisonColumn } from './ComparisonColumn';
import { ParameterDeltaSummary } from './ParameterDeltaSummary';
import {
  calculateComparisonDeltas,
  generateComparisonCsv,
} from '@/lib/comparisonUtils';

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
  const storeIsOpen = useWorkspaceStore((state) => state.isComparisonModalOpen);
  const storeClose = useWorkspaceStore((state) => state.closeComparisonModal);
  const storeCompareList = useWorkspaceStore((state) => state.compareList);
  const storeRemove = useWorkspaceStore((state) => state.removeFromCompare);

  const isOpen = propIsOpen ?? storeIsOpen;
  const onClose = propOnClose ?? storeClose;
  const compareList = propCompareList ?? storeCompareList;
  const onRemove = propOnRemove ?? storeRemove;

  // Keyboard Escape listener
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

  const handleExportCsv = () => {
    if (comparedStudies.length === 0) return;
    try {
      const csvData = generateComparisonCsv(comparedStudies);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `flameguard-comparison-${comparedStudies.map((s) => s.code).join('-').toLowerCase()}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      toast.success(
        'Comparison CSV Exported',
        `Comparative metrics for ${comparedStudies.map((s) => s.code).join(', ')} downloaded.`
      );
    } catch {
      toast.error('Export Error', 'Unable to create CSV download.');
    }
  };

  const handleOpenWorkbench = () => {
    if (comparedStudies.length === 0) return;
    const queryIds = comparedStudies.map((s) => s.id).join(',');
    onClose();
    router.push(`/mission?compare=${queryIds}`);
    toast.info('Loading Mission Workbench', 'Transferring selected studies to Gap Matrix engine.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-testid="comparison-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop Blur */}
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

          {/* Modal Container */}
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
            <header className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0B2374]">
                  <Columns3 className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    id="comparison-modal-title"
                    className="text-lg sm:text-xl font-black text-zinc-950 tracking-tight flex items-center gap-2"
                  >
                    Multi-Study Comparison
                    <span className="text-xs font-bold text-zinc-950 px-2.5 py-0.5 rounded-full bg-[#D4FC02] border border-lime-300">
                      {comparedStudies.length}/3 Studies
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Side-by-side chamber parameter deltas, quench thresholds &amp; combustion kinetics
                  </p>
                </div>
              </div>

              <button
                type="button"
                data-testid="comparison-modal-close-icon"
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close Comparison Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-gray-50/50">
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
                  <ParameterDeltaSummary comparedStudies={comparedStudies} deltas={deltas} />

                  <div
                    data-testid="comparison-grid"
                    className={`grid gap-4 ${
                      comparedStudies.length === 2
                        ? 'grid-cols-1 md:grid-cols-2'
                        : 'grid-cols-1 md:grid-cols-3'
                    }`}
                  >
                    {comparedStudies.map((study) => (
                      <ComparisonColumn
                        key={study.id}
                        study={study}
                        allStudies={comparedStudies}
                        onRemove={onRemove}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer Action Buttons */}
            <footer className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 shrink-0 bg-white">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-testid="export-comparison-csv-btn"
                  onClick={handleExportCsv}
                  disabled={comparedStudies.length < 2}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-zinc-800 font-semibold text-xs border border-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#0B2374]" />
                  <span>Export Comparison CSV</span>
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
