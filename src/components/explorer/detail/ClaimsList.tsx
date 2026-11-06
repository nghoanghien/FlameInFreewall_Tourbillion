'use client';

import React, { useMemo } from 'react';
import {
  FileText,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import type { Investigation, EvidenceClaim, EvidenceBadgeType } from '@/types';
import { EVIDENCE_CLAIMS } from '@/data/evidenceClaims';

export interface ClaimsListProps {
  study: Investigation;
}

export function getProvenanceBadgeConfig(status: EvidenceBadgeType) {
  switch (status) {
    case 'Measured':
      return {
        label: 'Measured (Direct Empirical)',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-300',
        border: 'border-emerald-500/30',
      };
    case 'Modeled':
      return {
        label: 'Modeled (Validated CFD)',
        bg: 'bg-blue-500/10',
        text: 'text-blue-300',
        border: 'border-blue-500/30',
      };
    case 'Illustrative':
      return {
        label: 'Illustrative',
        bg: 'bg-amber-500/10',
        text: 'text-amber-300',
        border: 'border-amber-500/30',
      };
  }
}

export const ClaimsList: React.FC<ClaimsListProps> = ({ study }) => {
  // Direct claims for this study
  const directClaims = useMemo(() => {
    return EVIDENCE_CLAIMS.filter((c) => c.investigationId === study.id);
  }, [study.id]);

  return (
    <div data-testid="claims-list-container" className="space-y-6">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#D4FC02]" />
            <span>Traceable Peer-Reviewed Scientific Claims</span>
          </h3>
          <p className="text-xs text-slate-400">
            Validated combustion propositions with explicit academic citations, empirical provenance, and limitations.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          {directClaims.length} Peer-Reviewed {directClaims.length === 1 ? 'Claim' : 'Claims'}
        </div>
      </div>

      {/* Claims Cards */}
      {directClaims.length === 0 ? (
        <div
          data-testid="no-claims-notice"
          className="p-8 text-center rounded-2xl bg-[#111827]/70 border border-white/10 space-y-3"
        >
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#F8F9FA]">Synthesized Findings Available</h4>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Direct extracted peer-reviewed claims are cataloged in NASA PSI synthesis reports. Review the study overview tab for comprehensive findings and primary publications.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4" data-testid="claims-items-list">
          {directClaims.map((claim) => {
            const badgeConfig = getProvenanceBadgeConfig(claim.evidenceStatus);
            return (
              <div
                key={claim.id}
                data-testid={`claim-card-${claim.id}`}
                className="p-5 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-200 space-y-3.5 shadow-lg"
              >
                {/* Badges Bar: ID, Category, Provenance, Review Status */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#D4FC02]/10 border border-[#D4FC02]/30 text-[#D4FC02] font-mono text-[11px] font-bold">
                      {claim.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px] capitalize">
                      {claim.category.replace('_', ' ')}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md font-mono text-[11px] border ${badgeConfig.bg} ${badgeConfig.text} ${badgeConfig.border}`}
                    >
                      {badgeConfig.label}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{claim.reviewStatus}</span>
                  </span>
                </div>

                {/* Claim Statement */}
                <p className="text-sm text-[#F8F9FA] font-medium leading-relaxed">
                  &ldquo;{claim.claimText}&rdquo;
                </p>

                {/* Scientific Context */}
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-slate-200">Scientific Context &amp; Governing Physics:</span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    {claim.scientificContext}
                  </p>
                </div>

                {/* Limitations If Present */}
                {claim.limitation && (
                  <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/20">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                    <span className="text-[11px] leading-relaxed">
                      <strong>Boundary Limitation:</strong> {claim.limitation}
                    </span>
                  </div>
                )}

                {/* Citation & DOI */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="truncate max-w-xl">
                    <span className="text-slate-300 font-medium">{claim.authors}</span> ({claim.year})
                    {claim.sourceLocator && (
                      <span className="text-slate-500"> · {claim.sourceLocator}</span>
                    )}
                  </div>

                  {claim.doi && (
                    <a
                      href={`https://doi.org/${claim.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`doi-link-${claim.id}`}
                      className="inline-flex items-center gap-1 text-[#4CC9F0] hover:text-white transition-colors font-mono text-[11px]"
                    >
                      <span>doi:{claim.doi}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
