import { INVESTIGATIONS } from '../data/investigations';
import { TEST_RUNS } from '../data/testRuns';
import type {
  DimensionMatch,
  GapMatchStatus,
  GapMatrixResult,
  ScenarioState,
} from '../types';
import { calculateTopicalRankings } from './rankingEngine';

/**
 * Known material categories in NASA PSI repository
 */
const KNOWN_MATERIALS = [
  'pmma',
  'acrylic',
  'nomex',
  'cotton',
  'sibal',
  'polyethylene',
  'methane',
  'ethylene',
  'propane',
  'heptane',
  'decane',
  'silicone',
  'teflon',
  'ptfe',
  'kapton',
  'polyimide',
  'cellulose',
  'candle_wax',
  'wax',
];

/**
 * Evaluates the 6-dimension Evidence Gap Matrix for a mission scenario
 * Strictly enforces NASA safety guardrails:
 * - Partial gravity (0 < g < 1) is ALWAYS flagged as GAP or PARTIAL
 * - Never issues a reckless "Safe" verdict
 */
export function evaluateGapMatrix(scenario: ScenarioState): GapMatrixResult {
  const g = scenario.gravity;
  const o2 = scenario.oxygenPct;
  const p = scenario.pressurePsi;
  const flow = scenario.airflowVelocity;
  const matLower = scenario.material.trim().toLowerCase();

  const isPartialGravityGap = g > 0.01 && g < 0.98;

  // 1. Gravity Dimension
  let gravityStatus: GapMatchStatus = 'MATCH';
  let gravityBenchmark = '0.00g (Orbital Microgravity) or 1.00g (Terrestrial)';
  let gravityExplanation =
    'Extensively tested under orbital microgravity in ISS MSG, CIR, and Saffire flight hardware.';

  if (isPartialGravityGap) {
    gravityStatus = 'GAP';
    gravityBenchmark = 'No direct long-duration empirical data exists (0.01g < g < 0.98g)';
    gravityExplanation = `Partial gravity (${g.toFixed(2)}g) lies in NASA PSI's empirical knowledge gap. No long-duration space tests exist at Lunar 0.16g or Mars 0.38g. Only short-duration parabolic/drop-tower analogues or ACME E-Field simulations are available.`;
  } else if (g >= 0.98) {
    gravityBenchmark = '1.00g (Terrestrial Standard)';
    gravityExplanation = 'Matches NASA-STD-6001 sea-level upward and downward flammability certification test conditions.';
  }

  // 2. Material Dimension
  let materialStatus: GapMatchStatus = 'GAP';
  let materialBenchmark = 'NASA PSI Standard Test Materials (PMMA, SIBAL, Nomex, Heptane)';
  let materialExplanation = `Material "${scenario.material}" is not cataloged in the NASA PSI empirical database. Physical flammability cannot be verified without laboratory testing.`;

  const isExactKnown = KNOWN_MATERIALS.some((km) => matLower.includes(km));
  if (isExactKnown) {
    materialStatus = 'MATCH';
    materialBenchmark = `Cataloged in NASA PSI (BASS, SoFIE, Saffire, FLEX)`;
    materialExplanation = `Material "${scenario.material}" has direct empirical test runs and peer-reviewed flammability characterizations in the PSI database.`;
  } else if (matLower.includes('polymer') || matLower.includes('fabric') || matLower.includes('gas')) {
    materialStatus = 'PARTIAL';
    materialBenchmark = 'Analogous material family tested';
    materialExplanation = `General polymer/fabric class is represented in PSI, but specific composition "${scenario.material}" requires verification.`;
  }

  // 3. Oxygen Dimension
  let oxygenStatus: GapMatchStatus = 'MATCH';
  let oxygenBenchmark = '15.0% to 35.0% O₂ (NASA PSI nominal test envelope)';
  let oxygenExplanation = `${o2}% O₂ is within the documented NASA PSI experimental test envelope.`;

  if (o2 < 15.0) {
    oxygenStatus = 'PARTIAL';
    oxygenBenchmark = '15.0%–35.0% O₂';
    oxygenExplanation = `${o2}% O₂ is below nominal PSI investigation ranges; likely below the Limiting Oxygen Index (LOI) leading to quenching.`;
  } else if (o2 > 35.0 && o2 <= 45.0) {
    oxygenStatus = 'PARTIAL';
    oxygenBenchmark = 'Up to 35.0% O₂ in SoFIE-MIST / BASS-II';
    oxygenExplanation = `${o2}% O₂ represents an elevated exploration envelope with limited microgravity test runs.`;
  } else if (o2 > 45.0) {
    oxygenStatus = 'GAP';
    oxygenBenchmark = 'Max 40.0% O₂ in CIR / Glovebox safety constraints';
    oxygenExplanation = `${o2}% O₂ exceeds ISS flight hardware safety limits. Extravehicular suit atmospheres (100% O₂) rely on terrestrial chamber test extrapolations.`;
  }

  // 4. Pressure Dimension
  let pressureStatus: GapMatchStatus = 'MATCH';
  let pressureBenchmark = '8.2 to 14.7 psia (Nominal ISS & Exploration Atmosphere standards)';
  let pressureExplanation = `${p} psia matches standard pressurized cabin or exploration habitat baseline pressures.`;

  if (p < 8.2) {
    pressureStatus = 'PARTIAL';
    pressureBenchmark = '8.2–14.7 psia (Saffire / SoFIE Exploration baseline)';
    pressureExplanation = `${p} psia is in the low-pressure regime; gas-phase kinetic residence times and flame standoff distances expand significantly.`;
  } else if (p > 15.0) {
    pressureStatus = 'GAP';
    pressureBenchmark = 'Max 14.7 psia ISS cabin pressure';
    pressureExplanation = `${p} psia hyperbaric conditions exceed standard NASA PSI spacecraft flight test parameters.`;
  }

  // 5. Airflow Dimension
  let airflowStatus: GapMatchStatus = 'MATCH';
  let airflowBenchmark = '0 to 30 cm/s (ISS cabin ventilation & flow tunnel envelope)';
  let airflowExplanation = `${flow} cm/s is within the well-characterized microgravity forced-flow regime.`;

  if (flow > 30 && flow <= 45) {
    airflowStatus = 'RELATED';
    airflowBenchmark = '0–30 cm/s nominal';
    airflowExplanation = `${flow} cm/s approaches convective blowoff limits mapped in BASS and SoFIE-RT10.`;
  } else if (flow > 45) {
    airflowStatus = 'GAP';
    airflowBenchmark = 'Max 40 cm/s flow duct velocity';
    airflowExplanation = `${flow} cm/s exceeds standard microgravity flow duct test limits and risks complete convective extinction.`;
  }

  // 6. Combined Dimension
  let combinedStatus: GapMatchStatus = 'MATCH';
  if (
    gravityStatus === 'GAP' ||
    materialStatus === 'GAP' ||
    oxygenStatus === 'GAP' ||
    pressureStatus === 'GAP' ||
    airflowStatus === 'GAP'
  ) {
    combinedStatus = 'GAP';
  } else if (
    materialStatus === 'PARTIAL' ||
    oxygenStatus === 'PARTIAL' ||
    pressureStatus === 'PARTIAL'
  ) {
    combinedStatus = 'PARTIAL';
  } else if (airflowStatus === 'RELATED') {
    combinedStatus = 'RELATED';
  }

  const dimensions: DimensionMatch[] = [
    {
      dimension: 'gravity',
      dimensionLabel: 'Gravity Regime',
      status: gravityStatus,
      scenarioValue: `${g.toFixed(2)}g`,
      benchmarkValue: gravityBenchmark,
      explanation: gravityExplanation,
    },
    {
      dimension: 'material',
      dimensionLabel: 'Fuel Material',
      status: materialStatus,
      scenarioValue: scenario.material,
      benchmarkValue: materialBenchmark,
      explanation: materialExplanation,
    },
    {
      dimension: 'oxygen',
      dimensionLabel: 'Oxygen Concentration',
      status: oxygenStatus,
      scenarioValue: `${o2}% O₂`,
      benchmarkValue: oxygenBenchmark,
      explanation: oxygenExplanation,
    },
    {
      dimension: 'pressure',
      dimensionLabel: 'Total Pressure',
      status: pressureStatus,
      scenarioValue: `${p} psia`,
      benchmarkValue: pressureBenchmark,
      explanation: pressureExplanation,
    },
    {
      dimension: 'airflow',
      dimensionLabel: 'Forced Ventilation',
      status: airflowStatus,
      scenarioValue: `${flow} cm/s`,
      benchmarkValue: airflowBenchmark,
      explanation: airflowExplanation,
    },
    {
      dimension: 'combined',
      dimensionLabel: 'Combined Envelope Coverage',
      status: combinedStatus,
      scenarioValue: `${g.toFixed(2)}g | ${o2}% O₂ | ${scenario.material}`,
      benchmarkValue: 'NASA PSI Empirical Verification Standard',
      explanation:
        combinedStatus === 'GAP'
          ? 'One or more scenario parameters fall outside the verified NASA PSI experimental database.'
          : combinedStatus === 'PARTIAL'
            ? 'Scenario relies on partial analogues or boundary interpolations.'
            : 'Conditions map directly to validated NASA PSI investigations.',
    },
  ];

  // Overall status
  const overallStatus: GapMatchStatus = combinedStatus;

  // Strict NASA safety guardrail disclaimer
  let safetyVerdictNotice =
    'NASA SAFETY PROTOCOL: Cannot conclude safe or unsafe — Empirical NASA PSI tests under exact habitat conditions are required.';
  if (isPartialGravityGap) {
    safetyVerdictNotice =
      'NASA SAFETY GUARDRAIL: Cannot conclude safe or unsafe — Empirical NASA PSI tests under exact habitat conditions are required. Partial gravity (0 < g < 1) represents an empirical knowledge gap between orbital microgravity and terrestrial 1g.';
  } else if (materialStatus === 'GAP') {
    safetyVerdictNotice =
      `NASA SAFETY GUARDRAIL: Cannot conclude safe or unsafe — Empirical NASA PSI tests under exact habitat conditions are required. Material "${scenario.material}" is unverified in microgravity.`;
  }

  // Count matching test runs in TEST_RUNS
  const matchedRuns = TEST_RUNS.filter((run) => {
    const gravMatch = Math.abs(run.gravity - g) < 0.05;
    const matMatch =
      isExactKnown &&
      (run.materialType.toLowerCase().includes(matLower) ||
        matLower.includes(run.materialType.toLowerCase()));
    const o2Match = Math.abs(run.conditions.oxygenPct - o2) <= 5.0;
    return gravMatch && matMatch && o2Match;
  });

  // Calculate closest investigation
  const rankings = calculateTopicalRankings(scenario);
  const closestInvestigationId = rankings[0]?.investigation.id || INVESTIGATIONS[0]?.id;

  let extrapolationReason: string | undefined = undefined;
  if (overallStatus !== 'MATCH') {
    extrapolationReason = dimensions
      .filter((d) => d.status === 'GAP' || d.status === 'PARTIAL')
      .map((d) => `${d.dimensionLabel}: ${d.explanation}`)
      .join(' | ');
  }

  return {
    overallStatus,
    isPartialGravityGap,
    safetyVerdictNotice,
    dimensions,
    matchedRunsCount: matchedRuns.length,
    closestInvestigationId,
    extrapolationReason,
  };
}
