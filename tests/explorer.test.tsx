import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  ExplorerFiltersBar,
  type FuelFilterValue,
  type FacilityFilterValue,
  type GravityFilterValue,
  type ExplorerSortOption,
  type ViewMode,
} from '../src/components/explorer/ExplorerFiltersBar';
import { InvestigationCard } from '../src/components/explorer/InvestigationCard';
import { InvestigationTable } from '../src/components/explorer/InvestigationTable';
import { ExplorerComparisonBar } from '../src/components/explorer/ExplorerComparisonBar';
import ExplorerPage from '../src/app/(dashboard)/explorer/page';
import StudyDetailPage from '../src/app/(dashboard)/explorer/[id]/page';
import { StudyHeader } from '../src/components/explorer/detail/StudyHeader';
import { TestRunsTable } from '../src/components/explorer/detail/TestRunsTable';
import { TelemetryPane } from '../src/components/explorer/detail/TelemetryPane';
import { ClaimsList } from '../src/components/explorer/detail/ClaimsList';
import { ChamberOverviewTab } from '../src/components/explorer/detail/ChamberOverviewTab';
import { PsiExportTab } from '../src/components/explorer/detail/PsiExportTab';
import { INVESTIGATIONS } from '../src/data/investigations';
import { TEST_RUNS } from '../src/data/testRuns';
import { EVIDENCE_CLAIMS } from '../src/data/evidenceClaims';
import { useWorkspaceStore } from '../src/store/useWorkspaceStore';
import { toastStore } from '../src/components/toast/toast-store';

const mockPush = vi.fn();
let mockParams: { id?: string } = { id: 'bass' };

expect.extend({
  toBeInTheDocument(received) {
    const pass = Boolean(received);
    return {
      pass,
      message: () => `expected element ${pass ? 'not ' : ''}to be in document`,
    };
  },
});

vi.mock('next/navigation', () => ({
  usePathname: () => '/explorer',
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useParams: () => mockParams,
}));

