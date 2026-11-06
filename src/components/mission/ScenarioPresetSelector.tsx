'use client';

import React from 'react';
import { Orbit, Moon, Globe, Sparkles } from 'lucide-react';

export interface ScenarioPresetSelectorProps {
  activePresetId?: string;
  onSelectPreset: (presetId: string) => void;
}

export const ScenarioPresetSelector: React.FC<ScenarioPresetSelectorProps> = ({
  activePresetId,
  onSelectPreset,
}) => {
  const isPresetActive = (id: string) => activePresetId === id;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
      <button
        type="button"
        data-testid="preset-iss-baseline"
        onClick={() => onSelectPreset('iss-baseline')}
        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
          isPresetActive('iss-baseline')
            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Orbit className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-bold">ISS Baseline</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">0.00g · 21% O₂</div>
      </button>

      <button
        type="button"
        data-testid="preset-artemis-lunar-base"
        onClick={() => onSelectPreset('artemis-lunar-base')}
        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
          isPresetActive('artemis-lunar-base')
            ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Moon className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-bold">Artemis Moon</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">0.16g · 30% O₂</div>
      </button>

      <button
        type="button"
        data-testid="preset-mars-surface-habitat"
        onClick={() => onSelectPreset('mars-surface-habitat')}
        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
          isPresetActive('mars-surface-habitat')
            ? 'bg-rose-500/20 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]'
            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Globe className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-[11px] font-bold">Mars Colony</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">0.38g · 28% O₂</div>
      </button>

      <button
        type="button"
        data-testid="preset-custom-sandbox"
        onClick={() => onSelectPreset('custom-sandbox')}
        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
          isPresetActive('custom-sandbox')
            ? 'bg-[#4CC9F0]/20 border-[#4CC9F0] text-white shadow-[0_0_15px_rgba(76,201,240,0.2)]'
            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#4CC9F0]" />
          <span className="text-[11px] font-bold">Custom Sandbox</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">User Tuned</div>
      </button>
    </div>
  );
};
