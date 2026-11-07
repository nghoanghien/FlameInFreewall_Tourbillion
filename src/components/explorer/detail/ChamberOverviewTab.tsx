'use client';

import React from 'react';
import {
  Flame,
  Gauge,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Globe,
  Rocket,
  ExternalLink,
} from 'lucide-react';
import type { Investigation } from '@/types';

export interface ChamberOverviewTabProps {
  study: Investigation;
}

export const ChamberOverviewTab: React.FC<ChamberOverviewTabProps> = ({ study }) => {
  return (
    <div data-testid="chamber-overview-tab" className="space-y-6">
      {/* Research Purpose & Objectives Card */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Research Purpose &amp; Scientific Objectives</span>
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          {study.researchPurpose}
        </p>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono uppercase text-zinc-500 font-bold">Key Objectives:</span>
          <ul className="space-y-2">
            {study.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-[#0B2374] shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid: Chamber Envelopes & Fuel Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Chamber Variables */}
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#0B2374]" />
            <span>Chamber Atmospheric Envelope</span>
          </h3>

          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
            <div>
              <div className="text-[10px] text-zinc-500 font-mono">Oxygen Range</div>
              <div className="text-xs font-bold text-zinc-900 mt-0.5">
                {study.oxygenRange[0]}–{study.oxygenRange[1]}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-mono">Pressure</div>
              <div className="text-xs font-bold text-zinc-900 mt-0.5">
                {study.pressureRangePsi[0]}–{study.pressureRangePsi[1]} psi
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-mono">Flow Velocity</div>
              <div className="text-xs font-bold text-zinc-900 mt-0.5">
                {study.flowRangeCmPerSec[0]}–{study.flowRangeCmPerSec[1]} cm/s
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="font-semibold text-zinc-800">Held Constant:</span>
              <ul className="list-disc list-inside text-zinc-600 mt-1 space-y-1 text-[11px]">
                {study.variables.heldConstant.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="pt-2">
              <span className="font-semibold text-zinc-800">Varied Across Runs:</span>
              <ul className="list-disc list-inside text-zinc-600 mt-1 space-y-1 text-[11px]">
                {study.variables.variedAcrossRuns.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Fuel & Sensor Details */}
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Fuel Specifications &amp; Sensors</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-semibold text-zinc-800">Materials Tested:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {study.fuelDetails.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-zinc-700 text-[11px]"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-zinc-800">Sample Geometry:</span>
              <p className="text-zinc-600 mt-0.5 text-[11px]">
                {study.fuelDetails.geometry}
              </p>
            </div>

            <div>
              <span className="font-semibold text-zinc-800">Diagnostic Sensors:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {study.sensors.map((sensor, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[#0B2374] font-mono text-[10px]"
                  >
                    {sensor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Findings: Spaceflight Relevance & Earth Applications */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
          <Rocket className="w-4 h-4 text-rose-500" />
          <span>Spaceflight Relevance &amp; Earth Applications</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
            <span className="font-bold text-[#0B2374] flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5" />
              <span>Spaceflight Fire Safety Impact</span>
            </span>
            <p className="text-zinc-600 leading-relaxed text-[11px]">
              {study.keyFindings.spaceflightRelevance}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
            <span className="font-bold text-emerald-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Terrestrial Earth Applications</span>
            </span>
            <ul className="list-disc list-inside text-zinc-600 space-y-1 text-[11px]">
              {study.keyFindings.earthApplications.map((app, i) => (
                <li key={i}>{app}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Primary Academic Citations */}
      {study.sources.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Primary Academic Citations</span>
          </h3>
          <div className="space-y-2">
            {study.sources.map((cit, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-zinc-900">{cit.title}</div>
                  <div className="text-zinc-500 text-[11px]">
                    {cit.authors} ({cit.year}){cit.journalOrConference && ` · ${cit.journalOrConference}`}
                  </div>
                </div>
                {cit.doi && (
                  <a
                    href={`https://doi.org/${cit.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#0B2374] hover:underline font-mono text-[11px] shrink-0 font-medium"
                  >
                    <span>DOI</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
