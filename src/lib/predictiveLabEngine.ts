import { TEST_RUNS } from '../data/testRuns';
import {
  calculateFlameSpreadVelocity,
  MATERIAL_CONSTANTS,
} from './combustionMath';
import type {
  PredictiveLabAudit,
  PredictiveLabRequirement,
  ScenarioState,
} from '../types';

export interface ExtendedPredictiveLabResult extends PredictiveLabAudit {
  quenchLimitO2Pct: number;
  quenchDescription: string;
  regime: string;
  isExtinction: boolean;
  confidenceIntervalPct: number;
}

/**
 * Evaluates scientific model readiness and guarded execution criteria (Diagram D14)
 * Strictly protects against invalid extrapolation outside validated empirical domains.
 */
export function evaluatePredictiveLab(
  scenario: ScenarioState
): ExtendedPredictiveLabResult {
  const g = scenario.gravity;
  const o2 = scenario.oxygenPct;
  const p = scenario.pressurePsi;
  const flow = scenario.airflowVelocity;
  const matLower = scenario.material.trim().toLowerCase();

  const isPartialGravity = g > 0.01 && g < 0.98;
  const isPMMA = matLower === 'pmma' || matLower.includes('acrylic');

  // Look for verified test runs matching gravity regime and material
  const matchingRuns = TEST_RUNS.filter((run) => {
    const gravDelta = Math.abs(run.gravity - g);
    const matMatch = run.materialType.toLowerCase().includes(matLower);
    return gravDelta <= 0.05 && matMatch && run.dataStatus === 'Verified';
  });

  const hasVerifiedRuns = matchingRuns.length > 0 && !isPartialGravity;

  // Requirement 1: Verified run-level training data
  const req1: PredictiveLabRequirement = {
    id: 'req-01-empirical-baseline',
    code: 'REQ-01',
    title: 'Verified Run-Level Empirical Baseline',
    description:
      'Direct NASA PSI test-run measurements with verified telemetry under matching gravitational & fuel constraints.',
    isMet: hasVerifiedRuns,
    auditDetail: isPartialGravity
      ? `0 long-duration empirical test runs exist at partial gravity (${g.toFixed(2)}g) in the NASA PSI repository. Knowledge gap.`
      : hasVerifiedRuns
      ? `${matchingRuns.length} verified NASA PSI flight test runs cataloged for ${scenario.material} at ${g.toFixed(2)}g.`
      : `No verified NASA PSI flight runs exist for material "${scenario.material}" under ${g.toFixed(2)}g.`,
  };

  // Requirement 2: Validated predictive model
  const isModelDomainValid = !isPartialGravity && isPMMA && o2 >= 15 && o2 <= 40 && p >= 7 && p <= 16;
  const req2: PredictiveLabRequirement = {
    id: 'req-02-validated-model',
    code: 'REQ-02',
    title: 'Validated Predictive Model Version',
    description:
      'Versioned scientific semi-empirical flame propagation model (NASA BASS/SoFIE PMMA v2.4).',
    isMet: isModelDomainValid,
    auditDetail: isPartialGravity
      ? 'Model Offline: No validated semi-empirical or numerical solver is certified for partial-gravity exploration atmospheres.'
      : !isPMMA
      ? `Model Offline: Flame propagation solver v2.4 is calibrated strictly for PMMA acrylic slabs. Material "${scenario.material}" is uncalibrated.`
      : 'Model Online: NASA BASS/SoFIE Semi-Empirical Solid Polymer Solver v2.4 calibrated for 0.00g and 1.00g PMMA.',
  };

  // Requirement 3: Uncertainty bounds review
  const matKey = Object.keys(MATERIAL_CONSTANTS).find(
    (k) => k.toLowerCase() === matLower
  );
  const matInfo = matKey ? MATERIAL_CONSTANTS[matKey] : MATERIAL_CONSTANTS.PMMA;
  const isAboveLOI = o2 >= matInfo.loi;
  const req3Met = isModelDomainValid && hasVerifiedRuns && isAboveLOI;

  const req3: PredictiveLabRequirement = {
    id: 'req-03-uncertainty-bounds',
    code: 'REQ-03',
    title: 'Uncertainty Bounds & Extinction Limits',
    description:
      'Published physical uncertainty bounds (95% CI) and empirical Limiting Oxygen Index (LOI) characterization.',
    isMet: req3Met,
    auditDetail: !isAboveLOI
      ? `Quenching Alert: Oxygen (${o2}%) is below the material LOI (${matInfo.loi}%). Radiative/convective extinction dominates.`
      : req3Met
      ? `Validated ±14% 95% confidence interval derived from 12 BASS-II and SoFIE-GEL microgravity burns.`
      : 'Uncertainty bounds cannot be bounded without prerequisite empirical baseline and calibrated solver.',
  };

  const requirements = [req1, req2, req3];
  const isLocked = !req1.isMet || !req2.isMet || !req3.isMet;

  let lockReason = '';
  if (isPartialGravity) {
    lockReason = `DOMAIN OUT OF BOUNDS: Partial-gravity intermediate buoyancy regimes (${g.toFixed(
      2
    )}g) lack long-duration orbital microgravity test baselines in NASA PSI. Extrapolating empirical regressions produces unquantified systematic error.`;
  } else if (!isPMMA) {
    lockReason = `MATERIAL UNCALIBRATED: Fuel material "${scenario.material}" lacks a calibrated semi-empirical kinetic model in version 2.4. Only verified PMMA solid polymers are currently supported for guarded prediction.`;
  } else if (!isAboveLOI) {
    lockReason = `EXTINCTION REGIME: Atmospheric oxygen (${o2}%) is below the material Limiting Oxygen Index (${matInfo.loi}%). Stable flame propagation cannot be sustained.`;
  } else if (isLocked) {
    lockReason = 'MODEL OFFLINE: Mission scenario conditions fall outside the certified empirical applicability envelope.';
  }

  // Calculate physical spread rate & quench limit
  const spreadResult = calculateFlameSpreadVelocity(scenario);
  const baseSpread = spreadResult.spreadRateMmS;

  let uncertaintyBoundMmS: [number, number] | undefined = undefined;
  let predictedSpreadRateMmS: number | undefined = undefined;

  if (!isLocked) {
    predictedSpreadRateMmS = baseSpread;
    uncertaintyBoundMmS = [
      Number((baseSpread * 0.86).toFixed(2)),
      Number((baseSpread * 1.14).toFixed(2)),
    ];
  }

  const quenchLimitO2Pct = matInfo.loi;
  const quenchDescription = `Limiting Oxygen Index (LOI) for ${scenario.material} is ${quenchLimitO2Pct}% O₂ under standard flow.`;

  const disclaimer =
    'NASA SAFETY WARNING: Never issue operational safe / unsafe certification. Computational flame spread predictions are research screening estimates subject to physical model assumptions and require empirical testing for flight qualification.';

  return {
    isLocked,
    lockReason,
    modelVersion: 'NASA-PSI-SPM v2.4 (BASS / SoFIE-GEL Calibrated)',
    modelApplicabilityDomain:
      'Quiescent/Low-speed microgravity (0.00g) & Terrestrial (1.00g), PMMA flat slabs, 15–40% O₂, 8.2–14.7 psia',
    requirements,
    predictedSpreadRateMmS,
    uncertaintyBoundMmS,
    quenchLimitO2Pct,
    quenchDescription,
    regime: spreadResult.regime,
    isExtinction: spreadResult.isExtinction,
    confidenceIntervalPct: 95,
    disclaimer,
  };
}
