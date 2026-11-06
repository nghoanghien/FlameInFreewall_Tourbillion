import { INVESTIGATIONS } from '../data/investigations';
import { TEST_RUNS } from '../data/testRuns';
import type {
  Investigation,
  RankedInvestigation,
  ScenarioState,
  TestRun,
} from '../types';

export interface RankingWeights {
  gravityWeight?: number;
  materialWeight?: number;
  oxygenWeight?: number;
  pressureWeight?: number;
  airflowWeight?: number;
}

const DEFAULT_WEIGHTS: Required<RankingWeights> = {
  gravityWeight: 1.0,
  materialWeight: 1.5,
  oxygenWeight: 1.0,
  pressureWeight: 0.8,
  airflowWeight: 0.8,
};

function computeRangeDistance(val: number, [min, max]: [number, number]): number {
  if (val >= min && val <= max) return 0;
  return val < min ? min - val : val - max;
}

function round3(n: number): number {
  return Number(Math.min(Math.max(n, 0), 1).toFixed(3));
}

/**
 * Calculates topical rankings across all NASA PSI investigations for a given scenario.
 * Evaluates similarity based on gravity, material compatibility, oxygen range, pressure, and airflow.
 * Includes strict zero-division protection when weights are zero or missing.
 */
export function calculateTopicalRankings(
  scenario: ScenarioState,
  customWeights?: Partial<RankingWeights>
): RankedInvestigation[] {
  const g = scenario.gravity;
  const o2 = scenario.oxygenPct;
  const p = scenario.pressurePsi;
  const flow = scenario.airflowVelocity;
  const matLower = scenario.material.trim().toLowerCase();

  // Resolve weights with fallback protecting against division by zero
  const rawGravityWeight = customWeights?.gravityWeight ?? DEFAULT_WEIGHTS.gravityWeight;
  const rawMaterialWeight = customWeights?.materialWeight ?? DEFAULT_WEIGHTS.materialWeight;
  const rawOxygenWeight = customWeights?.oxygenWeight ?? DEFAULT_WEIGHTS.oxygenWeight;
  const rawPressureWeight = customWeights?.pressureWeight ?? DEFAULT_WEIGHTS.pressureWeight;
  const rawAirflowWeight = customWeights?.airflowWeight ?? DEFAULT_WEIGHTS.airflowWeight;

  const totalRawWeight =
    rawGravityWeight +
    rawMaterialWeight +
    rawOxygenWeight +
    rawPressureWeight +
    rawAirflowWeight;

  // Fallback to default weights if sum is zero or negative
  const effectiveWeights =
    totalRawWeight <= 0
      ? DEFAULT_WEIGHTS
      : {
          gravityWeight: rawGravityWeight,
          materialWeight: rawMaterialWeight,
          oxygenWeight: rawOxygenWeight,
          pressureWeight: rawPressureWeight,
          airflowWeight: rawAirflowWeight,
        };

  const effectiveWeightSum = Math.max(
    effectiveWeights.gravityWeight +
      effectiveWeights.materialWeight +
      effectiveWeights.oxygenWeight +
      effectiveWeights.pressureWeight +
      effectiveWeights.airflowWeight,
    0.0001
  );

  const scored: RankedInvestigation[] = INVESTIGATIONS.map((inv: Investigation) => {
    // 1. Gravity Score
    const gravDelta = Math.abs(inv.gravityLevelG - g);
    const gravityScore = round3(
      gravDelta === 0 ? 1.0 : Math.max(0.05, 1.0 - gravDelta)
    );

    // 2. Material Score
    let materialScore = 0.15;
    const invMaterials = inv.fuelDetails.materials.map((m) => m.toLowerCase());
    const isDirectMaterialMatch = invMaterials.some(
      (m) => m.includes(matLower) || matLower.includes(m.split(' ')[0])
    );

    if (isDirectMaterialMatch) {
      materialScore = 1.0;
    } else if (
      (scenario.material === 'PMMA' || scenario.material === 'Cotton') &&
      inv.fuelType === 'solid'
    ) {
      materialScore = 0.75;
    } else if (scenario.material === 'Nomex' && (inv.fuelType === 'fabric' || inv.fuelType === 'solid')) {
      materialScore = 0.70;
    } else if (matLower.includes('gas') && inv.fuelType === 'gas') {
      materialScore = 0.80;
    } else if (matLower.includes('droplet') && inv.fuelType === 'droplet') {
      materialScore = 0.85;
    }

    // 3. Oxygen Score
    const o2Dist = computeRangeDistance(o2, inv.oxygenRange);
    const oxygenScore = round3(
      o2Dist === 0 ? 1.0 : Math.max(0.1, 1.0 - o2Dist / 35.0)
    );

    // 4. Pressure Score
    const pDist = computeRangeDistance(p, inv.pressureRangePsi);
    const pressureScore = round3(
      pDist === 0 ? 1.0 : Math.max(0.1, 1.0 - pDist / 10.0)
    );

    // 5. Airflow Score
    const flowDist = computeRangeDistance(flow, inv.flowRangeCmPerSec);
    const airflowScore = round3(
      flowDist === 0 ? 1.0 : Math.max(0.1, 1.0 - flowDist / 40.0)
    );

    // Composite similarity score (0 to 100)
    const weightedSum =
      gravityScore * effectiveWeights.gravityWeight +
      materialScore * effectiveWeights.materialWeight +
      oxygenScore * effectiveWeights.oxygenWeight +
      pressureScore * effectiveWeights.pressureWeight +
      airflowScore * effectiveWeights.airflowWeight;

    const similarityScore = Math.round(
      Math.min(Math.max((weightedSum / effectiveWeightSum) * 100, 0), 100)
    );

    // Find closest test run in TEST_RUNS
    const studyRuns = TEST_RUNS.filter((tr) => tr.investigationId === inv.id);
    let closestRun: TestRun | undefined = undefined;
    let minRunDist = Infinity;

    for (const run of studyRuns) {
      const dist =
        Math.abs(run.conditions.oxygenPct - o2) * 1.0 +
        Math.abs(run.conditions.pressurePsi - p) * 1.5 +
        Math.abs(run.conditions.flowVelocityCmS - flow) * 0.8;

      if (dist < minRunDist) {
        minRunDist = dist;
        closestRun = run;
      }
    }

    // Rationale construction
    let rationale = `${inv.code} is relevant with ${similarityScore}% condition alignment.`;
    if (isDirectMaterialMatch && o2Dist === 0) {
      rationale = `${inv.code} tested ${scenario.material} directly within the ${scenario.oxygenPct}% O₂ mission envelope.`;
    } else if (isDirectMaterialMatch) {
      rationale = `${inv.code} directly tested ${scenario.material}, providing vital material burn rate baselines.`;
    } else if (inv.fuelType === 'solid' && (scenario.material === 'PMMA' || scenario.material === 'Cotton')) {
      rationale = `${inv.code} investigated solid fuel combustion mechanisms applicable to polymer flammability.`;
    }

    return {
      investigation: inv,
      similarityScore,
      rank: 1, // Will be set after sorting
      matchBreakdown: {
        gravityScore,
        materialScore,
        oxygenScore,
        pressureScore,
        airflowScore,
      },
      closestRun,
      rationale,
    };
  });

  // Sort descending by similarityScore, then by investigation code for deterministic stability
  scored.sort((a, b) => {
    if (b.similarityScore !== a.similarityScore) {
      return b.similarityScore - a.similarityScore;
    }
    return a.investigation.code.localeCompare(b.investigation.code);
  });

  // Assign 1-indexed rank
  scored.forEach((item, index) => {
    item.rank = index + 1;
  });

  return scored;
}
