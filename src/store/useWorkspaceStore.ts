import { create } from 'zustand';
import type {
  ScenarioState,
  FuelCategory,
  GravityRegime,
  EvidenceBadgeType,
} from '../types';
import { toast } from '../components/toast/toast-store';

export interface WorkspaceFilters {
  search: string;
  fuelCategory: FuelCategory | 'all';
  gravityRegime: GravityRegime | 'all';
  evidenceBadge: EvidenceBadgeType | 'all';
  hardware: string;
}

export const DEFAULT_SCENARIO: ScenarioState = {
  id: 'iss-baseline',
  name: 'ISS Microgravity Baseline',
  environment: 'iss',
  gravity: 0,
  oxygenPct: 21,
  pressurePsi: 14.7,
  material: 'PMMA',
  airflowVelocity: 5,
  description: 'Nominal microgravity cabin atmosphere with low-speed forced ventilation flow.',
};

export const DEFAULT_FILTERS: WorkspaceFilters = {
  search: '',
  fuelCategory: 'all',
  gravityRegime: 'all',
  evidenceBadge: 'all',
  hardware: 'all',
};

export interface WorkspaceStoreState {
  activeScenario: ScenarioState;
  compareList: string[]; // Max 3 items
  selectedInvestigationId: string | null;
  filters: WorkspaceFilters;
  isComparisonModalOpen: boolean;

  // Scenario actions
  setActiveScenario: (scenario: ScenarioState) => void;
  updateActiveScenario: (partial: Partial<ScenarioState>) => void;

  // Comparison actions
  toggleCompare: (investigationId: string) => boolean;
  removeFromCompare: (investigationId: string) => void;
  clearCompare: () => void;
  setComparisonModalOpen: (open: boolean) => void;
  openComparisonModal: () => void;
  closeComparisonModal: () => void;

  // Investigation selection
  setSelectedInvestigationId: (id: string | null) => void;

  // Filters actions
  setFilter: <K extends keyof WorkspaceFilters>(key: K, value: WorkspaceFilters[K]) => void;
  resetFilters: () => void;

  // Global reset
  resetWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceStoreState>((set, get) => ({
  activeScenario: { ...DEFAULT_SCENARIO },
  compareList: [],
  selectedInvestigationId: null,
  filters: { ...DEFAULT_FILTERS },
  isComparisonModalOpen: false,

  setActiveScenario: (scenario) =>
    set({
      activeScenario: scenario,
    }),

  updateActiveScenario: (partial) =>
    set((state) => ({
      activeScenario: { ...state.activeScenario, ...partial },
    })),

  toggleCompare: (investigationId: string) => {
    const { compareList } = get();
    const isAlreadyAdded = compareList.includes(investigationId);

    if (isAlreadyAdded) {
      set({
        compareList: compareList.filter((id) => id !== investigationId),
      });
      return true;
    }

    if (compareList.length >= 3) {
      toast.warning(
        'Maximum 3 investigations can be compared simultaneously',
        'Remove an active study from comparison before adding a new one.'
      );
      return false;
    }

    set({
      compareList: [...compareList, investigationId],
    });
    return true;
  },

  removeFromCompare: (investigationId: string) =>
    set((state) => ({
      compareList: state.compareList.filter((id) => id !== investigationId),
    })),

  clearCompare: () =>
    set({
      compareList: [],
      isComparisonModalOpen: false,
    }),

  setComparisonModalOpen: (open: boolean) =>
    set({
      isComparisonModalOpen: open,
    }),

  openComparisonModal: () =>
    set({
      isComparisonModalOpen: true,
    }),

  closeComparisonModal: () =>
    set({
      isComparisonModalOpen: false,
    }),

  setSelectedInvestigationId: (id: string | null) =>
    set({
      selectedInvestigationId: id,
    }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  resetFilters: () =>
    set({
      filters: { ...DEFAULT_FILTERS },
    }),

  resetWorkspace: () =>
    set({
      activeScenario: { ...DEFAULT_SCENARIO },
      compareList: [],
      selectedInvestigationId: null,
      filters: { ...DEFAULT_FILTERS },
      isComparisonModalOpen: false,
    }),
}));
