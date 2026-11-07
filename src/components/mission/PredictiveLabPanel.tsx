'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Flame,
  ArrowLeft,
  Sparkles,
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
      className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-6"
    >
      {/* Header & Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-black text-zinc-950 tracking-tight">
              Predictive Lab · Guarded Simulation
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-bold">
              Could Have · Diagram D14
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Scientific predictive solver with strict empirical validation boundaries and physical guardrails.
          </p>
        </div>

        {/* Model Status Badge */}
        <div
          data-testid="model-status-badge"
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold ${
            audit.isLocked
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-lime-50 text-lime-900 border-lime-300'
          }`}
        >
          {audit.isLocked ? (
            <>
              <Lock className="w-3.5 h-3.5 text-rose-600" />
              <span>MODEL OFFLINE / DOMAIN OUT OF BOUNDS</span>
            </>
          ) : (
            <>
              <Unlock className="w-3.5 h-3.5 text-lime-700" />
              <span>MODEL ONLINE / VALIDATED DOMAIN</span>
            </>
          )}
        </div>
      </div>

      {/* Model Scope & Version Meta */}
      <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium">
        <span className="text-zinc-500">
          Model Version: <strong className="text-zinc-900">{audit.modelVersion}</strong>
        </span>
        <span className="text-zinc-500">
          Applicability: <span className="text-zinc-700">{audit.modelApplicabilityDomain}</span>
        </span>
      </div>

      {/* 3 Readiness Requirements Checklist (Diagram D14) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-zinc-700 flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#0B2374]" />
          Model Readiness Audit (3 Prerequisites)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {audit.requirements.map((req) => (
            <motion.div
              key={req.id}
              data-testid={`readiness-req-${req.code.toLowerCase()}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                req.isMet
                  ? 'bg-lime-50/50 border-lime-200'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-zinc-500">
                  {req.code}
                </span>
                {req.isMet ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-lime-900 bg-lime-50 px-2 py-0.5 rounded-full border border-lime-300">
                    <CheckCircle2 className="w-3 h-3 text-lime-700" /> VERIFIED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    <XCircle className="w-3 h-3" /> BLOCKED
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-zinc-900 mb-1">{req.title}</h4>
              <p className="text-[11px] text-zinc-500 mb-2 leading-relaxed">
                {req.description}
              </p>
              <div
                className={`text-[10px] p-2 rounded-xl border leading-relaxed ${
                  req.isMet
                    ? 'bg-white border-lime-200 text-lime-900'
                    : 'bg-white border-rose-200 text-rose-800'
                }`}
              >
                {req.auditDetail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Execution Area */}
      {audit.isLocked ? (
        /* Locked State: Detailed Explanation & Inspect Evidence CTA */
        <div
          data-testid="predictive-lab-locked-state"
          className="p-5 sm:p-6 rounded-2xl bg-rose-50 border border-rose-200 space-y-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-rose-900 uppercase tracking-wide">
                Guarded Execution Locked — Missing NASA Empirical Baseline
              </h3>
              <p className="text-xs text-rose-800 leading-relaxed font-medium">
                {audit.lockReason}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-rose-200 text-xs text-zinc-700 space-y-1.5">
            <strong className="text-zinc-900">Why is guarded execution locked?</strong>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              NASA flight safety standards prohibit running uncalibrated semi-empirical or numerical models without corresponding run-level test telemetry. Direct empirical evidence from analogous flight programs must be inspected before formulating new predictive equations.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {onSwitchToEvidence && (
              <button
                type="button"
                data-testid="inspect-evidence-cta-btn"
                onClick={onSwitchToEvidence}
                className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-[#D4FC02] hover:bg-[#c3e802] text-zinc-950 font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-zinc-950" />
                <span>Inspect available NASA evidence</span>
              </button>
            )}
            <span className="text-[11px] text-zinc-500">
              Switch back to Evidence Analysis to review nearest experimental investigations.
            </span>
          </div>
        </div>
      ) : (
        /* In-Bounds Validated Execution Output */
        <div
          data-testid="predictive-lab-results"
          className="p-5 sm:p-6 rounded-2xl bg-lime-50/50 border border-lime-200 space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-lime-100 text-lime-900 flex items-center justify-center border border-lime-200">
                <Flame className="w-5 h-5 text-lime-700" />
              </div>
              <div>
                <h3 className="text-sm font-black text-zinc-900">
                  Empirical Flame Propagation Prediction
                </h3>
                <span className="text-[10px] text-lime-800 font-bold">
                  {audit.regime}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-zinc-500 font-medium">Confidence:</span>{' '}
              <strong className="text-lime-900">{audit.confidenceIntervalPct}% CI</strong>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Predicted Spread Rate */}
            <motion.div
              data-testid="predicted-spread-rate"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-2xs cursor-pointer"
            >
              <div className="text-[10px] uppercase font-bold text-zinc-500">
                Predicted Spread Rate
              </div>
              <div className="text-2xl font-black text-[#0B2374]">
                {audit.predictedSpreadRateMmS?.toFixed(2)}{' '}
                <span className="text-xs text-zinc-500 font-sans">mm/s</span>
              </div>
              <p className="text-[10px] text-zinc-400">
                Steady-state opposed/forced flow propagation velocity
              </p>
            </motion.div>

            {/* Quench Limit */}
            <motion.div
              data-testid="predicted-quench-limit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-2xs cursor-pointer"
            >
              <div className="text-[10px] uppercase font-bold text-zinc-500">
                Quenching Extinction Limit
              </div>
              <div className="text-2xl font-black text-[#0B2374]">
                {audit.quenchLimitO2Pct.toFixed(1)}{' '}
                <span className="text-xs text-zinc-500 font-sans">% O₂ (LOI)</span>
              </div>
              <p className="text-[10px] text-zinc-400">{audit.quenchDescription}</p>
            </motion.div>

            {/* Uncertainty Bounds */}
            <motion.div
              data-testid="predicted-uncertainty-bounds"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-2xs cursor-pointer"
            >
              <div className="text-[10px] uppercase font-bold text-zinc-500">
                Uncertainty Bounds (95% CI)
              </div>
              <div className="text-xl font-black text-lime-800">
                [{audit.uncertaintyBoundMmS?.[0]} – {audit.uncertaintyBoundMmS?.[1]}]{' '}
                <span className="text-xs text-zinc-500 font-sans">mm/s</span>
              </div>
              <p className="text-[10px] text-zinc-400">
                Standard error bounds based on 12 verified test runs
              </p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Mandatory NASA Safety Disclaimer */}
      <div
        data-testid="predictive-safety-disclaimer"
        className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3"
      >
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          <strong className="text-amber-800">MANDATORY PROTOCOL:</strong> {audit.disclaimer}
        </p>
      </div>
    </div>
  );
};
