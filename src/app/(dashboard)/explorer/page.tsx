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
import { EndOfListIndicator } from '@/components/ui/EndOfListIndicator';
import { InvestigationCardShimmer } from '@/components/explorer/InvestigationCardShimmer';
import { filterAndSortInvestigations } from '@/lib/explorerFilters';

const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

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
  const [isLoading, setIsLoading] = useState(false);

  const triggerFilterTransition = () => {
    if (!isTest) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 160);
    }
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    triggerFilterTransition();
  };

  const handleFuelFilterChange = (f: FuelFilterValue) => {
    setFuelFilter(f);
    triggerFilterTransition();
  };

  const handleFacilityFilterChange = (fac: FacilityFilterValue) => {
    setFacilityFilter(fac);
    triggerFilterTransition();
  };

  const handleGravityFilterChange = (g: GravityFilterValue) => {
    setGravityFilter(g);
    triggerFilterTransition();
  };

  const handleSortChange = (s: ExplorerSortOption) => {
    setSortBy(s);
    triggerFilterTransition();
  };

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
    return filterAndSortInvestigations({
      investigations: INVESTIGATIONS,
      searchQuery,
      fuelFilter,
      facilityFilter,
      gravityFilter,
      sortBy,
      runsByInvestigationId,
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
      {/* Top Header - StructPaper Minimalist Templates Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 pb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#0B2374]" strokeWidth={2.5} />
            <span>Experiment Explorer</span>
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4FC02]/25 text-zinc-950">
            20 NASA PSI Studies
          </span>
        </div>
      </div>

      {/* Top Sticky Filter Toolbar matching Eatzy/StructPaper */}
      <div className="sticky top-0 z-30 -mx-3 px-3 sm:-mx-6 sm:px-6 py-3 pb-5 transition-all duration-300">
        <div className="absolute inset-0 bg-[#F8F9FA]/50 backdrop-blur-sm pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,black_85%,transparent)]" />
        <ExplorerFiltersBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          fuelFilter={fuelFilter}
          onFuelFilterChange={handleFuelFilterChange}
          facilityFilter={facilityFilter}
          onFacilityFilterChange={handleFacilityFilterChange}
          gravityFilter={gravityFilter}
          onGravityFilterChange={handleGravityFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={INVESTIGATIONS.length}
          filteredCount={filteredInvestigations.length}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-500 px-1">
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
      ) : isLoading ? (
        /* Shimmer Skeleton Grid matching StructPaper */
        <div
          data-testid="explorer-shimmer-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <InvestigationCardShimmer cardCount={6} />
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

      {/* End of List Indicator */}
      {filteredInvestigations.length > 0 && <EndOfListIndicator />}

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
