import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { DockPillButton } from '../src/components/layout/DockPillButton';
import { Sidebar } from '../src/components/layout/Sidebar';
import { Header } from '../src/components/layout/Header';
import { BottomNav } from '../src/components/layout/BottomNav';
import { AppShell } from '../src/components/layout/AppShell';
import { useWorkspaceStore } from '../src/store/useWorkspaceStore';
import { toastStore } from '../src/components/toast/toast-store';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Layout System & StructPaper DockPill Navigation', () => {
  beforeEach(() => {
    useWorkspaceStore.getState().resetWorkspace();
    toastStore.clear();
    vi.clearAllMocks();
  });

  describe('DockPillButton', () => {
    it('renders in collapsed state as a 58px circular dock icon', () => {
      render(
        <DockPillButton
          icon={<span data-testid="test-icon">ICON</span>}
          label="Research Dashboard"
          description="PSI telemetry"
          isExpanded={false}
        />
      );

      const button = screen.getByRole('button', { name: 'Research Dashboard' });
      expect(button).toBeDefined();
      expect(button.className).toContain('rounded-full');
      expect(button.className).toContain('w-[58px]');
      expect(button.className).toContain('h-[58px]');
      expect(screen.getByTestId('test-icon')).toBeDefined();
    });

    it('expands into a 280px pill displaying label and description', () => {
      render(
        <DockPillButton
          icon={<span data-testid="test-icon">ICON</span>}
          label="Research Dashboard"
          description="PSI telemetry"
          isExpanded={true}
        />
      );

      const button = screen.getByRole('button', { name: 'Research Dashboard' });
      expect(button.className).toContain('w-[280px]');
      expect(button.className).toContain('h-[70px]');
      expect(button.className).toContain('rounded-[30px]');
      expect(screen.getByText('Research Dashboard')).toBeDefined();
      expect(screen.getByText('PSI telemetry')).toBeDefined();
    });

    it('applies glowing Electric Lime active styles when active=true', () => {
      render(
        <DockPillButton
          icon={<span>ICON</span>}
          label="Mission Scenario"
          active={true}
          isExpanded={true}
        />
      );

      const button = screen.getByRole('button', { name: 'Mission Scenario' });
      expect(button.className).toContain('bg-[#D4FC02]');
      expect(button.className).toContain('text-[#080C18]');
    });

    it('handles click callbacks properly', () => {
      const handleClick = vi.fn();
      render(
        <DockPillButton
          icon={<span>ICON</span>}
          label="Click Me"
          onClick={handleClick}
          isExpanded={false}
        />
      );

      const button = screen.getByRole('button', { name: 'Click Me' });
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders a Next.js Link when href is provided', () => {
      render(
        <DockPillButton
          icon={<span>ICON</span>}
          label="Explorer"
          href="/explorer"
          isExpanded={false}
        />
      );

      const link = screen.getByRole('link');
      expect(link.getAttribute('href')).toBe('/explorer');
    });
  });

  describe('Sidebar Navigation Dock', () => {
    it('renders all primary routes (/dashboard, /explorer, /mission, /settings)', () => {
      render(<Sidebar />);

      expect(screen.getByTestId('nav-pill-dashboard')).toBeDefined();
      expect(screen.getByTestId('nav-pill-explorer')).toBeDefined();
      expect(screen.getByTestId('nav-pill-mission')).toBeDefined();
      expect(screen.getByTestId('nav-pill-settings')).toBeDefined();
    });

    it('toggles expansion state when chevron button is clicked', () => {
      render(<Sidebar />);

      const toggleBtn = screen.getByTestId('sidebar-toggle-button');
      expect(toggleBtn).toBeDefined();

      // Initially collapsed: label is "Expand Dock"
      expect(toggleBtn.getAttribute('aria-label')).toBe('Expand Dock');

      // Click to expand
      fireEvent.click(toggleBtn);
      expect(toggleBtn.getAttribute('aria-label')).toBe('Collapse Dock');

      // Click to collapse
      fireEvent.click(toggleBtn);
      expect(toggleBtn.getAttribute('aria-label')).toBe('Expand Dock');
    });

    it('triggers workspace reset from the bottom quick action button', () => {
      // Modify store first
      useWorkspaceStore.getState().toggleCompare('BASS-01');
      expect(useWorkspaceStore.getState().compareList.length).toBe(1);

      render(<Sidebar />);

      const resetBtn = screen.getByTestId('sidebar-reset-button');
      fireEvent.click(resetBtn);

      // Verify reset in store
      expect(useWorkspaceStore.getState().compareList.length).toBe(0);
      expect(toastStore.getToasts().some((t) => t.title === 'Workspace Reset')).toBe(true);
    });

    it('opens mobile drawer when mobile hamburger menu is clicked', () => {
      render(<Sidebar />);

      const menuBtn = screen.getByTestId('mobile-menu-button');
      fireEvent.click(menuBtn);

      expect(screen.getByTestId('mobile-drawer-backdrop')).toBeDefined();
      expect(screen.getByText('Microgravity Fire Safety')).toBeDefined();
    });
  });

  describe('Space Apps Header', () => {
    it('renders brand identity, title, and PSI telemetry status', () => {
      render(<Header />);

      expect(screen.getByText('FlameGuard')).toBeDefined();
      expect(screen.getByText('NASA Space Apps 2026')).toBeDefined();
      expect(screen.getByText('PSI 20 Studies')).toBeDefined();
    });

    it('allows switching mission scenario presets via preset selector', () => {
      render(<Header />);

      const presetSelector = screen.getByTestId('scenario-preset-selector');
      expect(presetSelector).toBeDefined();
      expect(screen.getByText('ISS Microgravity Baseline')).toBeDefined();

      // Open dropdown
      fireEvent.click(presetSelector);
      expect(screen.getByTestId('scenario-preset-menu')).toBeDefined();

      // Click Artemis Lunar Habitat preset
      const lunarBtn = screen.getByText('Artemis Lunar Habitat');
      fireEvent.click(lunarBtn);

      // Active scenario in store should be updated
      const active = useWorkspaceStore.getState().activeScenario;
      expect(active.name).toBe('Artemis Lunar Habitat');
      expect(active.gravity).toBe(0.16);
      expect(active.oxygenPct).toBe(34);
    });

    it('displays active comparison badge and allows clearing comparisons', () => {
      // Add items to comparison
      act(() => {
        useWorkspaceStore.getState().toggleCompare('BASS-01');
        useWorkspaceStore.getState().toggleCompare('ACME-02');
      });

      render(<Header />);

      expect(screen.getByText('Comparing 2/3')).toBeDefined();

      // Clear compare
      const clearBtn = screen.getByTitle('Clear comparison list');
      fireEvent.click(clearBtn);

      expect(useWorkspaceStore.getState().compareList.length).toBe(0);
    });
  });

  describe('BottomNav (Mobile Navigation)', () => {
    it('renders mobile navigation tabs with correct links', () => {
      render(<BottomNav />);

      expect(screen.getByTestId('bottom-nav-dashboard')).toBeDefined();
      expect(screen.getByTestId('bottom-nav-explorer')).toBeDefined();
      expect(screen.getByTestId('bottom-nav-mission')).toBeDefined();
      expect(screen.getByTestId('bottom-nav-settings')).toBeDefined();
    });
  });

  describe('AppShell Layout Integration', () => {
    it('renders children with sidebar, header, and toaster seamlessly', () => {
      render(
        <AppShell>
          <div data-testid="dashboard-content">Telemetry Payload Content</div>
        </AppShell>
      );

      expect(screen.getByTestId('app-header')).toBeDefined();
      expect(screen.getByTestId('dashboard-content')).toBeDefined();
      expect(screen.getByText('Telemetry Payload Content')).toBeDefined();
    });
  });
});
