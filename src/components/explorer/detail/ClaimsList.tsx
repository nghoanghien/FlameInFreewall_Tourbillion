'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import type { Investigation, EvidenceBadgeType } from '@/types';
import { EVIDENCE_CLAIMS } from '@/data/evidenceClaims';

export interface ClaimsListProps {
  study: Investigation;
}

export function getProvenanceBadgeConfig(status: EvidenceBadgeType) {
  switch (status) {
    case 'Measured':
      return {
        label: 'Measured (Direct Empirical)',
        bg: 'bg-lime-50',
        text: 'text-lime-900',
        border: 'border-lime-200',
      };
    case 'Modeled':
      return {
        label: 'Modeled (Validated CFD)',
        bg: 'bg-blue-50',
        text: 'text-[#0B2374]',
        border: 'border-blue-200',
      };
    case 'Illustrative':
      return {
        label: 'Illustrative',
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
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
          <h3 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Traceable Peer-Reviewed Scientific Claims</span>
          </h3>
          <p className="text-xs text-zinc-500">
            Validated combustion propositions with explicit academic citations, empirical provenance, and limitations.
          </p>
        </div>
        <div className="text-xs font-mono text-zinc-500">
          {directClaims.length} Peer-Reviewed {directClaims.length === 1 ? 'Claim' : 'Claims'}
        </div>
      </div>

      {/* Claims Cards */}
      {directClaims.length === 0 ? (
        <div
          data-testid="no-claims-notice"
          className="p-8 text-center rounded-3xl bg-white border border-gray-100 space-y-3 shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#0B2374] mx-auto flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-950">Synthesized Findings Available</h4>
            <p className="text-xs text-zinc-500 max-w-lg mx-auto">
              Direct extracted peer-reviewed claims are cataloged in NASA PSI synthesis reports. Review the study overview tab for comprehensive findings and primary publications.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4" data-testid="claims-items-list">
          {directClaims.map((claim) => {
            const badgeConfig = getProvenanceBadgeConfig(claim.evidenceStatus);
            return (
              <motion.div
                key={claim.id}
                data-testid={`claim-card-${claim.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="p-5 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-200 space-y-3.5 cursor-pointer"
              >
                {/* Badges Bar: ID, Category, Provenance, Review Status */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-lime-50 border border-lime-200 text-lime-900 font-mono text-[11px] font-extrabold shadow-2xs">
                      {claim.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-zinc-700 font-mono text-[11px] font-extrabold shadow-2xs capitalize">
                      {claim.category.replace('_', ' ')}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-extrabold shadow-2xs border ${badgeConfig.bg} ${badgeConfig.text} ${badgeConfig.border}`}
                    >
                      {badgeConfig.label}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-lime-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime-700" />
                    <span>{claim.reviewStatus}</span>
                  </span>
                </div>

                {/* Claim Statement */}
                <p className="text-sm text-[#1A1A1A] font-semibold leading-relaxed">
                  &ldquo;{claim.claimText}&rdquo;
                </p>

                {/* Scientific Context */}
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-zinc-700 space-y-1">
                  <span className="font-semibold text-zinc-900">Scientific Context &amp; Governing Physics:</span>
                  <p className="text-zinc-600 leading-relaxed text-[11px]">
                    {claim.scientificContext}
                  </p>
                </div>

                {/* Limitations If Present */}
                {claim.limitation && (
                  <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                    <span className="text-[11px] leading-relaxed">
                      <strong>Boundary Limitation:</strong> {claim.limitation}
                    </span>
                  </div>
                )}

                {/* Citation & DOI */}
                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                  <div className="truncate max-w-xl">
                    <span className="text-zinc-700 font-medium">{claim.authors}</span> ({claim.year})
                    {claim.sourceLocator && (
                      <span className="text-zinc-400"> · {claim.sourceLocator}</span>
                    )}
                  </div>

                  {claim.doi && (
                    <a
                      href={`https://doi.org/${claim.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`doi-link-${claim.id}`}
                      className="inline-flex items-center gap-1 text-[#0B2374] hover:underline transition-colors font-mono text-[11px] font-medium"
                    >
                      <span>doi:{claim.doi}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
