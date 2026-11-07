'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Box, AlertTriangle, ArrowRight, Orbit, Layers } from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import type { FuelCategory } from '@/types';

export const DomainBreakdown: React.FC = () => {
  const setFilter = useWorkspaceStore((state) => state.setFilter);
  const total = INVESTIGATIONS.length;

  const solidCount = INVESTIGATIONS.filter((i) => i.fuelType === 'solid' || i.fuelType === 'fabric').length;
  const dropletCount = INVESTIGATIONS.filter((i) => i.fuelType === 'droplet' || i.fuelType === 'liquid').length;
  const gasCount = INVESTIGATIONS.filter((i) => i.fuelType === 'gas').length;

  const cirCount = INVESTIGATIONS.filter((i) => i.hardware.startsWith('CIR')).length;
  const msgCount = INVESTIGATIONS.filter((i) => i.hardware === 'MSG' || i.hardware === 'ISS-SAFETY').length;
  const cygnusCount = INVESTIGATIONS.filter((i) => i.hardware.includes('CYGNUS') || i.hardware.includes('SAFFIRE')).length;

  const fuelDomains: Array<{ key: FuelCategory; label: string; sub: string; count: number; color: string }> = [
    { key: 'solid', label: 'Solid Polymers & Fabrics', sub: 'PMMA, SIBAL, Nomex, RT10', count: solidCount, color: '#0B2374' },
    { key: 'droplet', label: 'Liquid Droplets & Sprays', sub: 'Alkanes, Bi-component, Water Mist', count: dropletCount, color: '#4CC9F0' },
    { key: 'gas', label: 'Gaseous Flames', sub: 'Methane, Ethylene, Cool Flames', count: gasCount, color: '#D4FC02' },
  ];

  const facilities = [
    { name: 'CIR (Combustion Integrated Rack)', sub: 'FLEX, SoFIE, ACME modules in Destiny Lab', count: cirCount, color: '#0B2374' },
    { name: 'MSG (Microgravity Science Glovebox)', sub: 'BASS, SAME, SIBAL cloth, suppression tests', count: msgCount, color: '#102B82' },
    { name: 'Cygnus Autonomous Vehicle', sub: 'Saffire I–IV large-scale uncrewed tests', count: cygnusCount, color: '#D4FC02' },
  ];

  return (
    <section aria-label="Physical Science Domain Breakdown" className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A1A1A] flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#0B2374]" />
            Combustion Physics Domain Breakdown
          </h2>
        </div>
        <Link href="/explorer" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2374] hover:text-[#102B82] transition-colors self-start sm:self-auto">
          Explore in matrix view <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div data-testid="domain-breakdown" className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-4">
        {/* Card 1: Fuel Categories */}
        <motion.div
          data-testid="fuel-distribution"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-gray-200/50 rounded-[36px] p-5 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#64748B] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#0B2374]" /> Fuel Phase &amp; Material
              </span>
              <span className="text-[11px] text-[#64748B]">{total} Studies (100%)</span>
            </div>

            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex mb-4 border border-gray-200/60">
              {fuelDomains.map((fuel) => (
                <div key={fuel.key} style={{ width: `${(fuel.count / total) * 100}%`, backgroundColor: fuel.color }} className="h-full transition-all" title={`${fuel.label}: ${fuel.count} (${Math.round((fuel.count / total) * 100)}%)`} />
              ))}
            </div>

            <div className="space-y-1.5">
              {fuelDomains.map((fuel) => (
                <Link key={fuel.key} href="/explorer" onClick={() => setFilter('fuelCategory', fuel.key)} className="group flex items-center justify-between p-3 rounded-3xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fuel.color }} />
                    <div>
                      <div className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#0B2374] transition-colors">{fuel.label}</div>
                      <div className="text-[10px] text-[#64748B]">{fuel.sub}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-zinc-950">{fuel.count}</div>
                    <div className="text-[10px] text-[#64748B]">{Math.round((fuel.count / total) * 100)}%</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-[#64748B] mt-4 pt-3 border-t border-gray-100">Tip: Click any fuel category to apply filtered subset in Explorer.</p>
        </motion.div>

        {/* Card 2: Facilities Breakdown */}
        <motion.div
          data-testid="facility-distribution"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-gray-200/50 rounded-[36px] p-5 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#64748B] flex items-center gap-2">
                <Box className="w-4 h-4 text-[#0B2374]" /> Flight Hardware Platform
              </span>
              <span className="text-[11px] text-[#64748B]">{total} Studies</span>
            </div>

            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex mb-4 border border-gray-200/60">
              {facilities.map((fac) => (
                <div key={fac.name} style={{ width: `${(fac.count / total) * 100}%`, backgroundColor: fac.color }} className="h-full transition-all" title={`${fac.name}: ${fac.count} (${Math.round((fac.count / total) * 100)}%)`} />
              ))}
            </div>

            <div className="space-y-1.5">
              {facilities.map((fac) => (
                <div key={fac.name} className="flex items-center justify-between p-3 rounded-3xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fac.color }} />
                    <div>
                      <div className="text-xs font-bold text-[#1A1A1A]">{fac.name}</div>
                      <div className="text-[10px] text-[#64748B]">{fac.sub}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-zinc-950">{fac.count}</div>
                    <div className="text-[10px] text-[#64748B]">{Math.round((fac.count / total) * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-[#64748B] mt-4 pt-3 border-t border-gray-100">All 3 platforms operate in true orbital freefall on or departing ISS.</p>
        </motion.div>

        {/* Card 3: Gravity Regimes Telemetry */}
        <motion.div
          data-testid="gravity-distribution"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-gray-200/50 rounded-[36px] p-5 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#64748B] flex items-center gap-2">
                <Orbit className="w-4 h-4 text-[#0B2374]" /> Gravity Regimes (g-Level)
              </span>
              <span className="text-[11px] text-[#64748B]">0g vs 1g vs Partial-g</span>
            </div>

            <div className="space-y-1.5">
              {/* ISS Microgravity (0.00g) */}
              <div className="p-3 rounded-3xl bg-lime-50/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-lime-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-lime-500" /> ISS Microgravity (0.00g)
                  </span>
                  <span className="text-xs font-bold text-lime-800">20 Studies (100%)</span>
                </div>
                <p className="text-[11px] text-[#64748B]">Rich empirical dataset in pure diffusion regime with forced airflow.</p>
              </div>

              {/* Earth Normal (1.00g) */}
              <div className="p-3 rounded-3xl bg-blue-50/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-[#0B2374] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0B2374]" /> Terrestrial Baseline (1.00g)
                  </span>
                  <span className="text-xs font-bold text-[#0B2374]">Calibrated</span>
                </div>
                <p className="text-[11px] text-[#64748B]">NASA-STD-6001 upward flammability certification baseline with buoyant plume.</p>
              </div>

              {/* Partial Gravity Void (0 < g < 1) */}
              <div className="p-3 rounded-3xl bg-amber-50/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Partial Gravity Void (0 &lt; g &lt; 1)
                  </span>
                  <span className="text-xs font-black text-amber-700">0 Studies (VOID)</span>
                </div>
                <p className="text-[11px] text-amber-900/90 leading-tight">Moon (0.16g) &amp; Mars (0.38g) have <strong>zero physical test data</strong> in NASA PSI.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-[#64748B]">Extrapolations require caution.</span>
            <Link href="/mission" className="text-xs font-bold text-[#0B2374] hover:text-[#102B82] hover:underline flex items-center gap-1">
              Analyze Gap Matrix <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
