/**
 * FlameGuard AI — NASA Space Apps Challenge: Flame in Freefall
 * Core Domain Interfaces & Global Type Definitions
 */

// ---------------------------------------------------------------------------
// 1. Provenance & Classification Types
// ---------------------------------------------------------------------------

export type EvidenceBadgeType = 'Measured' | 'Modeled' | 'Illustrative';

export type ConfidenceTier = 'A' | 'B';

export type FuelCategory = 'solid' | 'gas' | 'liquid' | 'droplet' | 'fabric';

export type GravityRegime = '0g' | '0.16g' | '0.38g' | '1g' | 'variable';

export type MissionEnvironment = 'iss' | 'lunar' | 'mars' | 'earth' | 'custom';

export type GapMatchStatus = 'MATCH' | 'RELATED' | 'PARTIAL' | 'GAP';

// ---------------------------------------------------------------------------
// 2. NASA PSI Investigation Catalog
// ---------------------------------------------------------------------------

export interface InvestigationFuelDetails {
  materials: string[];
  geometry: string;
  burnerOrSampleSize?: string;
}

export interface InvestigationVariables {
  heldConstant: string[];
  variedAcrossRuns: string[];
}

export interface InvestigationFindings {
  summary: string;
  details: string;
  spaceflightRelevance: string;
  earthApplications: string[];
}

export interface InvestigationDataAvailability {
  inPsi: boolean;
  psiDatasetId: string;
  psiUrl: string;
  runCount: number;
  fileTypes: string[];
}

export interface InvestigationCitation {
  title: string;
  authors: string;
  year: number;
  journalOrConference?: string;
  doi?: string;
}

export interface Investigation {
  id: string; // e.g. 'bass', 'bass-ii', 'acme-c-flame', 'sofie-gel', 'flex'
  code: string; // e.g. 'BASS', 'ACME', 'SoFIE-GEL'
  title: string;
  subtitle: string;
  researchPurpose: string;
  platform: string; // e.g. 'ISS - Microgravity Science Glovebox (MSG)'
  hardware: string; // e.g. 'MSG', 'CIR', 'CIR-ACME', 'CIR-SoFIE'
  yearRange: string;
  primaryInvestigator: string;
  institution?: string;
  fuelType: FuelCategory;
  fuelDetails: InvestigationFuelDetails;
  oxygenRange: [number, number]; // [min%, max%] e.g. [15, 40]
  pressureRangePsi: [number, number]; // [min, max] e.g. [7.0, 14.7]
  flowRangeCmPerSec: [number, number]; // [min, max] e.g. [0, 50]
  gravityLevelG: number; // e.g. 0.0, 1.0
  objectives: string[];
  variables: InvestigationVariables;
  sensors: string[];
  keyFindings: InvestigationFindings;
  dataAvailability: InvestigationDataAvailability;
  badge: EvidenceBadgeType;
  confidence: ConfidenceTier;
  sources: InvestigationCitation[];
  tags: string[];
}

// ---------------------------------------------------------------------------
// 3. Experimental Test Runs & Telemetry
// ---------------------------------------------------------------------------

export interface TestRunConditions {
  oxygenPct: number; // % O2 (e.g. 21.0)
  pressurePsi: number; // psia (e.g. 14.7)
  flowVelocityCmS: number; // cm/s (e.g. 5.0)
  radiantFluxKWPerM2?: number; // radiant heat flux
  ambientTempK?: number; // K
  gravityG: number; // g
}

export interface TestRunMeasurements {
  flameSpreadRateMmS?: number; // mm/s
  quenchingDiameterMm?: number; // mm
  peakTempK?: number; // K
  sootVolumeFraction?: number; // ppm
  burnDurationSec?: number; // s
  extinctionLimitO2Pct?: number; // % O2 limiting threshold
  flameLengthMm?: number;
  flameWidthMm?: number;
  coolFlameObserved?: boolean;
}

export interface TelemetryDataPoint {
  timeSec: number;
  flameRadiusMm: number;
  temperatureK: number;
  sootDensity: number;
}

export interface TestRun {
  id: string; // e.g. 'BASS-RUN-01'
  investigationId: string;
  externalRunKey: string;
  materialType: string;
  sampleGeometry: string;
  gravity: number;
  conditions: TestRunConditions;
  measurements: TestRunMeasurements;
  telemetrySeries?: TelemetryDataPoint[];
  dataStatus: 'Verified' | 'Preliminary' | 'Simulated';
  videoAssetUrl?: string;
  notes?: string;
}

