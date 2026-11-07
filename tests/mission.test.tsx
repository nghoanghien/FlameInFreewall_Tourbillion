import React, { act } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScenarioConfigForm } from '../src/components/mission/ScenarioConfigForm';
import { ConditionGapMatrix } from '../src/components/mission/ConditionGapMatrix';
import { RankedEvidenceList } from '../src/components/mission/RankedEvidenceList';
import { PredictiveLabPanel } from '../src/components/mission/PredictiveLabPanel';
import MissionPage from '../src/app/(dashboard)/mission/page';
import { useWorkspaceStore, DEFAULT_SCENARIO } from '../src/store/useWorkspaceStore';
import { toastStore } from '../src/components/toast/toast-store';
import { SCENARIO_PRESETS } from '../src/data/presets';
import { evaluateGapMatrix } from '../src/lib/gapMatrixEngine';
import { evaluatePredictiveLab } from '../src/lib/predictiveLabEngine';
import { calculateTopicalRankings } from '../src/lib/rankingEngine';

const mockPush = vi.fn();
let mockSearchParams = new URLSearchParams();

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
  usePathname: () => '/mission',
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => mockSearchParams,
}));

describe('Mission Scenario, Evidence Gap Matrix & Predictive Lab (/mission)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useWorkspaceStore.getState().resetWorkspace();
    toastStore.clear();
    mockSearchParams = new URLSearchParams();
  });

  describe('ScenarioConfigForm Component', () => {
    it('renders planetary presets and interactive configuration controls', () => {
      render(<ScenarioConfigForm />);

      expect(screen.getByTestId('scenario-config-form')).toBeDefined();
      expect(screen.getByTestId('preset-iss-baseline')).toBeDefined();
      expect(screen.getByTestId('preset-artemis-lunar-base')).toBeDefined();
      expect(screen.getByTestId('preset-mars-surface-habitat')).toBeDefined();
      expect(screen.getByTestId('preset-custom-sandbox')).toBeDefined();

      expect(screen.getByTestId('slider-gravity')).toBeDefined();
      expect(screen.getByTestId('slider-oxygen')).toBeDefined();
      expect(screen.getByTestId('slider-pressure')).toBeDefined();
      expect(screen.getByTestId('select-material')).toBeDefined();
      expect(screen.getByTestId('slider-airflow')).toBeDefined();
    });

    it('calculates and displays live Oxygen Partial Pressure (ppO2) telemetry badge', () => {
      // Default: 14.7 psia * 21% = 3.087 psia -> 3.09 psia
      render(<ScenarioConfigForm />);

      const ppo2Badge = screen.getByTestId('badge-ppo2');
      expect(ppo2Badge).toBeDefined();
      expect(ppo2Badge.textContent).toContain('ppO₂: 3.09 psia');
      expect(ppo2Badge.textContent).toContain('Normoxic Alveolar Target');
    });

    it('updates ppO2 telemetry when pressure and oxygen sliders change', () => {
      render(<ScenarioConfigForm />);

      const oxygenSlider = screen.getByTestId('slider-oxygen');
      const pressureSlider = screen.getByTestId('slider-pressure');

      // Set 30% O2 and 10.2 psia (Artemis atmosphere: 10.2 * 0.30 = 3.06 psia)
      act(() => {
        fireEvent.change(oxygenSlider, { target: { value: '30' } });
        fireEvent.change(pressureSlider, { target: { value: '10.2' } });
      });

      const ppo2Badge = screen.getByTestId('badge-ppo2');
      expect(ppo2Badge.textContent).toContain('ppO₂: 3.06 psia');
    });

    it('switches scenario parameters when a planetary preset is selected', () => {
      render(<ScenarioConfigForm />);

      const artemisBtn = screen.getByTestId('preset-artemis-lunar-base');
      act(() => {
        fireEvent.click(artemisBtn);
      });

      const active = useWorkspaceStore.getState().activeScenario;
      expect(active.id).toBe('artemis-lunar-base');
      expect(active.gravity).toBe(0.16);
      expect(active.oxygenPct).toBe(30.0);
      expect(active.pressurePsi).toBe(10.2);

      const marsBtn = screen.getByTestId('preset-mars-surface-habitat');
      act(() => {
        fireEvent.click(marsBtn);
      });

      const activeMars = useWorkspaceStore.getState().activeScenario;
      expect(activeMars.id).toBe('mars-surface-habitat');
      expect(activeMars.gravity).toBe(0.38);
      expect(activeMars.material).toBe('Nomex');
    });

    it('updates material selection via dropdown', () => {
      render(<ScenarioConfigForm />);

      const materialSelect = screen.getByTestId('select-material') as HTMLSelectElement;
      act(() => {
        fireEvent.change(materialSelect, { target: { value: 'Nomex' } });
      });

      expect(useWorkspaceStore.getState().activeScenario.material).toBe('Nomex');
    });

    it('updates gravity and airflow sliders', () => {
      render(<ScenarioConfigForm />);

      const gravitySlider = screen.getByTestId('slider-gravity');
      act(() => {
        fireEvent.change(gravitySlider, { target: { value: '0.16' } });
      });
      expect(useWorkspaceStore.getState().activeScenario.gravity).toBe(0.16);

      const airflowSlider = screen.getByTestId('slider-airflow');
      act(() => {
        fireEvent.change(airflowSlider, { target: { value: '12.5' } });
      });
      expect(useWorkspaceStore.getState().activeScenario.airflowVelocity).toBe(12.5);
    });
  });

  describe('ConditionGapMatrix Component', () => {
    it('audits all 6 dimensions (gravity, material, oxygen, pressure, airflow, combined)', () => {
      render(<ConditionGapMatrix />);

      expect(screen.getByTestId('condition-gap-matrix')).toBeDefined();
      expect(screen.getByTestId('dimension-card-gravity')).toBeDefined();
      expect(screen.getByTestId('dimension-card-material')).toBeDefined();
      expect(screen.getByTestId('dimension-card-oxygen')).toBeDefined();
      expect(screen.getByTestId('dimension-card-pressure')).toBeDefined();
      expect(screen.getByTestId('dimension-card-airflow')).toBeDefined();
      expect(screen.getByTestId('dimension-card-combined')).toBeDefined();
    });

    it('renders MATCH status and matched test runs for ISS baseline scenario', () => {
      render(<ConditionGapMatrix />);

      const overallBadge = screen.getByTestId('badge-overall-status');
      expect(overallBadge.textContent).toContain('OVERALL MATCH');
      expect(overallBadge.className).toContain('bg-lime-50');
      expect(overallBadge.className).toContain('text-lime-900');
      expect(overallBadge.className).not.toContain('emerald');

      const matchedRuns = screen.getByTestId('badge-matched-runs');
      expect(matchedRuns).toBeDefined();

      const gravBadge = screen.getByTestId('badge-dim-gravity');
      expect(gravBadge.textContent).toContain('MATCH');
    });

    it('flags partial gravity gap and displays safety warning when Moon or Mars gravity is set', () => {
      act(() => {
        useWorkspaceStore.getState().setActiveScenario({
          ...DEFAULT_SCENARIO,
          gravity: 0.16,
          name: 'Artemis Moon Base',
        });
      });

      render(<ConditionGapMatrix />);

      const gravBadge = screen.getByTestId('badge-dim-gravity');
      expect(gravBadge.textContent).toContain('GAP');

      const warningBanner = screen.getByTestId('partial-gravity-warning');
      expect(warningBanner).toBeDefined();
      expect(warningBanner.textContent).toContain('NASA Safety Guardrail — Partial Gravity Empirical Gap');
      expect(warningBanner.textContent).toContain('Cannot conclude safe or unsafe');
    });

    it('always displays the mandatory NASA safety guardrail disclaimer', () => {
      render(<ConditionGapMatrix />);

      const disclaimer = screen.getByTestId('nasa-safety-disclaimer');
      expect(disclaimer).toBeDefined();
      expect(disclaimer.textContent).toContain('Mandatory NASA Fire Safety Guardrail');
      expect(disclaimer.textContent).toContain('Cannot conclude safe or unsafe');
    });
  });

  describe('RankedEvidenceList Component', () => {
    it('renders topical investigation rankings with rank numbers and similarity badges', () => {
      render(<RankedEvidenceList />);

      expect(screen.getByTestId('ranked-evidence-list')).toBeDefined();

      // For default ISS PMMA scenario, BASS is top ranked
      const bassCard = screen.getByTestId('ranked-study-card-bass');
      expect(bassCard).toBeDefined();
      expect(bassCard.textContent).toContain('01');
      expect(bassCard.textContent).toContain('BASS');

      const similarityBadge = screen.getByTestId('similarity-badge-bass');
      expect(similarityBadge.textContent).toContain('% Match');
    });

    it('displays closest test run telemetry for top study', () => {
      render(<RankedEvidenceList />);

      const closestRun = screen.getByTestId('closest-run-bass');
      expect(closestRun).toBeDefined();
      expect(closestRun.textContent).toContain('Closest PSI Run:');
      expect(closestRun.textContent).toContain('BASS-RUN-01');
    });

    it('links each ranked study to Explorer with /explorer/[id]', () => {
      render(<RankedEvidenceList />);

      const inspectLink = screen.getByTestId('inspect-study-btn-bass');
      expect(inspectLink).toBeDefined();
      expect(inspectLink.getAttribute('href')).toBe('/explorer/bass');
    });
  });

  describe('PredictiveLabPanel Component', () => {
    it('executes in-bounds predictions for ISS baseline PMMA scenario', () => {
      act(() => {
        useWorkspaceStore.getState().setActiveScenario({ ...DEFAULT_SCENARIO });
      });

      render(<PredictiveLabPanel />);

      expect(screen.getByTestId('predictive-lab-panel')).toBeDefined();

      // Status badge should be online
      const statusBadge = screen.getByTestId('model-status-badge');
      expect(statusBadge.textContent).toContain('MODEL ONLINE / VALIDATED DOMAIN');

      // All 3 readiness requirements must be verified
      expect(screen.getByTestId('readiness-req-req-01').textContent).toContain('VERIFIED');
      expect(screen.getByTestId('readiness-req-req-02').textContent).toContain('VERIFIED');
      expect(screen.getByTestId('readiness-req-req-03').textContent).toContain('VERIFIED');

      // Outputs: spread rate, quench limit, uncertainty bounds
      expect(screen.getByTestId('predicted-spread-rate')).toBeDefined();
      expect(screen.getByTestId('predicted-quench-limit')).toBeDefined();
      expect(screen.getByTestId('predicted-uncertainty-bounds')).toBeDefined();

      const spreadRateText = screen.getByTestId('predicted-spread-rate').textContent;
      expect(spreadRateText).toContain('mm/s');

      const quenchLimitText = screen.getByTestId('predicted-quench-limit').textContent;
      expect(quenchLimitText).toContain('17.5'); // PMMA LOI
    });

    it('locks prediction with DOMAIN OUT OF BOUNDS when partial gravity (0.16g) is selected', () => {
      act(() => {
        useWorkspaceStore.getState().setActiveScenario({
          ...DEFAULT_SCENARIO,
          gravity: 0.16,
          name: 'Artemis Moon Base',
        });
      });

      render(<PredictiveLabPanel />);

      const statusBadge = screen.getByTestId('model-status-badge');
      expect(statusBadge.textContent).toContain('MODEL OFFLINE / DOMAIN OUT OF BOUNDS');

      const lockedCard = screen.getByTestId('predictive-lab-locked-state');
      expect(lockedCard).toBeDefined();
      expect(lockedCard.textContent).toContain('Guarded Execution Locked');
      expect(lockedCard.textContent).toContain('Partial-gravity intermediate buoyancy regimes (0.16g) lack long-duration orbital microgravity test baselines');

      // REQ-01 and REQ-02 should be BLOCKED
      expect(screen.getByTestId('readiness-req-req-01').textContent).toContain('BLOCKED');
      expect(screen.getByTestId('readiness-req-req-02').textContent).toContain('BLOCKED');
    });

    it('locks prediction when material is uncalibrated fabric without model version support', () => {
      act(() => {
        useWorkspaceStore.getState().setActiveScenario({
          ...DEFAULT_SCENARIO,
          material: 'Cotton',
        });
      });

      render(<PredictiveLabPanel />);

      const statusBadge = screen.getByTestId('model-status-badge');
      expect(statusBadge.textContent).toContain('MODEL OFFLINE / DOMAIN OUT OF BOUNDS');

      const lockedCard = screen.getByTestId('predictive-lab-locked-state');
      expect(lockedCard.textContent).toContain('MATERIAL UNCALIBRATED');
    });

    it('triggers onSwitchToEvidence callback when inspect evidence button is clicked in locked state', () => {
      act(() => {
        useWorkspaceStore.getState().setActiveScenario({
          ...DEFAULT_SCENARIO,
          gravity: 0.38,
          name: 'Mars Habitat',
        });
      });

      const onSwitchSpy = vi.fn();
      render(<PredictiveLabPanel onSwitchToEvidence={onSwitchSpy} />);

      const inspectEvidenceBtn = screen.getByTestId('inspect-evidence-cta-btn');
      act(() => {
        fireEvent.click(inspectEvidenceBtn);
      });

      expect(onSwitchSpy).toHaveBeenCalledTimes(1);
    });

    it('displays mandatory predictive safety disclaimer warning', () => {
      render(<PredictiveLabPanel />);

      const disclaimer = screen.getByTestId('predictive-safety-disclaimer');
      expect(disclaimer).toBeDefined();
      expect(disclaimer.textContent).toContain('Never issue operational safe / unsafe certification');
    });
  });

  describe('MissionPage (/mission) Full Assembly', () => {
    it('renders workbench with NASA Evidence Analysis view by default', () => {
      render(<MissionPage />);

      expect(screen.getByTestId('mission-workbench')).toBeDefined();
      expect(screen.getByTestId('scenario-config-form')).toBeDefined();
      expect(screen.getByTestId('evidence-view-container')).toBeDefined();
      expect(screen.getByTestId('condition-gap-matrix')).toBeDefined();
      expect(screen.getByTestId('ranked-evidence-list')).toBeDefined();
      expect(screen.queryByTestId('prediction-view-container')).toBeNull();
    });

    it('switches to Predictive Lab view when tab is clicked', () => {
      render(<MissionPage />);

      const predictionTab = screen.getByTestId('view-tab-prediction');
      act(() => {
        fireEvent.click(predictionTab);
      });

      expect(mockPush).toHaveBeenCalledWith('/mission?view=prediction');
    });

    it('renders Predictive Lab view when view=prediction in searchParams', () => {
      mockSearchParams = new URLSearchParams('view=prediction');
      render(<MissionPage />);

      expect(screen.getByTestId('prediction-view-container')).toBeDefined();
      expect(screen.getByTestId('predictive-lab-panel')).toBeDefined();
      expect(screen.queryByTestId('evidence-view-container')).toBeNull();
    });

    it('preserves scenario state changes when switching between views', () => {
      render(<MissionPage />);

      // Switch preset to Artemis Moon
      const artemisBtn = screen.getByTestId('preset-artemis-lunar-base');
      act(() => {
        fireEvent.click(artemisBtn);
      });

      expect(useWorkspaceStore.getState().activeScenario.gravity).toBe(0.16);

      // Now switch searchParams to prediction
      mockSearchParams = new URLSearchParams('view=prediction');
      render(<MissionPage />);

      // In predictive lab, 0.16g should cause locked state
      expect(screen.getByTestId('predictive-lab-locked-state')).toBeDefined();
      expect(screen.getByTestId('model-status-badge').textContent).toContain('MODEL OFFLINE');
    });
  });

  describe('Mission Scenario Light Theme', () => {
    it('renders scenario configuration and gap matrix with light white cards and badges', () => {
      render(<MissionPage />);
      expect(screen.getAllByText(/Mission Scenario/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Evidence Gap Matrix/i).length).toBeGreaterThan(0);
      expect(screen.getByTestId('mission-workbench')).toBeInTheDocument();
      expect(screen.getByTestId('scenario-config-form')).toBeInTheDocument();
      expect(screen.getByTestId('condition-gap-matrix')).toBeInTheDocument();
      expect(screen.getByTestId('ranked-evidence-list')).toBeInTheDocument();
    });
  });
});
