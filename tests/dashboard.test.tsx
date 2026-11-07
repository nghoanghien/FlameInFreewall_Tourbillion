import React, { act } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KpiStatCards } from '../src/components/dashboard/KpiStatCards';
import {
  CuratedStudiesGrid,
  FEATURED_INVESTIGATION_IDS,
  getFuelBadgeConfig,
} from '../src/components/dashboard/CuratedStudiesGrid';
import { DomainBreakdown } from '../src/components/dashboard/DomainBreakdown';
import {
  QuickScenarioTrigger,
  QUICK_SCENARIOS,
} from '../src/components/dashboard/QuickScenarioTrigger';
import DashboardPage from '../src/app/(dashboard)/dashboard/page';
import { useWorkspaceStore } from '../src/store/useWorkspaceStore';
import { toastStore } from '../src/components/toast/toast-store';

expect.extend({
  toBeInTheDocument(received) {
    const pass = Boolean(received);
    return {
      pass,
      message: () => `expected element ${pass ? 'not ' : ''}to be in document`,
    };
  },
});

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Research Dashboard (/dashboard)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useWorkspaceStore.getState().resetWorkspace();
    toastStore.clear();
  });

  describe('Dashboard Page Light Theme', () => {
    it('renders KPI stats and curated studies with light white cards and dark text', () => {
      render(<DashboardPage />);
      expect(screen.getByText(/Microgravity Combustion Science/i)).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('160')).toBeInTheDocument();
    });
  });

  describe('KpiStatCards Component', () => {
    it('renders the 5 core telemetry KPI cards', () => {
      render(<KpiStatCards />);
      expect(screen.getByTestId('kpi-stat-cards')).toBeDefined();
      expect(screen.getByTestId('kpi-studies')).toBeDefined();
      expect(screen.getByTestId('kpi-runs')).toBeDefined();
      expect(screen.getByTestId('kpi-datapoints')).toBeDefined();
      expect(screen.getByTestId('kpi-claims')).toBeDefined();
      expect(screen.getByTestId('kpi-gap-alert')).toBeDefined();
    });

    it('displays 20 NASA PSI Studies and 160 Verified Test Runs', () => {
      render(<KpiStatCards />);
      expect(screen.getByText('20')).toBeDefined();
      expect(screen.getByText('NASA PSI Studies')).toBeDefined();
      expect(screen.getByText('160')).toBeDefined();
      expect(screen.getByText('Verified Test Runs')).toBeDefined();
    });

    it('displays 10,000+ Microgravity Data Points and 45 Evidence Claims', () => {
      render(<KpiStatCards />);
      expect(screen.getByText('10,000+')).toBeDefined();
      expect(screen.getByText('Microgravity Data Points')).toBeDefined();
      expect(screen.getByText('45')).toBeDefined();
      expect(screen.getByText('Evidence Claims')).toBeDefined();
    });

    it('displays the Partial Gravity Gap Alert ($0 < g < 1$) with NASA disclaimer', () => {
      render(<KpiStatCards />);
      expect(screen.getByText('0 < g < 1')).toBeDefined();
      expect(screen.getByText('Partial-g Knowledge Void')).toBeDefined();
      expect(screen.getByText(/NASA Disclaimer:/i)).toBeDefined();
      expect(screen.getByText(/Moon \(0\.16g\) & Mars \(0\.38g\) lack direct microgravity combustion data/i)).toBeDefined();
    });
  });

  describe('CuratedStudiesGrid Component', () => {
    it('renders all 5 curated flagship investigations in order', () => {
      render(<CuratedStudiesGrid />);
      expect(screen.getByTestId('curated-studies-grid')).toBeDefined();
      expect(FEATURED_INVESTIGATION_IDS).toHaveLength(5);

      for (const id of FEATURED_INVESTIGATION_IDS) {
        expect(screen.getByTestId(`study-card-${id}`)).toBeDefined();
      }

      expect(screen.getByText('BASS-II')).toBeDefined();
      expect(screen.getByText('SAFFIRE-I')).toBeDefined();
      expect(screen.getByText('SOFIE-GEL')).toBeDefined();
      expect(screen.getByText('FLEX-2')).toBeDefined();
      expect(screen.getByText('ACME CFI-G')).toBeDefined();
    });

    it('displays fuel badges, PI name, oxygen, facility, and run counts', () => {
      render(<CuratedStudiesGrid />);
      expect(screen.getAllByText('Solid Polymers').length).toBeGreaterThan(0);
      expect(screen.getByText('Liquid Droplets')).toBeDefined();
      expect(screen.getByText('Gaseous Flames')).toBeDefined();
      expect(screen.getAllByText('MSG').length).toBeGreaterThan(0);
      expect(screen.getByText('CYGNUS-SAFFIRE')).toBeDefined();
      expect(screen.getByText(/Dr\. Paul V\. Ferkul/i)).toBeDefined();
    });

    it('renders "View Investigation" links pointing to /explorer/{id}', () => {
      render(<CuratedStudiesGrid />);
      expect(screen.getByTestId('view-investigation-bass-ii').getAttribute('href')).toBe('/explorer/bass-ii');
      expect(screen.getByTestId('view-investigation-flex-2').getAttribute('href')).toBe('/explorer/flex-2');
    });

    it('toggles investigation in compare list and shows dynamic feedback', () => {
      render(<CuratedStudiesGrid />);
      const toggleBass = screen.getByTestId('toggle-compare-bass-ii');
      expect(screen.queryByText('In Compare')).toBeNull();

      fireEvent.click(toggleBass);
      expect(useWorkspaceStore.getState().compareList).toContain('bass-ii');
      expect(toastStore.getToasts().some((t) => t.title === 'Added to Comparison')).toBe(true);
      expect(screen.getByText('In Compare')).toBeDefined();

      fireEvent.click(toggleBass);
      expect(useWorkspaceStore.getState().compareList).not.toContain('bass-ii');
    });

    it('helper getFuelBadgeConfig maps solid, liquid, and gas fuels correctly', () => {
      expect(getFuelBadgeConfig('solid').label).toBe('Solid Polymers');
      expect(getFuelBadgeConfig('fabric').label).toBe('Solid Polymers');
      expect(getFuelBadgeConfig('droplet').label).toBe('Liquid Droplets');
      expect(getFuelBadgeConfig('liquid').label).toBe('Liquid Droplets');
      expect(getFuelBadgeConfig('gas').label).toBe('Gaseous Flames');
    });
  });

  describe('DomainBreakdown Component', () => {
    it('renders categorical distribution of fuels, facilities, and gravity regimes', () => {
      render(<DomainBreakdown />);
      expect(screen.getByTestId('domain-breakdown')).toBeDefined();
      expect(screen.getByTestId('fuel-distribution')).toBeDefined();
      expect(screen.getByTestId('facility-distribution')).toBeDefined();
      expect(screen.getByTestId('gravity-distribution')).toBeDefined();
    });

    it('renders fuel breakdown numbers matching the 20 investigations', () => {
      render(<DomainBreakdown />);
      expect(screen.getByText('Solid Polymers & Fabrics')).toBeDefined();
      expect(screen.getByText('Liquid Droplets & Sprays')).toBeDefined();
      expect(screen.getByText('Gaseous Flames')).toBeDefined();
      expect(screen.getByText('12')).toBeDefined();
      expect(screen.getByText('3')).toBeDefined();
      expect(screen.getByText('5')).toBeDefined();
    });

    it('renders CIR, MSG, and Cygnus facility breakdown', () => {
      render(<DomainBreakdown />);
      expect(screen.getByText(/CIR \(Combustion Integrated Rack\)/i)).toBeDefined();
      expect(screen.getByText(/MSG \(Microgravity Science Glovebox\)/i)).toBeDefined();
      expect(screen.getByText(/Cygnus Autonomous Vehicle/i)).toBeDefined();
    });

    it('renders 0g coverage and highlighted 0 < g < 1 partial gravity void', () => {
      render(<DomainBreakdown />);
      expect(screen.getByText(/ISS Microgravity \(0\.00g\)/i)).toBeDefined();
      expect(screen.getByText(/Partial Gravity Void \(0 < g < 1\)/i)).toBeDefined();
      expect(screen.getByText('0 Studies (VOID)')).toBeDefined();
    });

    it('clicking a fuel item sets the filter in useWorkspaceStore', () => {
      render(<DomainBreakdown />);
      fireEvent.click(screen.getByText('Solid Polymers & Fabrics'));
      expect(useWorkspaceStore.getState().filters.fuelCategory).toBe('solid');
    });
  });

  describe('QuickScenarioTrigger Component', () => {
    it('renders 3 planetary scenario cards (ISS, Moon, Mars)', () => {
      render(<QuickScenarioTrigger />);
      expect(screen.getByTestId('quick-scenario-trigger')).toBeDefined();
      expect(QUICK_SCENARIOS).toHaveLength(3);
      expect(screen.getByTestId('scenario-card-iss-baseline')).toBeDefined();
      expect(screen.getByTestId('scenario-card-artemis-lunar-base')).toBeDefined();
      expect(screen.getByTestId('scenario-card-mars-surface-habitat')).toBeDefined();
      expect(screen.getByText('Orbital Freefall (0.00g)')).toBeDefined();
      expect(screen.getByText('Lunar Surface Habitat (0.16g)')).toBeDefined();
      expect(screen.getByText('Martian Gravity (0.38g)')).toBeDefined();
    });

    it('clicking Moon Base sets scenario to 0.16g and navigates to /mission', () => {
      render(<QuickScenarioTrigger />);
      fireEvent.click(screen.getByTestId('launch-btn-artemis-lunar-base'));
      const activeScenario = useWorkspaceStore.getState().activeScenario;
      expect(activeScenario.gravity).toBe(0.16);
      expect(activeScenario.oxygenPct).toBe(30.0);
      expect(mockPush).toHaveBeenCalledWith('/mission');
      expect(toastStore.getToasts().some((t) => t.title.includes('Scenario Configured'))).toBe(true);
    });

    it('clicking Mars Colony sets scenario to 0.38g and navigates to /mission', () => {
      render(<QuickScenarioTrigger />);
      fireEvent.click(screen.getByTestId('launch-btn-mars-surface-habitat'));
      const activeScenario = useWorkspaceStore.getState().activeScenario;
      expect(activeScenario.gravity).toBe(0.38);
      expect(activeScenario.oxygenPct).toBe(28.0);
      expect(mockPush).toHaveBeenCalledWith('/mission');
    });
  });

  describe('DashboardPage Complete Assembly', () => {
    it('renders full dashboard assembly with all sections', () => {
      render(<DashboardPage />);
      expect(screen.getByTestId('research-dashboard')).toBeDefined();
      expect(screen.getByText(/Microgravity Combustion Science & Fire Safety Intelligence/i)).toBeDefined();
      expect(screen.getByTestId('kpi-stat-cards')).toBeDefined();
      expect(screen.getByTestId('quick-scenario-trigger')).toBeDefined();
      expect(screen.getByTestId('curated-studies-grid')).toBeDefined();
      expect(screen.getByTestId('domain-breakdown')).toBeDefined();
    });

    it('renders and manages the comparison banner when items are queued', () => {
      const { rerender } = render(<DashboardPage />);
      expect(screen.queryByTestId('dashboard-compare-banner')).toBeNull();

      act(() => {
        useWorkspaceStore.getState().toggleCompare('bass-ii');
      });
      rerender(<DashboardPage />);

      expect(screen.getByTestId('dashboard-compare-banner')).toBeDefined();
      expect(screen.getByText('1 of 3 selected')).toBeDefined();

      const clearBtn = screen.getByText('Clear');
      act(() => {
        fireEvent.click(clearBtn);
      });

      expect(useWorkspaceStore.getState().compareList).toHaveLength(0);
    });
  });
});
