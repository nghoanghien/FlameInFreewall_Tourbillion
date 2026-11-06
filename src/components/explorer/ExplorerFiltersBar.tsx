'use client';

import React from 'react';
import {
  Search,
  LayoutGrid,
  List,
  RotateCcw,
  X,
  Flame,
  Droplet,
  Wind,
  Layers,
  SlidersHorizontal,
} from 'lucide-react';

export type FuelFilterValue = 'all' | 'solid' | 'droplet' | 'gas';
export type FacilityFilterValue = 'all' | 'CIR' | 'MSG' | 'Cygnus';
export type GravityFilterValue = 'all' | '0g' | '1g' | 'partial';
export type ExplorerSortOption = 'newest' | 'code-asc' | 'runs-desc' | 'confidence';
export type ViewMode = 'grid' | 'table';

export interface ExplorerFiltersBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  fuelFilter: FuelFilterValue;
  onFuelFilterChange: (f: FuelFilterValue) => void;
  facilityFilter: FacilityFilterValue;
  onFacilityFilterChange: (fac: FacilityFilterValue) => void;
  gravityFilter: GravityFilterValue;
  onGravityFilterChange: (g: GravityFilterValue) => void;
  sortBy: ExplorerSortOption;
  onSortChange: (s: ExplorerSortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  totalCount: number;
  filteredCount: number;
  onResetFilters: () => void;
}

const FUEL_TABS: Array<{ id: FuelFilterValue; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'all', label: 'All Fuels', icon: Layers },
  { id: 'solid', label: 'Solid Polymers', icon: Flame },
  { id: 'droplet', label: 'Liquid Droplets', icon: Droplet },
  { id: 'gas', label: 'Gaseous Flames', icon: Wind },
];

const FACILITY_OPTIONS: Array<{ value: FacilityFilterValue; label: string }> = [
  { value: 'all', label: 'All Facilities' },
  { value: 'CIR', label: 'CIR (Combustion Rack)' },
  { value: 'MSG', label: 'MSG (Glovebox)' },
  { value: 'Cygnus', label: 'Cygnus (Saffire)' },
];

const GRAVITY_OPTIONS: Array<{ value: GravityFilterValue; label: string }> = [
  { value: 'all', label: 'All Gravity Regimes' },
  { value: '0g', label: 'Microgravity (0g)' },
  { value: '1g', label: 'Terrestrial (1g)' },
  { value: 'partial', label: 'Partial Gravity' },
];

const SORT_OPTIONS: Array<{ value: ExplorerSortOption; label: string }> = [
  { value: 'newest', label: 'Sort: Chronological (Newest)' },
  { value: 'code-asc', label: 'Sort: Study Code (A–Z)' },
  { value: 'runs-desc', label: 'Sort: Most Test Runs' },
  { value: 'confidence', label: 'Sort: Confidence Tier (A-B)' },
];

export const ExplorerFiltersBar: React.FC<ExplorerFiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  fuelFilter,
  onFuelFilterChange,
  facilityFilter,
  onFacilityFilterChange,
  gravityFilter,
  onGravityFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
  onResetFilters,
}) => {
  const isFiltered =
    searchQuery.trim().length > 0 ||
    fuelFilter !== 'all' ||
    facilityFilter !== 'all' ||
    gravityFilter !== 'all' ||
    sortBy !== 'newest';

  return (
    <div
      data-testid="explorer-filters-bar"
      className="w-full bg-[#111827]/85 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-4 shadow-xl"
    >
      {/* Top Row: Search Input, View Mode Toggle, Reset */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            data-testid="explorer-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by code, title, material, PI, or tags..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#4CC9F0] focus:ring-1 focus:ring-[#4CC9F0] text-sm text-[#F8F9FA] placeholder-slate-500 outline-none transition-all duration-200"
          />
          {searchQuery && (
            <button
              type="button"
              data-testid="clear-search-btn"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode & Reset Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          {/* Summary Count Pill */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <span className="text-[#D4FC02] font-bold">{filteredCount}</span>
            <span className="text-slate-500">/</span>
            <span>{totalCount} Studies</span>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <button
              type="button"
              data-testid="reset-filters-btn"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* View Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-black/40 border border-white/10">
            <button
              type="button"
              data-testid="view-grid-btn"
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-all duration-150 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#4CC9F0] text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-testid="view-table-btn"
              onClick={() => onViewModeChange('table')}
              className={`p-2 rounded-lg transition-all duration-150 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#4CC9F0] text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title="Table View"
              aria-label="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls: Fuel Tabs & Dropdowns */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-1 border-t border-white/5">
        {/* Fuel Type Filter Tabs */}
        <div
          data-testid="fuel-filter-tabs"
          className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/30 border border-white/10"
        >
          {FUEL_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = fuelFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-testid={`fuel-tab-${tab.id}`}
                onClick={() => onFuelFilterChange(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4FC02] to-[#b3d600] text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dropdown Filters: Facility, Gravity, Sort */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Facility Filter */}
          <div className="relative">
            <select
              data-testid="facility-filter-select"
              value={facilityFilter}
              aria-label="Filter by Facility"
              onChange={(e) => onFacilityFilterChange(e.target.value as FacilityFilterValue)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-xs text-slate-200 focus:outline-none focus:border-[#4CC9F0] transition-colors cursor-pointer"
            >
              {FACILITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
                  {opt.label}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>

          {/* Gravity Filter */}
          <div className="relative">
            <select
              data-testid="gravity-filter-select"
              value={gravityFilter}
              aria-label="Filter by Gravity Regime"
              onChange={(e) => onGravityFilterChange(e.target.value as GravityFilterValue)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-xs text-slate-200 focus:outline-none focus:border-[#4CC9F0] transition-colors cursor-pointer"
            >
              {GRAVITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
                  {opt.label}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              data-testid="sort-by-select"
              value={sortBy}
              aria-label="Sort Studies"
              onChange={(e) => onSortChange(e.target.value as ExplorerSortOption)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-xs text-slate-200 focus:outline-none focus:border-[#4CC9F0] transition-colors cursor-pointer font-medium"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
                  {opt.label}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
