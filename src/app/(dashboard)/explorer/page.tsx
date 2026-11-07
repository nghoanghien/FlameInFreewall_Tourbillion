'use client';

import React, { useState, useMemo } from 'react';
import { Compass, AlertCircle, RotateCcw } from 'lucide-react';
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
      {/* Top Header - Compact Plain Background */}
      <header
        aria-label="Explorer Header"
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-1"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D4FC02]/20 border border-[#D4FC02]/60 text-zinc-950 text-[10px] font-mono font-bold">
            <Compass className="w-3 h-3 text-[#0B2374]" />
            <span>NASA Physical Science Informatics (PSI) Database</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
            Experiment Explorer
          </h1>
          <p className="text-xs text-[#64748B]">
            Search, filter, and inspect all 20 spaceflight combustion investigations conducted aboard ISS and Cygnus spacecraft.
          </p>
        </div>
      </header>

      {/* Sticky Filter Toolbar with Eatzy Backdrop Blur */}
      <ExplorerFiltersBar
        className="sticky top-3 z-20 bg-[#F8F9FA]/90 backdrop-blur-md pt-2 pb-3 space-y-3"
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
      <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-500 font-mono px-1">
        <span data-testid="explorer-summary-count">
          Showing <span className="font-bold text-zinc-950">{filteredInvestigations.length}</span> of {INVESTIGATIONS.length} NASA PSI Studies
        </span>
        <span className="text-zinc-400 hidden sm:inline">
          Click any study to view chamber specs, test runs &amp; sensor telemetry
        </span>
      </div>

      {/* Empty State */}
      {filteredInvestigations.length === 0 ? (
        <div
          data-testid="explorer-empty-state"
          className="w-full p-12 text-center rounded-3xl bg-white border border-dashed border-gray-200 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
        >
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-900">No investigations match your filters</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              We couldn&apos;t find any NASA PSI studies matching your active search keywords or filter criteria.
            </p>
          </div>
          <button
            type="button"
            data-testid="empty-reset-btn"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2374] hover:bg-[#081b59] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
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
