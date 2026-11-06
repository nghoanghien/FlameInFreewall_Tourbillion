'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, X, Trash2, ArrowRight, Columns3 } from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';

export interface ComparisonBarProps {
  compareList?: string[];
  onRemove?: (id: string) => void;
  onClear?: () => void;
  onOpenModal?: () => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  compareList: propCompareList,
  onRemove: propOnRemove,
  onClear: propOnClear,
  onOpenModal: propOnOpenModal,
}) => {
  const storeCompareList = useWorkspaceStore((state) => state.compareList);
  const storeRemove = useWorkspaceStore((state) => state.removeFromCompare);
  const storeClear = useWorkspaceStore((state) => state.clearCompare);
  const storeOpenModal = useWorkspaceStore((state) => state.openComparisonModal);

  const compareList = propCompareList ?? storeCompareList;
  const onRemove = propOnRemove ?? storeRemove;
  const onClear = propOnClear ?? storeClear;
  const onOpenModal = propOnOpenModal ?? storeOpenModal;

  if (compareList.length === 0) return null;

  const comparedStudies = compareList
    .map((id) => INVESTIGATIONS.find((inv) => inv.id === id))
    .filter((inv): inv is (typeof INVESTIGATIONS)[0] => inv !== undefined);

  const canCompare = compareList.length >= 2;
  const remainingCount = 2 - compareList.length;
  const disabledHint =
    remainingCount === 1
      ? 'Select 1 more study to compare'
      : 'Select at least 2 studies to compare';

  return (
    <aside
      aria-label="Study Comparison Dock"
      data-testid="explorer-comparison-dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl bg-[#0B1528]/95 backdrop-blur-2xl border border-[#4CC9F0]/40 rounded-2xl p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)] ring-1 ring-[#4CC9F0]/30 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Indicator & Chips */}
        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#4CC9F0] shrink-0 font-bold">
            <Layers className="w-4 h-4 text-[#4CC9F0]" />
            <span>Compare ({comparedStudies.length}/3):</span>
          </div>

          <div className="flex items-center gap-2">
            {comparedStudies.map((study) => (
              <span
                key={study.id}
                data-testid={`compare-chip-${study.id}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-xs font-mono text-[#F8F9FA] shrink-0 shadow-sm"
              >
                <span className="font-bold text-[#D4FC02]">{study.code}</span>
                <button
                  type="button"
                  data-testid={`remove-compare-${study.id}`}
                  onClick={() => onRemove(study.id)}
                  className="p-0.5 rounded-full hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={`Remove ${study.code} from comparison`}
                  aria-label={`Remove ${study.code} from comparison`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto flex-wrap">
          {/* Clear All button */}
          <button
            type="button"
            data-testid="clear-all-compare-btn"
            onClick={onClear}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          {/* Primary Compare (N/3) Button */}
          <div className="relative group">
            <button
              type="button"
              data-testid="open-comparison-modal-btn"
              disabled={!canCompare}
              onClick={onOpenModal}
              title={canCompare ? 'Open side-by-side comparison modal' : disabledHint}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                canCompare
                  ? 'bg-[#4CC9F0] hover:bg-[#38b6dd] text-slate-950 shadow-lg shadow-[#4CC9F0]/25'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5 opacity-60'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Compare ({comparedStudies.length}/3)</span>
            </button>

            {/* Tooltip hint when disabled */}
            {!canCompare && (
              <span
                role="tooltip"
                data-testid="compare-btn-tooltip"
                className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#080C18] border border-white/15 px-2 py-1 text-[10px] text-amber-300 opacity-0 transition-opacity group-hover:opacity-100 shadow-md font-mono z-50"
              >
                {disabledHint}
              </span>
            )}
          </div>

          {/* Mission Lab shortcut */}
          <Link
            href={`/mission?compare=${compareList.join(',')}`}
            data-testid="launch-comparison-btn"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs border border-white/10 transition-colors"
            title="Open selected studies in Mission Lab"
          >
            <span className="hidden sm:inline">Mission Lab</span>
            <ArrowRight className="w-3 h-3 text-[#4CC9F0]" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
