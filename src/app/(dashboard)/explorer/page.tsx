'use client';

import React, { useState, useMemo } from 'react';
import { Compass, Flame, AlertCircle, RotateCcw } from 'lucide-react';
import { INVESTIGATIONS } from '@/data/investigations';
import { TEST_RUNS } from '@/data/testRuns';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import {
  ExplorerFiltersBar,
  type FuelFilterValue,
  type FacilityFilterValue,
  type GravityFilterValue,
  type ExplorerSortOption,
  type ViewMode,
} from '@/components/explorer/ExplorerFiltersBar';
import { InvestigationCard } from '@/components/explorer/InvestigationCard';
import { InvestigationTable } from '@/components/explorer/InvestigationTable';
import { ComparisonBar } from '@/components/explorer/ComparisonBar';
import { ComparisonModal } from '@/components/explorer/ComparisonModal';

export default function ExplorerPage() {
  const compareList = useWorkspaceStore((state) => state.compareList);
  const toggleCompare = useWorkspaceStore((state) => state.toggleCompare);
  const removeFromCompare = useWorkspaceStore((state) => state.removeFromCompare);
  const clearCompare = useWorkspaceStore((state) => state.clearCompare);
  const isComparisonModalOpen = useWorkspaceStore((state) => state.isComparisonModalOpen);
  const setComparisonModalOpen = useWorkspaceStore((state) => state.setComparisonModalOpen);

  // Filter and view states
  const [searchQuery, setSearchQuery] = useState('');
  const [fuelFilter, setFuelFilter] = useState<FuelFilterValue>('all');
  const [facilityFilter, setFacilityFilter] = useState<FacilityFilterValue>('all');
  const [gravityFilter, setGravityFilter] = useState<GravityFilterValue>('all');
  const [sortBy, setSortBy] = useState<ExplorerSortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Compute test runs per study
  const runsByInvestigationId = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const run of TEST_RUNS) {
      counts[run.investigationId] = (counts[run.investigationId] || 0) + 1;
    }
    return counts;
  }, []);

  // Filter and sort investigations
  const filteredInvestigations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return INVESTIGATIONS.filter((inv) => {
      // 1. Keyword search
      if (q) {
        const matchesCode = inv.code.toLowerCase().includes(q);
        const matchesTitle = inv.title.toLowerCase().includes(q);
        const matchesSubtitle = inv.subtitle.toLowerCase().includes(q);
        const matchesPI = inv.primaryInvestigator.toLowerCase().includes(q);
        const matchesInstitution = inv.institution?.toLowerCase().includes(q) ?? false;
        const matchesMaterials = inv.fuelDetails.materials.some((m) =>
          m.toLowerCase().includes(q)
        );
        const matchesTags = inv.tags.some((t) => t.toLowerCase().includes(q));

        if (
          !matchesCode &&
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesPI &&
          !matchesInstitution &&
          !matchesMaterials &&
          !matchesTags
        ) {
          return false;
        }
      }

      // 2. Fuel filter
      if (fuelFilter !== 'all') {
        if (fuelFilter === 'solid' && inv.fuelType !== 'solid' && inv.fuelType !== 'fabric') {
          return false;
        }
        if (fuelFilter === 'droplet' && inv.fuelType !== 'droplet' && inv.fuelType !== 'liquid') {
          return false;
        }
        if (fuelFilter === 'gas' && inv.fuelType !== 'gas') {
          return false;
        }
      }

      // 3. Facility filter
      if (facilityFilter !== 'all') {
        if (facilityFilter === 'CIR' && !inv.hardware.includes('CIR')) {
          return false;
        }
        if (facilityFilter === 'MSG' && !inv.hardware.includes('MSG')) {
          return false;
        }
        if (
          facilityFilter === 'Cygnus' &&
          !inv.hardware.toLowerCase().includes('cygnus') &&
          !inv.platform.toLowerCase().includes('cygnus') &&
          !inv.code.toLowerCase().includes('saffire')
        ) {
          return false;
        }
      }

      // 4. Gravity filter
      if (gravityFilter !== 'all') {
        if (gravityFilter === '0g' && inv.gravityLevelG !== 0) {
          return false;
        }
        if (gravityFilter === '1g' && inv.gravityLevelG !== 1) {
          return false;
        }
        if (gravityFilter === 'partial' && (inv.gravityLevelG <= 0 || inv.gravityLevelG >= 1)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'code-asc') {
        return a.code.localeCompare(b.code);
      }
      if (sortBy === 'runs-desc') {
        const countA = runsByInvestigationId[a.id] ?? a.dataAvailability.runCount ?? 0;
        const countB = runsByInvestigationId[b.id] ?? b.dataAvailability.runCount ?? 0;
        return countB - countA;
      }
      if (sortBy === 'confidence') {
        if (a.confidence !== b.confidence) {
          return a.confidence === 'A' ? -1 : 1;
        }
        return a.code.localeCompare(b.code);
      }
      // 'newest' sort
      const extractYear = (yr: string) => {
        const matches = yr.match(/\d{4}/g);
        return matches ? Math.max(...matches.map(Number)) : 0;
      };
      return extractYear(b.yearRange) - extractYear(a.yearRange);
    });
  }, [searchQuery, fuelFilter, facilityFilter, gravityFilter, sortBy, runsByInvestigationId]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFuelFilter('all');
    setFacilityFilter('all');
    setGravityFilter('all');
    setSortBy('newest');
  };

  return (
    <div
      data-testid="explorer-catalog-page"
      className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 py-2 pb-24"
    >
      {/* Top Header Banner */}
      <section
        aria-label="Explorer Header"
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0B2374]/80 via-[#0B1528]/95 to-[#080C18] border border-white/10 shadow-2xl backdrop-blur-xl"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#4CC9F0]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4CC9F0]/15 border border-[#4CC9F0]/30 text-[#4CC9F0] text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>NASA Physical Science Informatics (PSI) Database</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F8F9FA] tracking-tight">
            Experiment Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Search, filter, and inspect all 20 spaceflight combustion investigations conducted aboard the International Space Station and automated Cygnus spacecraft.
          </p>
        </div>
      </section>

      {/* Filter Toolbar */}
      <ExplorerFiltersBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fuelFilter={fuelFilter}
        onFuelFilterChange={setFuelFilter}
        facilityFilter={facilityFilter}
        onFacilityFilterChange={setFacilityFilter}
        gravityFilter={gravityFilter}
        onGravityFilterChange={setGravityFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={INVESTIGATIONS.length}
        filteredCount={filteredInvestigations.length}
        onResetFilters={handleResetFilters}
      />

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 font-mono px-1">
        <span data-testid="explorer-summary-count">
          Showing <span className="font-bold text-[#F8F9FA]">{filteredInvestigations.length}</span> of {INVESTIGATIONS.length} NASA PSI Studies
        </span>
        <span className="text-slate-500 hidden sm:inline">
          Click any study to view chamber specs, test runs &amp; sensor telemetry
        </span>
      </div>

      {/* Empty State */}
      {filteredInvestigations.length === 0 ? (
        <div
          data-testid="explorer-empty-state"
          className="w-full p-12 text-center rounded-3xl bg-[#111827]/60 border border-dashed border-white/15 space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#F8F9FA]">No investigations match your filters</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any NASA PSI studies matching your active search keywords or filter criteria.
            </p>
          </div>
          <button
            type="button"
            data-testid="empty-reset-btn"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4CC9F0] hover:bg-[#38b6dd] text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div
          data-testid="explorer-grid-view"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredInvestigations.map((study) => (
            <InvestigationCard
              key={study.id}
              investigation={study}
              isComparing={compareList.includes(study.id)}
              onToggleCompare={toggleCompare}
              testRunsCount={runsByInvestigationId[study.id]}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <InvestigationTable
          investigations={filteredInvestigations}
          compareList={compareList}
          onToggleCompare={toggleCompare}
          runsByInvestigationId={runsByInvestigationId}
        />
      )}

      {/* Floating Comparison Dock */}
      <ComparisonBar
        compareList={compareList}
        onRemove={removeFromCompare}
        onClear={clearCompare}
        onOpenModal={() => setComparisonModalOpen(true)}
      />

      {/* Multi-Study Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        compareList={compareList}
        onRemove={removeFromCompare}
      />
    </div>
  );
}