// ---------------------------------------------------------------------------
// 4. Evidence Claims & Provenance
// ---------------------------------------------------------------------------

export type ClaimCategory =
  | 'buoyancy'
  | 'diffusion'
  | 'oxygen_pressure'
  | 'forced_flow'
  | 'partial_gravity'
  | 'cool_flames'
  | 'extinction'
  | 'suppression';

export interface EvidenceClaim {
  id: string; // e.g. 'CLAIM-BASS-01'
  investigationId: string;
  investigationCode: string;
  testRunId?: string;
  category: ClaimCategory;
  claimText: string;
  scientificContext: string;
  evidenceStatus: EvidenceBadgeType;
  reviewStatus: 'Peer-Reviewed' | 'NASA Technical Memo' | 'Conference Proceedings';
  limitation?: string;
  sourceLocator?: string; // e.g. 'Table 2, p. 14'
  doi?: string;
  authors: string;
  year: number;
}

// ---------------------------------------------------------------------------
// 5. Mission Scenarios & Presets
// ---------------------------------------------------------------------------

export interface ScenarioState {
  id?: string;
  name: string;
  environment: MissionEnvironment;
  gravity: number; // 0 to 1.0 (g)
  oxygenPct: number; // 15 to 40 (% O2)
  pressurePsi: number; // 7.0 to 16.0 (psia)
  material: string; // e.g. 'PMMA', 'Nomex', 'Cotton', 'Polyethylene', 'Methane'
  airflowVelocity: number; // 0 to 50 (cm/s)
  description?: string;
}

export interface ScenarioPreset extends ScenarioState {
  id: string;
  subtitle: string;
  badge: EvidenceBadgeType;
  primaryRisk: string;
}

// ---------------------------------------------------------------------------
// 6. Evidence Gap Matrix & Topical Relevance Engine
// ---------------------------------------------------------------------------

export interface DimensionMatch {
  dimension: 'gravity' | 'material' | 'oxygen' | 'pressure' | 'airflow' | 'combined';
  dimensionLabel: string;
  status: GapMatchStatus;
  scenarioValue: string | number;
  benchmarkValue: string;
  explanation: string;
}

export interface GapMatrixResult {
  overallStatus: GapMatchStatus;
  isPartialGravityGap: boolean;
  safetyVerdictNotice: string; // Strict NASA safety guardrail disclaimer
  dimensions: DimensionMatch[];
  matchedRunsCount: number;
  closestInvestigationId?: string;
  extrapolationReason?: string;
}

export interface RankedInvestigation {
  investigation: Investigation;
  similarityScore: number; // 0 to 100
  rank: number;
  matchBreakdown: {
    gravityScore: number; // 0 to 1
    materialScore: number; // 0 to 1
    oxygenScore: number; // 0 to 1
    pressureScore: number; // 0 to 1
    airflowScore: number; // 0 to 1
  };
  closestRun?: TestRun;
  rationale: string;
}

// ---------------------------------------------------------------------------
// 7. Predictive Lab Readiness Audit
// ---------------------------------------------------------------------------

export interface PredictiveLabRequirement {
  id: string;
  code: string; // e.g. 'REQ-01'
  title: string;
  description: string;
  isMet: boolean;
  auditDetail: string;
}

export interface PredictiveLabAudit {
  isLocked: boolean; // Locked when outside applicability domain (e.g. 0 < g < 1)
  lockReason: string;
  modelVersion: string;
  modelApplicabilityDomain: string;
  requirements: PredictiveLabRequirement[];
  predictedSpreadRateMmS?: number;
  uncertaintyBoundMmS?: [number, number];
  disclaimer: string;
}

// ---------------------------------------------------------------------------
// 8. Grounded AI Assistant (RAG Dock)
// ---------------------------------------------------------------------------

export interface AiCitation {
  investigationId: string;
  code: string;
  title: string;
  claimId?: string;
  claimText: string;
  badge: EvidenceBadgeType;
  doi?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  citations?: AiCitation[];
  evidenceGapWarning?: string;
}

// ---------------------------------------------------------------------------
// 9. Toast Notification System
// ---------------------------------------------------------------------------

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}