describe('Experiment Explorer & Detail Pages (/explorer & /explorer/[id])', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useWorkspaceStore.getState().resetWorkspace();
    toastStore.clear();
    mockParams = { id: 'bass' };

    // Mock URL for exports
    if (typeof window !== 'undefined') {
      window.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      window.URL.revokeObjectURL = vi.fn();
    }
  });

  // -------------------------------------------------------------------------
  // 0. Explorer Page Light Theme (StructPaper Redesign)
  // -------------------------------------------------------------------------
  describe('Explorer Page Light Theme', () => {
    it('renders light search bar, filter tabs, and investigation cards', () => {
      render(<ExplorerPage />);
      expect(screen.getByPlaceholderText(/Search investigations/i)).toBeInTheDocument();
      expect(screen.getAllByText(/All Domains/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/FLEX/i)[0]).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // 1. ExplorerFiltersBar
  // -------------------------------------------------------------------------
  describe('ExplorerFiltersBar', () => {
    it('renders all filter controls, search bar, and view toggle', () => {
      const handleSearch = vi.fn();
      const handleFuel = vi.fn();
      const handleFacility = vi.fn();
      const handleGravity = vi.fn();
      const handleSort = vi.fn();
      const handleView = vi.fn();
      const handleReset = vi.fn();

      render(
        <ExplorerFiltersBar
          searchQuery=""
          onSearchChange={handleSearch}
          fuelFilter="all"
          onFuelFilterChange={handleFuel}
          facilityFilter="all"
          onFacilityFilterChange={handleFacility}
          gravityFilter="all"
          onGravityFilterChange={handleGravity}
          sortBy="newest"
          onSortChange={handleSort}
          viewMode="grid"
          onViewModeChange={handleView}
          totalCount={20}
          filteredCount={20}
          onResetFilters={handleReset}
        />
      );

      expect(screen.getByTestId('explorer-filters-bar')).toBeDefined();
      expect(screen.getByTestId('explorer-filters-bar').className).toContain('sticky');
      expect(screen.getByTestId('explorer-filters-bar').className).toContain('backdrop-blur-md');
      expect(screen.getByTestId('explorer-search-input')).toBeDefined();
      expect(screen.getByTestId('fuel-tab-all')).toBeDefined();
      expect(screen.getByTestId('fuel-tab-solid')).toBeDefined();
      expect(screen.getByTestId('fuel-tab-droplet')).toBeDefined();
      expect(screen.getByTestId('fuel-tab-gas')).toBeDefined();
      expect(screen.getByTestId('facility-filter-select')).toBeDefined();
      expect(screen.getByTestId('gravity-filter-select')).toBeDefined();
      expect(screen.getByTestId('sort-by-select')).toBeDefined();
      expect(screen.getByTestId('filter-domain-select')).toBeDefined();
      expect(screen.getByTestId('filter-fuel-select')).toBeDefined();
      expect(screen.getByTestId('view-grid-btn')).toBeDefined();
      expect(screen.getByTestId('view-table-btn')).toBeDefined();
    });

    it('triggers facility and sort filter changes via custom select', () => {
      const handleFacility = vi.fn();
      const handleSort = vi.fn();
      render(
        <ExplorerFiltersBar
          searchQuery=""
          onSearchChange={vi.fn()}
          fuelFilter="all"
          onFuelFilterChange={vi.fn()}
          facilityFilter="all"
          onFacilityFilterChange={handleFacility}
          gravityFilter="all"
          onGravityFilterChange={vi.fn()}
          sortBy="newest"
          onSortChange={handleSort}
          viewMode="grid"
          onViewModeChange={vi.fn()}
          totalCount={20}
          filteredCount={20}
          onResetFilters={vi.fn()}
        />
      );

      fireEvent.change(screen.getByTestId('facility-filter-select'), {
        target: { value: 'MSG' },
      });
      expect(handleFacility).toHaveBeenCalledWith('MSG');

      fireEvent.change(screen.getByTestId('sort-by-select'), {
        target: { value: 'runs-desc' },
      });
      expect(handleSort).toHaveBeenCalledWith('runs-desc');
    });

    it('triggers search change on input', () => {
      const handleSearch = vi.fn();
      render(
        <ExplorerFiltersBar
          searchQuery="PMMA"
          onSearchChange={handleSearch}
          fuelFilter="all"
          onFuelFilterChange={vi.fn()}
          facilityFilter="all"
          onFacilityFilterChange={vi.fn()}
          gravityFilter="all"
          onGravityFilterChange={vi.fn()}
          sortBy="newest"
          onSortChange={vi.fn()}
          viewMode="grid"
          onViewModeChange={vi.fn()}
          totalCount={20}
          filteredCount={5}
          onResetFilters={vi.fn()}
        />
      );

      const input = screen.getByTestId('explorer-search-input');
      fireEvent.change(input, { target: { value: 'Saffire' } });
      expect(handleSearch).toHaveBeenCalledWith('Saffire');

      // Clear search button appears when query is non-empty
      const clearBtn = screen.getByTestId('clear-search-btn');
      fireEvent.click(clearBtn);
      expect(handleSearch).toHaveBeenCalledWith('');
    });

    it('triggers fuel tab change when clicked', () => {
      const handleFuel = vi.fn();
      render(
        <ExplorerFiltersBar
          searchQuery=""
          onSearchChange={vi.fn()}
          fuelFilter="all"
          onFuelFilterChange={handleFuel}
          facilityFilter="all"
          onFacilityFilterChange={vi.fn()}
          gravityFilter="all"
          onGravityFilterChange={vi.fn()}
          sortBy="newest"
          onSortChange={vi.fn()}
          viewMode="grid"
          onViewModeChange={vi.fn()}
          totalCount={20}
          filteredCount={20}
          onResetFilters={vi.fn()}
        />
      );

      fireEvent.click(screen.getByTestId('fuel-tab-droplet'));
      expect(handleFuel).toHaveBeenCalledWith('droplet');
    });

    it('triggers view mode switch between grid and table', () => {
      const handleView = vi.fn();
      render(
        <ExplorerFiltersBar
          searchQuery=""
          onSearchChange={vi.fn()}
          fuelFilter="all"
          onFuelFilterChange={vi.fn()}
          facilityFilter="all"
          onFacilityFilterChange={vi.fn()}
          gravityFilter="all"
          onGravityFilterChange={vi.fn()}
          sortBy="newest"
          onSortChange={vi.fn()}
          viewMode="grid"
          onViewModeChange={handleView}
          totalCount={20}
          filteredCount={20}
          onResetFilters={vi.fn()}
        />
      );

      fireEvent.click(screen.getByTestId('view-table-btn'));
      expect(handleView).toHaveBeenCalledWith('table');
    });

    it('shows reset button when filtered and triggers onResetFilters', () => {
      const handleReset = vi.fn();
      render(
        <ExplorerFiltersBar
          searchQuery="PMMA"
          onSearchChange={vi.fn()}
          fuelFilter="solid"
          onFuelFilterChange={vi.fn()}
          facilityFilter="MSG"
          onFacilityFilterChange={vi.fn()}
          gravityFilter="0g"
          onGravityFilterChange={vi.fn()}
          sortBy="newest"
          onSortChange={vi.fn()}
          viewMode="grid"
          onViewModeChange={vi.fn()}
          totalCount={20}
          filteredCount={3}
          onResetFilters={handleReset}
        />
      );

      const resetBtn = screen.getByTestId('reset-filters-btn');
      expect(resetBtn).toBeDefined();
      fireEvent.click(resetBtn);
      expect(handleReset).toHaveBeenCalledTimes(1);
    });
  });

  // -------------------------------------------------------------------------
  // 2. InvestigationCard & InvestigationTable
  // -------------------------------------------------------------------------
  describe('InvestigationCard', () => {
    it('renders study code, title, fuel phase, and chamber envelope', () => {
      const study = INVESTIGATIONS[0]; // BASS
      const handleToggle = vi.fn();

      render(
        <InvestigationCard
          investigation={study}
          isComparing={false}
          onToggleCompare={handleToggle}
          testRunsCount={8}
        />
      );

      expect(screen.getByTestId(`investigation-card-${study.id}`)).toBeDefined();
      expect(screen.getByText(study.code)).toBeDefined();
      expect(screen.getByText(study.title)).toBeDefined();
      expect(screen.getByText(study.primaryInvestigator)).toBeDefined();
      expect(screen.getByText('8 Runs')).toBeDefined();
      expect(screen.getByText('Inspect Study')).toBeDefined();
    });

    it('toggles compare state on button click', () => {
      const study = INVESTIGATIONS[0];
      const handleToggle = vi.fn();

      const { rerender } = render(
        <InvestigationCard
          investigation={study}
          isComparing={false}
          onToggleCompare={handleToggle}
        />
      );

      const compareBtn = screen.getByTestId(`compare-btn-${study.id}`);
      expect(screen.getByText('Compare')).toBeDefined();
      fireEvent.click(compareBtn);
      expect(handleToggle).toHaveBeenCalledWith(study.id);

      rerender(
        <InvestigationCard
          investigation={study}
          isComparing={true}
          onToggleCompare={handleToggle}
        />
      );
      expect(screen.getByText('Comparing')).toBeDefined();
    });
  });

  describe('InvestigationTable', () => {
    it('renders dense table view with headers and rows for investigations', () => {
      const handleToggle = vi.fn();
      const testStudies = INVESTIGATIONS.slice(0, 3);

      render(
        <InvestigationTable
          investigations={testStudies}
          compareList={['bass']}
          onToggleCompare={handleToggle}
          runsByInvestigationId={{ bass: 8 }}
        />
      );

      expect(screen.getByTestId('investigations-table')).toBeDefined();
      expect(screen.getByTestId('investigation-row-bass')).toBeDefined();
      expect(screen.getByTestId('table-compare-btn-bass')).toBeDefined();
      expect(screen.getByTestId('table-inspect-bass')).toBeDefined();

      fireEvent.click(screen.getByTestId('table-compare-btn-bass'));
      expect(handleToggle).toHaveBeenCalledWith('bass');
    });
  });

  // -------------------------------------------------------------------------
  // 3. ExplorerComparisonBar
  // -------------------------------------------------------------------------
  describe('ExplorerComparisonBar', () => {
    it('renders null when compareList is empty', () => {
      const { container } = render(
        <ExplorerComparisonBar
          compareList={[]}
          onRemove={vi.fn()}
          onClear={vi.fn()}
        />
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders comparison dock when studies are selected', () => {
      const handleRemove = vi.fn();
      const handleClear = vi.fn();

      render(
        <ExplorerComparisonBar
          compareList={['bass', 'flex-2']}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      );

      expect(screen.getByTestId('explorer-comparison-dock')).toBeDefined();
      expect(screen.getByTestId('compare-chip-bass')).toBeDefined();
      expect(screen.getByTestId('compare-chip-flex-2')).toBeDefined();

      fireEvent.click(screen.getByTestId('remove-compare-bass'));
      expect(handleRemove).toHaveBeenCalledWith('bass');

      fireEvent.click(screen.getByTestId('clear-all-compare-btn'));
      expect(handleClear).toHaveBeenCalledTimes(1);
    });
  });

  // -------------------------------------------------------------------------
  // 4. ExplorerCatalogPage (/explorer)
  // -------------------------------------------------------------------------
  describe('ExplorerCatalogPage (/explorer)', () => {
    it('renders catalog page with all 20 studies initially in grid view', () => {
      render(<ExplorerPage />);

      expect(screen.getByTestId('explorer-catalog-page')).toBeDefined();
      expect(screen.getByTestId('explorer-grid-view')).toBeDefined();
      expect(screen.getByTestId('explorer-summary-count')).toBeDefined();
      expect(screen.getByTestId('explorer-summary-count').textContent).toContain('Showing 20 of 20 NASA PSI Studies');
    });

    it('switches to table view when list button is clicked', () => {
      render(<ExplorerPage />);

      const tableBtn = screen.getByTestId('view-table-btn');
      fireEvent.click(tableBtn);

      expect(screen.getByTestId('investigations-table')).toBeDefined();
      expect(screen.queryByTestId('explorer-grid-view')).toBeNull();
    });

    it('filters investigations by keyword search', () => {
      render(<ExplorerPage />);

      const searchInput = screen.getByTestId('explorer-search-input');
      fireEvent.change(searchInput, { target: { value: 'Saffire' } });

      // Saffire studies (saffire-i through vi)
      expect(screen.getByTestId('investigation-card-saffire-i')).toBeDefined();
      expect(screen.queryByTestId('investigation-card-bass')).toBeNull();
    });

    it('filters investigations by fuel type (e.g. Droplet)', () => {
      render(<ExplorerPage />);

      const dropletTab = screen.getByTestId('fuel-tab-droplet');
      fireEvent.click(dropletTab);

      // Droplet investigations include flex, flex-2
      expect(screen.getByTestId('investigation-card-flex')).toBeDefined();
      expect(screen.queryByTestId('investigation-card-bass')).toBeNull();
    });

    it('shows empty state when no studies match and resets on button click', () => {
      render(<ExplorerPage />);

      const searchInput = screen.getByTestId('explorer-search-input');
      fireEvent.change(searchInput, { target: { value: 'nonexistent-string-xyz' } });

      expect(screen.getByTestId('explorer-empty-state')).toBeDefined();
      expect(screen.getByText('No investigations match your filters')).toBeDefined();

      const resetBtn = screen.getByTestId('empty-reset-btn');
      fireEvent.click(resetBtn);

      expect(screen.getByTestId('explorer-grid-view')).toBeDefined();
      expect(screen.getByTestId('explorer-summary-count').textContent).toContain('Showing 20 of 20 NASA PSI Studies');
    });

    it('adds and removes studies to compare list in store', () => {
      render(<ExplorerPage />);

      const compareBtn = screen.getByTestId('compare-btn-bass');
      fireEvent.click(compareBtn);

      expect(useWorkspaceStore.getState().compareList).toContain('bass');
      expect(screen.getByTestId('explorer-comparison-dock')).toBeDefined();

      const clearBtn = screen.getByTestId('clear-all-compare-btn');
      fireEvent.click(clearBtn);
      expect(useWorkspaceStore.getState().compareList).toHaveLength(0);
    });
  });

  // -------------------------------------------------------------------------
  // 5. Study Detail Components
  // -------------------------------------------------------------------------
  describe('Study Detail Components', () => {
    const study = INVESTIGATIONS[0]; // BASS

    it('StudyHeader renders title, PI, back link, external PSI link, and compare button', () => {
      const handleToggle = vi.fn();
      render(
        <StudyHeader
          study={study}
          isComparing={false}
          onToggleCompare={handleToggle}
        />
      );

      expect(screen.getByTestId('study-header')).toBeDefined();
      expect(screen.getByTestId('back-to-explorer-link')).toBeDefined();
      expect(screen.getByTestId('study-nasa-psi-link')).toBeDefined();
      expect(screen.getByTestId('header-compare-btn')).toBeDefined();
      expect(screen.getAllByText(study.code).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(study.title)).toBeDefined();

      fireEvent.click(screen.getByTestId('header-compare-btn'));
      expect(handleToggle).toHaveBeenCalledWith(study.id);
    });

    it('TestRunsTable displays verified test runs and summary KPIs', () => {
      render(<TestRunsTable study={study} />);

      expect(screen.getByTestId('test-runs-table-container')).toBeDefined();
      expect(screen.getByTestId('runs-table')).toBeDefined();
      expect(screen.getByTestId('run-row-BASS-RUN-01')).toBeDefined();
      expect(screen.getAllByText('PMMA Flat Sheet').length).toBeGreaterThanOrEqual(1);

      // Search runs
      const search = screen.getByTestId('runs-search-input');
      fireEvent.change(search, { target: { value: 'BASS-RUN-01' } });
      expect(screen.getByTestId('run-row-BASS-RUN-01')).toBeDefined();
    });

    it('TelemetryPane renders SVG time-series curves and run switcher', () => {
      render(<TelemetryPane study={study} />);

      expect(screen.getByTestId('telemetry-pane')).toBeDefined();
      expect(screen.getByTestId('telemetry-svg-chart')).toBeDefined();
      expect(screen.getByTestId('telemetry-run-btn-BASS-RUN-01')).toBeDefined();

      // Switch to Run 2
      const run2Btn = screen.getByTestId('telemetry-run-btn-BASS-RUN-02');
      fireEvent.click(run2Btn);
      expect(run2Btn.className).toContain('bg-[#4CC9F0]');
    });

    it('ClaimsList renders peer-reviewed claims with categories and DOI links', () => {
      // Find a study with claims, e.g. spice or slice
      const spiceStudy = INVESTIGATIONS.find((i) => i.id === 'spice') || study;
      render(<ClaimsList study={spiceStudy} />);

      expect(screen.getByTestId('claims-list-container')).toBeDefined();
      expect(screen.getByTestId('claims-items-list')).toBeDefined();
      expect(screen.getByTestId('claim-card-CLAIM-BUOY-01')).toBeDefined();
      expect(screen.getByTestId('doi-link-CLAIM-BUOY-01')).toBeDefined();
    });

    it('ChamberOverviewTab renders objectives, atmospheric envelope, and materials', () => {
      render(<ChamberOverviewTab study={study} />);

      expect(screen.getByTestId('chamber-overview-tab')).toBeDefined();
      expect(screen.getByText('Research Purpose & Scientific Objectives')).toBeDefined();
      expect(screen.getByText('Chamber Atmospheric Envelope')).toBeDefined();
      expect(screen.getByText('Spaceflight Relevance & Earth Applications')).toBeDefined();
    });

    it('PsiExportTab triggers JSON and CSV exports and opens PSI portal', () => {
      render(<PsiExportTab study={study} />);

      expect(screen.getByTestId('psi-export-tab')).toBeDefined();
      expect(screen.getByTestId('export-json-btn')).toBeDefined();
      expect(screen.getByTestId('export-csv-btn')).toBeDefined();
      expect(screen.getByTestId('psi-portal-button')).toBeDefined();

      fireEvent.click(screen.getByTestId('export-json-btn'));
      expect(window.URL.createObjectURL).toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('export-csv-btn'));
      expect(window.URL.createObjectURL).toHaveBeenCalledTimes(2);
    });
  });

  // -------------------------------------------------------------------------
  // 6. Dynamic StudyDetailPage (/explorer/[id])
  // -------------------------------------------------------------------------
  describe('StudyDetailPage (/explorer/[id])', () => {
    it('renders detail page and switches across all 5 navigation tabs', () => {
      mockParams = { id: 'bass' };
      render(<StudyDetailPage />);

      expect(screen.getByTestId('study-detail-page')).toBeDefined();
      expect(screen.getByTestId('study-header')).toBeDefined();
      expect(screen.getByTestId('study-tabs-nav')).toBeDefined();

      // Initial tab: Overview
      expect(screen.getByTestId('chamber-overview-tab')).toBeDefined();

      // Switch to Runs tab
      fireEvent.click(screen.getByTestId('tab-runs'));
      expect(screen.getByTestId('test-runs-table-container')).toBeDefined();

      // Switch to Telemetry tab
      fireEvent.click(screen.getByTestId('tab-telemetry'));
      expect(screen.getByTestId('telemetry-pane')).toBeDefined();

      // Switch to Claims tab
      fireEvent.click(screen.getByTestId('tab-claims'));
      expect(screen.getByTestId('claims-list-container')).toBeDefined();

      // Switch to PSI Raw Export tab
      fireEvent.click(screen.getByTestId('tab-psi-export'));
      expect(screen.getByTestId('psi-export-tab')).toBeDefined();
    });

    it('renders not found state when study id does not exist', () => {
      mockParams = { id: 'nonexistent-study-id' };
      render(<StudyDetailPage />);

      expect(screen.getByTestId('study-not-found')).toBeDefined();
      expect(screen.getByText('Investigation Not Found')).toBeDefined();
      expect(screen.getByTestId('not-found-return-link')).toBeDefined();
    });
  });
});
