'use client';

import React from 'react';
import {
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Flame,
  Activity,
  ArrowLeft,
  Sparkles,
  Info,
  Scale,
} from 'lucide-react';
import { evaluatePredictiveLab } from '@/lib/predictiveLabEngine';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';

export interface PredictiveLabPanelProps {
  onSwitchToEvidence?: () => void;
}

export const PredictiveLabPanel: React.FC<PredictiveLabPanelProps> = ({
  onSwitchToEvidence,
}) => {
  const activeScenario = useWorkspaceStore((state) => state.activeScenario);
  const audit = evaluatePredictiveLab(activeScenario);

  return (
    <div
      data-testid="predictive-lab-panel"
      className="p-5 sm:p-6 rounded-3xl bg-[#0d1322]/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6"
    >
      {/* Header & Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#A78BFA]" />
            <h2 className="text-lg font-black text-[#F8F9FA] tracking-tight">
              Predictive Lab · Guarded Simulation
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
              Could Have · Diagram D14
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Scientific predictive solver with strict empirical validation boundaries and physical guardrails.
          </p>
        </div>

        {/* Model Status Badge */}
        <div
          data-testid="model-status-badge"
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold ${
            audit.isLocked
              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
          }`}
        >
          {audit.isLocked ? (
            <>
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>MODEL OFFLINE / DOMAIN OUT OF BOUNDS</span>
            </>
          ) : (
            <>
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODEL ONLINE / VALIDATED DOMAIN</span>
            </>
          )}
        </div>
      </div>

      {/* Model Scope & Version Meta */}
      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
        <span className="text-slate-400">
          Model Version: <strong className="text-white">{audit.modelVersion}</strong>
        </span>
        <span className="text-slate-400">
          Applicability: <span className="text-slate-300">{audit.modelApplicabilityDomain}</span>
        </span>
      </div>

      {/* 3 Readiness Requirements Checklist (Diagram D14) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#D4FC02]" />
          Model Readiness Audit (3 Prerequisites)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {audit.requirements.map((req) => (
            <div
              key={req.id}
              data-testid={`readiness-req-${req.code.toLowerCase()}`}
              className={`p-4 rounded-2xl border transition-all ${
                req.isMet
                  ? 'bg-emerald-500/[0.04] border-emerald-500/25'
                  : 'bg-rose-500/[0.04] border-rose-500/25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {req.code}
                </span>
                {req.isMet ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded-full border border-rose-500/30">
                    <XCircle className="w-3 h-3" /> BLOCKED
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-white mb-1">{req.title}</h4>
              <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                {req.description}
              </p>
              <div
                className={`text-[10px] font-mono p-2 rounded-xl border leading-relaxed ${
                  req.isMet
                    ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
                    : 'bg-rose-950/20 border-rose-500/20 text-rose-200'
                }`}
              >
                {req.auditDetail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Execution Area */}
      {audit.isLocked ? (
        /* Locked State: Detailed Explanation & Inspect Evidence CTA */
        <div
          data-testid="predictive-lab-locked-state"
          className="p-5 sm:p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 border border-rose-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-rose-200 uppercase tracking-wide">
                Guarded Execution Locked — Missing NASA Empirical Baseline
              </h3>
              <p className="text-xs text-rose-200/90 leading-relaxed font-mono">
                {audit.lockReason}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 space-y-1.5">
            <strong className="text-white">Why is guarded execution locked?</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              NASA flight safety standards prohibit running uncalibrated semi-empirical or numerical models without corresponding run-level test telemetry. Direct empirical evidence from analogous flight programs must be inspected before formulating new predictive equations.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {onSwitchToEvidence && (
              <button
                type="button"
                data-testid="inspect-evidence-cta-btn"
                onClick={onSwitchToEvidence}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 text-[#D4FC02]" />
                <span>Inspect available NASA evidence</span>
              </button>
            )}
            <span className="text-[11px] text-slate-400">
              Switch back to Evidence Analysis to review nearest experimental investigations.
            </span>
          </div>
        </div>
      ) : (
        /* In-Bounds Validated Execution Output */
        <div
          data-testid="predictive-lab-results"
          className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
                <Flame className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">
                  Empirical Flame Propagation Prediction
                </h3>
                <span className="text-[10px] font-mono text-emerald-300">
                  {audit.regime}
                </span>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-xs text-slate-400">Confidence:</span>{' '}
              <strong className="text-emerald-300">{audit.confidenceIntervalPct}% CI</strong>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Predicted Spread Rate */}
            <div
              data-testid="predicted-spread-rate"
              className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Predicted Spread Rate
              </div>
              <div className="text-2xl font-black font-mono text-[#D4FC02]">
                {audit.predictedSpreadRateMmS?.toFixed(2)}{' '}
                <span className="text-xs text-slate-300 font-sans">mm/s</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Steady-state opposed/forced flow propagation velocity
              </p>
            </div>

            {/* Quench Limit */}
            <div
              data-testid="predicted-quench-limit"
              className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Quenching Extinction Limit
              </div>
              <div className="text-2xl font-black font-mono text-[#4CC9F0]">
                {audit.quenchLimitO2Pct.toFixed(1)}{' '}
                <span className="text-xs text-slate-300 font-sans">% O₂ (LOI)</span>
              </div>
              <p className="text-[10px] text-slate-400">{audit.quenchDescription}</p>
            </div>

            {/* Uncertainty Bounds */}
            <div
              data-testid="predicted-uncertainty-bounds"
              className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Uncertainty Bounds (95% CI)
              </div>
              <div className="text-xl font-black font-mono text-emerald-300">
                [{audit.uncertaintyBoundMmS?.[0]} – {audit.uncertaintyBoundMmS?.[1]}]{' '}
                <span className="text-xs text-slate-300 font-sans">mm/s</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Standard error bounds based on 12 verified test runs
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory NASA Safety Disclaimer */}
      <div
        data-testid="predictive-safety-disclaimer"
        className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3"
      >
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400 leading-relaxed font-mono">
          <strong className="text-amber-300">MANDATORY PROTOCOL:</strong> {audit.disclaimer}
        </p>
      </div>
    </div>
  );
};
