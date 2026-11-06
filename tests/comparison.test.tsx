import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ComparisonBar } from '../src/components/explorer/ComparisonBar';
import { ComparisonColumn } from '../src/components/explorer/ComparisonColumn';
import { ComparisonModal } from '../src/components/explorer/ComparisonModal';
import { ParameterDeltaSummary } from '../src/components/explorer/ParameterDeltaSummary';
import { Header } from '../src/components/layout/Header';
import ExplorerPage from '../src/app/(dashboard)/explorer/page';
import { INVESTIGATIONS } from '../src/data/investigations';
import { TEST_RUNS } from '../src/data/testRuns';
import { useWorkspaceStore } from '../src/store/useWorkspaceStore';
import { toastStore } from '../src/components/toast/toast-store';
import {
  getStudyMetrics,
  calculateComparisonDeltas,
  getStudyHighlightFlags,
  generateComparisonCsv,
} from '../src/lib/comparisonUtils';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => '/explorer',
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useParams: () => ({ id: 'bass' }),
}));

describe('Multi-Study Comparison System (Task 8)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useWorkspaceStore.getState().resetWorkspace();
    toastStore.clear();

    if (typeof window !== 'undefined') {
      window.URL.createObjectURL = vi.fn(() => 'blob:mock-comparison-csv-url');
      window.URL.revokeObjectURL = vi.fn();
    }
  });

  // ---------------------------------------------------------------------------
  // 1. comparisonUtils Unit Tests
  // ---------------------------------------------------------------------------
  describe('comparisonUtils', () => {
    it('computes accurate study metrics and aggregates from test runs', () => {
      const bass = INVESTIGATIONS.find((inv) => inv.id === 'bass')!;
      const metrics = getStudyMetrics(bass, TEST_RUNS);

      expect(metrics.study.code).toBe('BASS');
      expect(metrics.verifiedRunCount).toBeGreaterThan(0);
      expect(metrics.o2RangeDisplay).toContain('15% – 30% O₂');
      expect(metrics.pressureRangeDisplay).toContain('8.5 – 14.7 psia');
      expect(metrics.fuelSummary).toContain('SOLID');
      expect(metrics.facilitySummary).toContain('MSG');
      expect(metrics.quenchDiameterDisplay).toMatch(/mm/);
      expect(metrics.flameSpreadVelocityDisplay).toMatch(/mm\/s/);
    });

    it('calculates cross-study comparison deltas correctly', () => {
      const bass = INVESTIGATIONS.find((inv) => inv.id === 'bass')!;
      const acme = INVESTIGATIONS.find((inv) => inv.id === 'acme-cfi-g')!;
      const deltas = calculateComparisonDeltas([bass, acme], TEST_RUNS);

      expect(deltas.o2OverallMin).toBe(Math.min(bass.oxygenRange[0], acme.oxygenRange[0]));
      expect(deltas.o2OverallMax).toBe(Math.max(bass.oxygenRange[1], acme.oxygenRange[1]));
      expect(deltas.o2SpanDelta).toBe(deltas.o2OverallMax - deltas.o2OverallMin);
      expect(deltas.uniqueFuelTypes.length).toBeGreaterThanOrEqual(1);
    });

    it('identifies parameter highlight flags for oxygen, fuel, and kinematics', () => {
      const bass = INVESTIGATIONS.find((inv) => inv.id === 'bass')!;
      const flex = INVESTIGATIONS.find((inv) => inv.id === 'flex')!;
      const flags = getStudyHighlightFlags(bass, [bass, flex], TEST_RUNS);

      expect(typeof flags.isHighestO2).toBe('boolean');
      expect(typeof flags.isUniqueFuel).toBe('boolean');
      expect(typeof flags.isFastestSpread).toBe('boolean');
    });

    it('generates compliant RFC-4180 CSV content with side-by-side study columns', () => {
      const bass = INVESTIGATIONS.find((inv) => inv.id === 'bass')!;
      const flex = INVESTIGATIONS.find((inv) => inv.id === 'flex')!;
      const csv = generateComparisonCsv([bass, flex], TEST_RUNS);

      expect(csv).toContain('"Parameter","BASS","FLEX"');
      expect(csv).toContain('"Investigation Code","BASS","FLEX"');
      expect(csv).toContain('"Investigation Title"');
      expect(csv).toContain('"Chamber Oxygen Limits"');
      expect(csv).toContain('"Pressure Envelope"');
      expect(csv).toContain('"Mean Quench Diameter"');
      expect(csv).toContain('"Verified Test Runs"');
      expect(csv).toContain('"Confidence Tier"');
      expect(csv).toContain('"NASA PSI Dataset URL"');
    });
  });

  // ---------------------------------------------------------------------------
  // 2. ComparisonBar Component Tests
  // ---------------------------------------------------------------------------
  describe('ComparisonBar Component', () => {
    it('renders null when compareList is empty', () => {
      const { container } = render(
        <ComparisonBar compareList={[]} onRemove={vi.fn()} onClear={vi.fn()} onOpenModal={vi.fn()} />
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders floating selection bar with selected study chips and badges', () => {
      render(
        <ComparisonBar
          compareList={['bass', 'flex']}
          onRemove={vi.fn()}
          onClear={vi.fn()}
          onOpenModal={vi.fn()}
        />
      );

      expect(screen.getByTestId('explorer-comparison-dock')).toBeDefined();
      expect(screen.getByTestId('compare-chip-bass')).toBeDefined();
      expect(screen.getByTestId('compare-chip-flex')).toBeDefined();
      expect(screen.getByText('BASS')).toBeDefined();
      expect(screen.getByText('FLEX')).toBeDefined();
      expect(screen.getByText('Compare (2/3):')).toBeDefined();
    });

    it('disables "Compare (1/3)" button when fewer than 2 studies selected, displaying tooltip hint', () => {
      const handleOpen = vi.fn();
      render(
        <ComparisonBar
          compareList={['bass']}
          onRemove={vi.fn()}
          onClear={vi.fn()}
          onOpenModal={handleOpen}
        />
      );

      const compareBtn = screen.getByTestId('open-comparison-modal-btn') as HTMLButtonElement;
      expect(compareBtn).toBeDefined();
      expect(compareBtn.disabled).toBe(true);
      expect(compareBtn.getAttribute('title')).toBe('Select 1 more study to compare');
      expect(screen.getByTestId('compare-btn-tooltip').textContent).toBe(
        'Select 1 more study to compare'
      );

      fireEvent.click(compareBtn);
      expect(handleOpen).not.toHaveBeenCalled();
    });

    it('enables "Compare (2/3)" button when 2 or 3 studies are selected and triggers modal callback', () => {
      const handleOpen = vi.fn();
      render(
        <ComparisonBar
          compareList={['bass', 'flex']}
          onRemove={vi.fn()}
          onClear={vi.fn()}
          onOpenModal={handleOpen}
        />
      );

      const compareBtn = screen.getByTestId('open-comparison-modal-btn') as HTMLButtonElement;
      expect(compareBtn.disabled).toBe(false);
      fireEvent.click(compareBtn);
      expect(handleOpen).toHaveBeenCalledTimes(1);
    });

    it('triggers onRemove when chip remove button is clicked', () => {
      const handleRemove = vi.fn();
      render(
        <ComparisonBar
          compareList={['bass', 'flex']}
          onRemove={handleRemove}
          onClear={vi.fn()}
          onOpenModal={vi.fn()}
        />
      );

      const removeBassBtn = screen.getByTestId('remove-compare-bass');
      fireEvent.click(removeBassBtn);
      expect(handleRemove).toHaveBeenCalledWith('bass');
    });

    it('triggers onClear when "Clear All" button is clicked', () => {
      const handleClear = vi.fn();
      render(
        <ComparisonBar
          compareList={['bass', 'flex']}
          onRemove={vi.fn()}
          onClear={handleClear}
          onOpenModal={vi.fn()}
        />
      );

      const clearBtn = screen.getByTestId('clear-all-compare-btn');
      fireEvent.click(clearBtn);
      expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it('falls back to Zustand workspace store when props are omitted', () => {
      act(() => {
        useWorkspaceStore.getState().toggleCompare('bass');
        useWorkspaceStore.getState().toggleCompare('flex');
      });

      render(<ComparisonBar />);

      expect(screen.getByTestId('compare-chip-bass')).toBeDefined();
      expect(screen.getByTestId('compare-chip-flex')).toBeDefined();

      const clearBtn = screen.getByTestId('clear-all-compare-btn');
      fireEvent.click(clearBtn);
      expect(useWorkspaceStore.getState().compareList).toEqual([]);
    });
  });

  // ---------------------------------------------------------------------------
  // 3. ComparisonColumn Component Tests
  // ---------------------------------------------------------------------------
  describe('ComparisonColumn Component', () => {
    it('renders full comparative study card with chamber and kinematic parameters', () => {
      const bass = INVESTIGATIONS.find((inv) => inv.id === 'bass')!;
      const flex = INVESTIGATIONS.find((inv) => inv.id === 'flex')!;
      const handleRemove = vi.fn();

      render(
        <ComparisonColumn
          study={bass}
          allStudies={[bass, flex]}
          onRemove={handleRemove}
        />
      );

      expect(screen.getByTestId(`comparison-column-${bass.id}`)).toBeDefined();
      expect(screen.getByTestId(`comparison-code-${bass.id}`).textContent).toBe('BASS');
      expect(screen.getByTestId(`comparison-title-${bass.id}`).textContent).toBe(bass.title);
      expect(screen.getByTestId(`comparison-fuel-${bass.id}`)).toBeDefined();
      expect(screen.getByTestId(`comparison-facility-${bass.id}`)).toBeDefined();
      expect(screen.getByTestId(`comparison-o2-${bass.id}`)).toBeDefined();
      expect(screen.getByTestId(`comparison-pressure-${bass.id}`)).toBeDefined();
      expect(screen.getByTestId(`comparison-quench-${bass.id}`)).toBeDefined();
      expect(screen.getByTestId(`comparison-spread-${bass.id}`)).toBeDefined();
      expect(screen.getByTestId(`comparison-runs-${bass.id}`)).toBeDefined();
      expect(screen.getByTestId(`comparison-confidence-${bass.id}`).textContent).toBe(
        `Tier ${bass.confidence}`
      );

      // Detail inspect link
      const inspectLink = screen.getByTestId(`comparison-column-details-${bass.id}`);
      expect(inspectLink.getAttribute('href')).toBe(`/explorer/${bass.id}`);

      // Remove button
      const removeBtn = screen.getByTestId(`remove-column-${bass.id}`);
      fireEvent.click(removeBtn);
      expect(handleRemove).toHaveBeenCalledWith('bass');
    });

    it('highlights distinct fuel phase and parameter differences', () => {
      const bass = INVESTIGATIONS.find((inv) => inv.id === 'bass')!;
      const acme = INVESTIGATIONS.find((inv) => inv.id === 'acme-cfi-g')!;

      render(<ComparisonColumn study={bass} allStudies={[bass, acme]} />);

      expect(screen.getByText('Distinct Phase')).toBeDefined();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. ComparisonModal Component Tests
  // ---------------------------------------------------------------------------
  describe('ComparisonModal Component', () => {
    it('does not render dialog when isOpen is false', () => {
      render(
        <ComparisonModal
          isOpen={false}
          onClose={vi.fn()}
          compareList={['bass', 'flex']}
        />
      );
      expect(screen.queryByTestId('comparison-modal')).toBeNull();
    });

    it('renders comparison dialog with backdrop blur and columns for 2-3 studies', () => {
      render(
        <ComparisonModal
          isOpen={true}
          onClose={vi.fn()}
          compareList={['bass', 'flex']}
        />
      );

      expect(screen.getByTestId('comparison-modal')).toBeDefined();
      expect(screen.getByTestId('comparison-modal-backdrop')).toBeDefined();
      expect(screen.getByText('Multi-Study Comparison')).toBeDefined();
      expect(screen.getByText('2/3 Studies')).toBeDefined();
      expect(screen.getByTestId('comparison-column-bass')).toBeDefined();
      expect(screen.getByTestId('comparison-column-flex')).toBeDefined();
    });

    it('renders parameter delta summary with oxygen span, fuel diversity, and quench threshold', () => {
      render(
        <ComparisonModal
          isOpen={true}
          onClose={vi.fn()}
          compareList={['bass', 'flex']}
        />
      );

      expect(screen.getByTestId('parameter-delta-summary')).toBeDefined();
      expect(screen.getByTestId('delta-summary-o2')).toBeDefined();
      expect(screen.getByTestId('delta-summary-fuel')).toBeDefined();
      expect(screen.getByTestId('delta-summary-quench')).toBeDefined();
      expect(screen.getByTestId('delta-summary-spread')).toBeDefined();
    });

    it('exports comparison CSV dataset and emits toast on "Export Comparison CSV" button click', () => {
      render(
        <ComparisonModal
          isOpen={true}
          onClose={vi.fn()}
          compareList={['bass', 'flex']}
        />
      );

      const exportBtn = screen.getByTestId('export-comparison-csv-btn') as HTMLButtonElement;
      expect(exportBtn.disabled).toBe(false);
      fireEvent.click(exportBtn);

      expect(window.URL.createObjectURL).toHaveBeenCalled();
      const toasts = toastStore.getToasts();
      expect(toasts.some((t) => t.title.includes('Comparison CSV Exported'))).toBe(true);
    });

    it('navigates to /mission?compare=... on "Open in Mission Workbench" click', () => {
      const handleClose = vi.fn();
      render(
        <ComparisonModal
          isOpen={true}
          onClose={handleClose}
          compareList={['bass', 'flex']}
        />
      );

      const workbenchBtn = screen.getByTestId('open-mission-workbench-btn');
      fireEvent.click(workbenchBtn);

      expect(handleClose).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/mission?compare=bass,flex');
    });

    it('closes modal when Close button, X icon, or backdrop is clicked', () => {
      const handleClose = vi.fn();
      const { rerender } = render(
        <ComparisonModal
          isOpen={true}
          onClose={handleClose}
          compareList={['bass', 'flex']}
        />
      );

      // Footer Close button
      fireEvent.click(screen.getByTestId('close-comparison-modal-btn'));
      expect(handleClose).toHaveBeenCalledTimes(1);

      // Header X icon
      fireEvent.click(screen.getByTestId('comparison-modal-close-icon'));
      expect(handleClose).toHaveBeenCalledTimes(2);

      // Backdrop click
      fireEvent.click(screen.getByTestId('comparison-modal-backdrop'));
      expect(handleClose).toHaveBeenCalledTimes(3);
    });

    it('dismisses modal on keyboard Escape press', () => {
      const handleClose = vi.fn();
      render(
        <ComparisonModal
          isOpen={true}
          onClose={handleClose}
          compareList={['bass', 'flex']}
        />
      );

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Header & ExplorerPage Integration Tests
  // ---------------------------------------------------------------------------
  describe('Header and ExplorerPage Integration', () => {
    it('Header comparison pill triggers opening modal when compareList.length >= 2', () => {
      act(() => {
        useWorkspaceStore.getState().toggleCompare('bass');
        useWorkspaceStore.getState().toggleCompare('flex');
      });

      render(<Header />);

      const compareTrigger = screen.getByTestId('header-compare-trigger');
      expect(compareTrigger).toBeDefined();
      expect(screen.getByText('Comparing 2/3')).toBeDefined();

      fireEvent.click(compareTrigger);
      expect(useWorkspaceStore.getState().isComparisonModalOpen).toBe(true);
    });

    it('Header comparison pill warns when compareList.length < 2', () => {
      act(() => {
        useWorkspaceStore.getState().toggleCompare('bass');
      });

      render(<Header />);

      const compareTrigger = screen.getByTestId('header-compare-trigger');
      fireEvent.click(compareTrigger);

      // Modal should NOT be opened
      expect(useWorkspaceStore.getState().isComparisonModalOpen).toBe(false);
      // Informative toast should be shown
      const toasts = toastStore.getToasts();
      expect(toasts.some((t) => t.title.includes('Select 1 more study'))).toBe(true);
    });

    it('ExplorerPage connects floating comparison dock with comparison modal workflow', () => {
      render(<ExplorerPage />);

      // Initially dock is null
      expect(screen.queryByTestId('explorer-comparison-dock')).toBeNull();

      // Add two studies from cards
      const bassBtn = screen.getByTestId('compare-btn-bass');
      const flex2Btn = screen.getByTestId('compare-btn-flex-2');
      fireEvent.click(bassBtn);
      fireEvent.click(flex2Btn);

      // Dock is now displayed with 2 chips
      expect(screen.getByTestId('explorer-comparison-dock')).toBeDefined();
      expect(screen.getByTestId('compare-chip-bass')).toBeDefined();
      expect(screen.getByTestId('compare-chip-flex-2')).toBeDefined();

      // Click "Compare (2/3)" button in floating dock
      const openModalBtn = screen.getByTestId('open-comparison-modal-btn') as HTMLButtonElement;
      expect(openModalBtn.disabled).toBe(false);
      fireEvent.click(openModalBtn);

      // Modal is open with side-by-side columns
      expect(screen.getByTestId('comparison-modal')).toBeDefined();
      expect(screen.getByTestId('comparison-column-bass')).toBeDefined();
      expect(screen.getByTestId('comparison-column-flex-2')).toBeDefined();
      expect(screen.getByTestId('parameter-delta-summary')).toBeDefined();

      // Close modal
      fireEvent.click(screen.getByTestId('close-comparison-modal-btn'));
      expect(useWorkspaceStore.getState().isComparisonModalOpen).toBe(false);
    });
  });
});
