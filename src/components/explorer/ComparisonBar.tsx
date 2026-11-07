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
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl bg-white/60 backdrop-blur-sm rounded-full p-2.5 sm:p-3 border-2 border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Indicator & Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 pl-2 text-xs text-slate-900 shrink-0 font-extrabold">
            <div className="w-6 h-6 rounded-full bg-[#0B2374]/10 text-[#0B2374] flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span>Compare ({comparedStudies.length}/3):</span>
          </div>

          <div className="flex items-center gap-1.5">
            {comparedStudies.map((study) => (
              <span
                key={study.id}
                data-testid={`compare-chip-${study.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 text-xs text-slate-800 shrink-0 shadow-2xs font-bold transition-colors"
              >
                <span className="font-extrabold text-[#0B2374]">{study.code}</span>
                <button
                  type="button"
                  data-testid={`remove-compare-${study.id}`}
                  onClick={() => onRemove(study.id)}
                  className="p-0.5 rounded-full hover:bg-black/10 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
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
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto flex-wrap pr-1">
          {/* Clear All button */}
          <button
            type="button"
            data-testid="clear-all-compare-btn"
            onClick={onClear}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-black text-xs transition-all cursor-pointer ${
                canCompare
                  ? 'bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 shadow-sm shadow-[#D4FC02]/40 hover:scale-105 active:scale-95'
                  : 'bg-gray-100 text-slate-400 cursor-not-allowed border border-gray-200 opacity-70'
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
                className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-xl z-50"
              >
                {disabledHint}
              </span>
            )}
          </div>

          {/* Mission Lab shortcut */}
          <Link
            href={`/mission?compare=${compareList.join(',')}`}
            data-testid="launch-comparison-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 text-xs font-bold border border-gray-200/80 shadow-2xs transition-colors"
            title="Open selected studies in Mission Lab"
          >
            <span className="hidden sm:inline">Mission Lab</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0B2374]" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
