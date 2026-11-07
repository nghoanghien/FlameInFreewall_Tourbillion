'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
import { CustomSelect, CustomSelectOption } from '@/components/ui/CustomSelect';

export type FuelFilterValue = 'all' | 'solid' | 'droplet' | 'gas';
export type FacilityFilterValue = 'all' | 'CIR' | 'MSG' | 'Cygnus';
export type GravityFilterValue = 'all' | '0g' | '1g' | 'partial';
export type ExplorerSortOption = 'newest' | 'code-asc' | 'runs-desc' | 'confidence';
export type ViewMode = 'grid' | 'table';

export interface ExplorerFiltersBarProps {
  className?: string;
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
  { id: 'all', label: 'All Domains', icon: Layers },
  { id: 'solid', label: 'Solid Polymers', icon: Flame },
  { id: 'droplet', label: 'Liquid Droplets', icon: Droplet },
  { id: 'gas', label: 'Gaseous Flames', icon: Wind },
];

const FACILITY_OPTIONS: CustomSelectOption<FacilityFilterValue>[] = [
  { value: 'all', label: 'All Facilities' },
  { value: 'CIR', label: 'CIR (Combustion Rack)' },
  { value: 'MSG', label: 'MSG (Glovebox)' },
  { value: 'Cygnus', label: 'Cygnus (Saffire)' },
];

const GRAVITY_OPTIONS: CustomSelectOption<GravityFilterValue>[] = [
  { value: 'all', label: 'All Gravity Regimes' },
  { value: '0g', label: 'Microgravity (0g)' },
  { value: '1g', label: 'Terrestrial (1g)' },
  { value: 'partial', label: 'Partial Gravity' },
];

const SORT_OPTIONS: CustomSelectOption<ExplorerSortOption>[] = [
  { value: 'newest', label: 'Sort: Chronological (Newest)' },
  { value: 'code-asc', label: 'Sort: Study Code (A–Z)' },
  { value: 'runs-desc', label: 'Sort: Most Test Runs' },
  { value: 'confidence', label: 'Sort: Confidence Tier (A-B)' },
];

export const ExplorerFiltersBar: React.FC<ExplorerFiltersBarProps> = ({
  className = 'sticky top-0 z-30 space-y-3',
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
      className={className}
    >
      {/* Hidden selects for domain and fuel filter accessibility & test compatibility */}
      <select
        data-testid="filter-domain-select"
        value={fuelFilter}
        onChange={(e) => onFuelFilterChange(e.target.value as FuelFilterValue)}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      >
        {FUEL_TABS.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
      <select
        data-testid="filter-fuel-select"
        value={fuelFilter}
        onChange={(e) => onFuelFilterChange(e.target.value as FuelFilterValue)}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      >
        {FUEL_TABS.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>

      {/* Row 1: Eatzy Search Box, Summary Pill, Reset, View Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Eatzy Search Input Box with Inner Shadow & Vertical Divider */}
        <div className="flex-1 max-w-xl relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 group-hover:text-zinc-600 group-focus-within:text-[#0B2374] transition-colors" />
            <div className="w-px h-5 bg-gray-200 group-hover:bg-zinc-300 transition-colors" />
          </div>

          <input
            type="text"
            role="searchbox"
            data-testid="explorer-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search investigations by code, title, material, PI, or tags..."
            style={{ boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.09)' }}
            className="w-full bg-slate-50/60 backdrop-blur-sm border-2 border-white focus:border-[#D4FC02]/40 rounded-3xl py-3.5 sm:py-4 pl-14 pr-12 text-sm sm:text-base font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#D4FC02]/10 transition-all shadow-eatzy-inner hover:shadow-eatzy-inner-hover"
          />

          {searchQuery && (
            <button
              type="button"
              data-testid="clear-search-btn"
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center transition-all group/close cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4 text-zinc-600 group-hover/close:rotate-90 transition-transform duration-200" />
            </button>
          )}
        </div>

        {/* View Mode & Reset Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {/* Summary Count Pill */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 border border-gray-200/60 text-xs font-bold text-zinc-700 shadow-2xs">
            <span className="text-[#0B2374] font-extrabold">{filteredCount}</span>
            <span className="text-zinc-400">/</span>
            <span>{totalCount} Studies</span>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <button
              type="button"
              data-testid="reset-filters-btn"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* View Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white/80 border border-gray-200/60 shadow-2xs">
            <button
              type="button"
              data-testid="view-grid-btn"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-xl transition-all duration-150 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-zinc-900 text-white font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
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
              className={`p-1.5 rounded-xl transition-all duration-150 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-zinc-900 text-white font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
              title="Table View"
              aria-label="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Fuel Filter Chips & Custom Select Dropdowns */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-1">
        {/* Fuel Type Filter Chips */}
        <div
          data-testid="fuel-filter-tabs"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
        >
          {FUEL_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = fuelFilter === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                data-testid={`fuel-tab-${tab.id}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onFuelFilterChange(tab.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-md shadow-black/10'
                    : 'bg-gray-200 text-zinc-600 hover:text-zinc-900 hover:bg-gray-200/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Custom Select Dropdowns: Facility, Gravity, Sort */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Facility Filter */}
          <div className="w-44">
            <CustomSelect
              options={FACILITY_OPTIONS}
              value={facilityFilter}
              onChange={onFacilityFilterChange}
              testId="facility-filter-select"
              ariaLabel="Filter by Facility"
              leadingIcon={<SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />}
            />
          </div>

          {/* Gravity Filter */}
          <div className="w-44">
            <CustomSelect
              options={GRAVITY_OPTIONS}
              value={gravityFilter}
              onChange={onGravityFilterChange}
              testId="gravity-filter-select"
              ariaLabel="Filter by Gravity Regime"
              leadingIcon={<SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />}
            />
          </div>

          {/* Sort Selector */}
          <div className="w-52">
            <CustomSelect
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={onSortChange}
              testId="sort-by-select"
              ariaLabel="Sort Studies"
              leadingIcon={<SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
