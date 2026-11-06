'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Database, FlaskConical, Layers, X } from 'lucide-react';
import type { AiCitation, EvidenceBadgeType } from '@/types';

export interface CitationBadgeProps {
  citation: AiCitation;
  className?: string;
}

const BADGE_STYLES: Record<EvidenceBadgeType, { bg: string; text: string; border: string; dot: string }> = {
  Measured: {
    bg: 'bg-emerald-500/15 hover:bg-emerald-500/25',
    text: 'text-emerald-300',
    border: 'border-emerald-500/40',
    dot: 'bg-emerald-400',
  },
  Modeled: {
    bg: 'bg-cyan-500/15 hover:bg-cyan-500/25',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    dot: 'bg-cyan-400',
  },
  Illustrative: {
    bg: 'bg-amber-500/15 hover:bg-amber-500/25',
    text: 'text-amber-300',
    border: 'border-amber-500/40',
    dot: 'bg-amber-400',
  },
};

export const CitationBadge: React.FC<CitationBadgeProps> = ({ citation, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover on escape key or outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const style = BADGE_STYLES[citation.badge] || BADGE_STYLES.Measured;
  const label = citation.claimId ? `[${citation.code} • ${citation.claimId}]` : `[${citation.code}]`;

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={`Citation provenance: ${citation.code} (${citation.badge})`}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-mono font-medium border transition-colors cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-[#D4FC02] ${style.bg} ${style.text} ${style.border}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
        <span>{label}</span>
      </button>

      {/* Provenance Preview Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={`Evidence details for ${citation.code}`}
          className="absolute z-50 bottom-full left-0 mb-2 w-80 max-w-[calc(100vw-2rem)] p-3 rounded-lg bg-[#0F172A]/95 border border-[#1E293B] shadow-2xl backdrop-blur-md text-left text-xs space-y-2 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 border-b border-[#1E293B] pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#F8F9FA] text-sm">{citation.code}</span>
                <span
                  className={`px-1.5 py-0.5 text-[10px] uppercase font-mono font-bold tracking-wider rounded border ${style.bg} ${style.text} ${style.border}`}
                >
                  {citation.badge}
                </span>
              </div>
              <p className="text-gray-400 text-[11px] leading-tight line-clamp-2 mt-0.5">
                {citation.title}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-gray-400 hover:text-white p-0.5 rounded hover:bg-white/10"
              aria-label="Close citation details"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Claim Evidence Text */}
          {citation.claimText && (
            <div className="bg-[#0B1220]/70 p-2 rounded border border-[#1E293B]/60 text-gray-200 text-[11px] leading-relaxed">
              <span className="text-[#D4FC02] font-mono text-[10px] block mb-0.5">
                VERIFIED PSI CLAIM:
              </span>
              &ldquo;{citation.claimText}&rdquo;
            </div>
          )}

          {/* Metadata & Facility */}
          <div className="space-y-1 text-[11px] text-gray-400 font-mono">
            {citation.facility && (
              <div className="flex items-center gap-1.5">
                <FlaskConical className="w-3 h-3 text-[#D4FC02] shrink-0" />
                <span className="truncate">{citation.facility}</span>
              </div>
            )}
            {citation.claimId && (
              <div className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>Claim ID: {citation.claimId}</span>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="pt-1.5 border-t border-[#1E293B] flex items-center justify-between gap-2">
            <Link
              href={`/explorer/${citation.investigationId}`}
              className="inline-flex items-center gap-1 text-[#D4FC02] hover:underline font-mono text-[11px] font-medium"
            >
              <Database className="w-3 h-3" />
              <span>Inspect Investigation</span>
            </Link>

            {citation.doi && (
              <a
                href={`https://doi.org/${citation.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-[11px]"
              >
                <span>DOI</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
