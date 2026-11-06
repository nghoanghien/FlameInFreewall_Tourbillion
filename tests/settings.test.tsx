import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPage from '../src/app/(dashboard)/settings/page';
import { useWorkspaceStore } from '../src/store/useWorkspaceStore';
import { toastStore } from '../src/components/toast/toast-store';

describe('Mission Control Settings & Data Provenance (/settings)', () => {
  beforeEach(() => {
    useWorkspaceStore.getState().resetWorkspace();
    toastStore.clear();
    vi.clearAllMocks();

    if (typeof window !== 'undefined') {
      window.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      window.URL.revokeObjectURL = vi.fn();
    }
  });

  it('renders the settings header and all 4 core sections', () => {
    render(<SettingsPage />);

    expect(screen.getByTestId('settings-page')).toBeDefined();
    expect(screen.getByText('Mission Control Settings & Data Provenance')).toBeDefined();
    expect(screen.getByTestId('section-provenance')).toBeDefined();
    expect(screen.getByTestId('section-bulk-export')).toBeDefined();
    expect(screen.getByTestId('section-state-management')).toBeDefined();
    expect(screen.getByTestId('section-computing-constants')).toBeDefined();
  });

  it('displays NASA PSI dataset provenance metrics (20 studies, 160 runs, 45 claims)', () => {
    render(<SettingsPage />);

    expect(screen.getByText('20')).toBeDefined();
    expect(screen.getByText('160')).toBeDefined();
    expect(screen.getByText('45')).toBeDefined();
    expect(screen.getByText(/Data Version 1\.0\.0/)).toBeDefined();
    expect(screen.getByText('Open Science')).toBeDefined();
  });

  it('triggers catalog JSON and test runs CSV bulk exports with toasts', () => {
    render(<SettingsPage />);

    const jsonBtn = screen.getByTestId('btn-export-catalog-json');
    const csvBtn = screen.getByTestId('btn-export-runs-csv');

    fireEvent.click(jsonBtn);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    const toastsAfterJson = toastStore.getToasts();
    expect(toastsAfterJson.some((t) => t.title.includes('Export Complete PSI Catalog JSON'))).toBe(true);

    fireEvent.click(csvBtn);
    expect(window.URL.createObjectURL).toHaveBeenCalledTimes(2);
    const toastsAfterCsv = toastStore.getToasts();
    expect(toastsAfterCsv.some((t) => t.title.includes('Export All Test Runs CSV'))).toBe(true);
  });

  it('manages workspace state reset and comparison clearing with toast notifications', () => {
    // Populate some workspace state
    useWorkspaceStore.getState().toggleCompare('bass');
    useWorkspaceStore.getState().toggleCompare('saffire-i');
    useWorkspaceStore.getState().setSelectedInvestigationId('acme-c-flame');
    expect(useWorkspaceStore.getState().compareList.length).toBe(2);

    render(<SettingsPage />);

    // Clear comparison dock
    const clearCompareBtn = screen.getByTestId('btn-clear-compare');
    fireEvent.click(clearCompareBtn);
    expect(useWorkspaceStore.getState().compareList.length).toBe(0);
    expect(toastStore.getToasts().some((t) => t.title === 'Comparison Dock Cleared')).toBe(true);

    // Reset workspace
    const resetBtn = screen.getByTestId('btn-reset-workspace');
    fireEvent.click(resetBtn);
    expect(useWorkspaceStore.getState().activeScenario.id).toBe('iss-baseline');
    expect(useWorkspaceStore.getState().selectedInvestigationId).toBeNull();
    expect(toastStore.getToasts().some((t) => t.title.includes('Workspace Reset'))).toBe(true);
  });

  it('renders physical computing constants including gravity regimes and LOI limits', () => {
    render(<SettingsPage />);

    // Gravity regimes
    expect(screen.getByText('Microgravity (Quiescent)')).toBeDefined();
    expect(screen.getByText('0.000 g')).toBeDefined();
    expect(screen.getByText('Lunar Surface')).toBeDefined();
    expect(screen.getByText('Martian Surface')).toBeDefined();
    expect(screen.getByText('Terrestrial 1G')).toBeDefined();

    // LOI limits
    expect(screen.getByText('Nomex')).toBeDefined();
    expect(screen.getByText('28.5% O₂')).toBeDefined();
    expect(screen.getByText('PMMA (Acrylic)')).toBeDefined();
    expect(screen.getByText('17.5% O₂')).toBeDefined();

    // Atmospheric test ranges
    expect(screen.getByText('Oxygen Fraction')).toBeDefined();
    expect(screen.getByText('Total Pressure')).toBeDefined();
    expect(screen.getByText('Ventilation Airflow')).toBeDefined();
  });
});
