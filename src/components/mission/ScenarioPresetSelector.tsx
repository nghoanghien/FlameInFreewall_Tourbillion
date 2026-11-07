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
            ? 'bg-lime-50 border-2 border-lime-500 text-lime-950 shadow-xs'
            : 'bg-gray-100 hover:bg-gray-200 text-zinc-800 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Orbit className="w-3.5 h-3.5 text-lime-700" />
          <span className="text-[11px] font-bold">ISS Baseline</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-500">0.00g · 21% O₂</div>
      </button>

      <button
        type="button"
        data-testid="preset-artemis-lunar-base"
        onClick={() => onSelectPreset('artemis-lunar-base')}
        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
          isPresetActive('artemis-lunar-base')
            ? 'bg-amber-50 border-2 border-amber-500 text-amber-950 shadow-xs'
            : 'bg-gray-100 hover:bg-gray-200 text-zinc-800 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Moon className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-[11px] font-bold">Artemis Moon</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-500">0.16g · 30% O₂</div>
      </button>

      <button
        type="button"
        data-testid="preset-mars-surface-habitat"
        onClick={() => onSelectPreset('mars-surface-habitat')}
        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
          isPresetActive('mars-surface-habitat')
            ? 'bg-rose-50 border-2 border-rose-500 text-rose-950 shadow-xs'
            : 'bg-gray-100 hover:bg-gray-200 text-zinc-800 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Globe className="w-3.5 h-3.5 text-rose-600" />
          <span className="text-[11px] font-bold">Mars Colony</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-500">0.38g · 28% O₂</div>
      </button>

      <button
        type="button"
        data-testid="preset-custom-sandbox"
        onClick={() => onSelectPreset('custom-sandbox')}
        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
          isPresetActive('custom-sandbox')
            ? 'bg-blue-50 border-2 border-blue-500 text-blue-950 shadow-xs'
            : 'bg-gray-100 hover:bg-gray-200 text-zinc-800 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-bold">Custom Sandbox</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-500">User Tuned</div>
      </button>
    </div>
  );
};
