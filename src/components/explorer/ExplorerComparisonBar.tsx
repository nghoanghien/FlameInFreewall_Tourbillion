'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';

export interface ExplorerComparisonBarProps {
  compareList: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const ExplorerComparisonBar: React.FC<ExplorerComparisonBarProps> = ({
  compareList,
  onRemove,
  onClear,
}) => {
  if (compareList.length === 0) return null;

  const comparedStudies = compareList
    .map((id) => INVESTIGATIONS.find((inv) => inv.id === id))
    .filter((inv): inv is (typeof INVESTIGATIONS)[0] => inv !== undefined);

  return (
    <aside
      aria-label="Study Comparison Dock"
      data-testid="explorer-comparison-dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-3xl bg-[#0B1528]/95 backdrop-blur-2xl border border-[#4CC9F0]/40 rounded-2xl p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)] ring-1 ring-[#4CC9F0]/30 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Indicator & Chips */}
        <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
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
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            data-testid="clear-all-compare-btn"
            onClick={onClear}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <Link
            href={`/mission?compare=${compareList.join(',')}`}
            data-testid="launch-comparison-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4CC9F0] hover:bg-[#38b6dd] text-slate-950 font-bold text-xs shadow-lg shadow-[#4CC9F0]/25 transition-all cursor-pointer"
          >
            <span>Analyze in Mission Lab</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
