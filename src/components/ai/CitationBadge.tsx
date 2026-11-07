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
    bg: 'bg-lime-50 hover:bg-lime-100',
    text: 'text-lime-900',
    border: 'border-lime-300',
    dot: 'bg-lime-500',
  },
  Modeled: {
    bg: 'bg-cyan-50 hover:bg-cyan-100',
    text: 'text-cyan-900',
    border: 'border-cyan-300',
    dot: 'bg-cyan-500',
  },
  Illustrative: {
    bg: 'bg-amber-50 hover:bg-amber-100',
    text: 'text-amber-900',
    border: 'border-amber-300',
    dot: 'bg-amber-500',
  },
};

export const CitationBadge: React.FC<CitationBadgeProps> = ({ citation, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono font-bold border transition-colors cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-[#0B2374] bg-lime-50 border-lime-300 text-lime-950 hover:bg-lime-100"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
        <span>{label}</span>
      </button>

      {/* Provenance Preview Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={`Evidence details for ${citation.code}`}
          className="absolute z-50 bottom-full left-0 mb-2 w-80 max-w-[calc(100vw-2rem)] p-3 rounded-2xl bg-white/95 border border-gray-200 shadow-2xl backdrop-blur-xl text-left text-xs space-y-2 animate-in fade-in zoom-in-95 duration-150 text-zinc-900"
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 border-b border-gray-200 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 text-sm">{citation.code}</span>
                <span
                  className={`px-1.5 py-0.5 text-[10px] uppercase font-mono font-bold tracking-wider rounded-full border ${style.bg} ${style.text} ${style.border}`}
                >
                  {citation.badge}
                </span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-tight line-clamp-2 mt-0.5 font-medium">
                {citation.title}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-zinc-400 hover:text-zinc-700 p-0.5 rounded-md hover:bg-gray-100 cursor-pointer"
              aria-label="Close citation details"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Claim Evidence Text */}
          {citation.claimText && (
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-zinc-800 text-[11px] leading-relaxed">
              <span className="text-[#0B2374] font-mono text-[10px] font-bold block mb-0.5">
                VERIFIED PSI CLAIM:
              </span>
              &ldquo;{citation.claimText}&rdquo;
            </div>
          )}

          {/* Metadata & Facility */}
          <div className="space-y-1 text-[11px] text-zinc-500 font-mono">
            {citation.facility && (
              <div className="flex items-center gap-1.5">
                <FlaskConical className="w-3 h-3 text-[#0B2374] shrink-0" />
                <span className="truncate">{citation.facility}</span>
              </div>
            )}
            {citation.claimId && (
              <div className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cyan-600 shrink-0" />
                <span>Claim ID: {citation.claimId}</span>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="pt-1.5 border-t border-gray-200 flex items-center justify-between gap-2">
            <Link
              href={`/explorer/${citation.investigationId}`}
              className="inline-flex items-center gap-1 text-[#0B2374] hover:underline font-mono text-[11px] font-bold"
            >
              <Database className="w-3 h-3" />
              <span>Inspect Investigation</span>
            </Link>

            {citation.doi && (
              <a
                href={`https://doi.org/${citation.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 text-[11px] font-medium"
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
