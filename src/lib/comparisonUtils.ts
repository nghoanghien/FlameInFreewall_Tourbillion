import type { Investigation, TestRun } from '../types';
import { TEST_RUNS } from '../data/testRuns';

export interface StudyComparisonMetrics {
  study: Investigation;
  verifiedRunCount: number;
  totalRunCount: number;
  flameSpreadVelocityDisplay: string;
  flameSpreadVelocityMmS: number | null;
  quenchDiameterDisplay: string;
  quenchDiameterMm: number | null;
  o2MinPct: number;
  o2MaxPct: number;
  o2RangeDisplay: string;
  pressureMinPsi: number;
  pressureMaxPsi: number;
  pressureRangeDisplay: string;
  flowRangeDisplay: string;
  fuelSummary: string;
  facilitySummary: string;
}

export interface ComparisonDeltaSummary {
  o2OverallMin: number;
  o2OverallMax: number;
  o2SpanDelta: number;
  uniqueFuelTypes: string[];
  isMixedFuel: boolean;
  quenchMin: number | null;
  quenchMax: number | null;
  quenchDelta: number | null;
  spreadMin: number | null;
  spreadMax: number | null;
  spreadRatio: number | null;
}

export interface StudyHighlightFlags {
  isHighestO2: boolean;
  isLowestO2Moc: boolean;
  isHighestPressure: boolean;
  isLowestPressure: boolean;
  isFastestSpread: boolean;
  isNarrowestQuench: boolean;
  isUniqueFuel: boolean;
}

/**
 * Computes metrics and aggregated values for an investigation.
 */
export function getStudyMetrics(
  study: Investigation,
  runs: TestRun[] = TEST_RUNS
): StudyComparisonMetrics {
  const studyRuns = runs.filter((r) => r.investigationId === study.id);
  const verifiedRuns = studyRuns.filter((r) => r.dataStatus === 'Verified');
  const verifiedCount =
    verifiedRuns.length > 0 ? verifiedRuns.length : study.dataAvailability.runCount;
  const totalCount =
    studyRuns.length > 0 ? studyRuns.length : study.dataAvailability.runCount;

  // Flame spread velocities
  const spreadValues = studyRuns
    .map((r) => r.measurements?.flameSpreadRateMmS)
    .filter((v): v is number => typeof v === 'number' && !Number.isNaN(v));

  let flameSpreadVelocityDisplay = 'N/A';
  let flameSpreadVelocityMmS: number | null = null;
  if (spreadValues.length > 0) {
    const minSpread = Math.min(...spreadValues);
    const maxSpread = Math.max(...spreadValues);
    flameSpreadVelocityMmS =
      spreadValues.reduce((sum, val) => sum + val, 0) / spreadValues.length;
    flameSpreadVelocityDisplay =
      minSpread === maxSpread
        ? `${minSpread.toFixed(2)} mm/s`
        : `${minSpread.toFixed(2)} – ${maxSpread.toFixed(2)} mm/s`;
  }

  // Quenching diameters
  const quenchValues = studyRuns
    .map((r) => r.measurements?.quenchingDiameterMm)
    .filter((v): v is number => typeof v === 'number' && !Number.isNaN(v));

  let quenchDiameterDisplay = 'N/A';
  let quenchDiameterMm: number | null = null;
  if (quenchValues.length > 0) {
    const minQuench = Math.min(...quenchValues);
    const maxQuench = Math.max(...quenchValues);
    quenchDiameterMm =
      quenchValues.reduce((sum, val) => sum + val, 0) / quenchValues.length;
    quenchDiameterDisplay =
      minQuench === maxQuench
        ? `${minQuench.toFixed(1)} mm`
        : `${minQuench.toFixed(1)} – ${maxQuench.toFixed(1)} mm`;
  }

  const o2MinPct = study.oxygenRange[0];
  const o2MaxPct = study.oxygenRange[1];
  const o2RangeDisplay = `${o2MinPct}% – ${o2MaxPct}% O₂`;

  const pressureMinPsi = study.pressureRangePsi[0];
  const pressureMaxPsi = study.pressureRangePsi[1];
  const pressureRangeDisplay = `${pressureMinPsi} – ${pressureMaxPsi} psia`;

  const flowRangeDisplay = `${study.flowRangeCmPerSec[0]} – ${study.flowRangeCmPerSec[1]} cm/s`;

  const materialsSnippet = study.fuelDetails.materials.slice(0, 2).join(', ');
  const fuelSummary = `${study.fuelType.toUpperCase()}${materialsSnippet ? ` (${materialsSnippet})` : ''}`;

  const platformSnippet = study.platform.split('-')[0].trim();
  const facilitySummary = `${study.hardware} · ${platformSnippet}`;

  return {
    study,
    verifiedRunCount: verifiedCount,
    totalRunCount: totalCount,
    flameSpreadVelocityDisplay,
    flameSpreadVelocityMmS,
    quenchDiameterDisplay,
    quenchDiameterMm,
    o2MinPct,
    o2MaxPct,
    o2RangeDisplay,
    pressureMinPsi,
    pressureMaxPsi,
    pressureRangeDisplay,
    flowRangeDisplay,
    fuelSummary,
    facilitySummary,
  };
}

/**
 * Calculates global comparative deltas across 2-3 studies.
 */
export function calculateComparisonDeltas(
  studies: Investigation[],
  runs: TestRun[] = TEST_RUNS
): ComparisonDeltaSummary {
  if (studies.length === 0) {
    return {
      o2OverallMin: 0,
      o2OverallMax: 0,
      o2SpanDelta: 0,
      uniqueFuelTypes: [],
      isMixedFuel: false,
      quenchMin: null,
      quenchMax: null,
      quenchDelta: null,
      spreadMin: null,
      spreadMax: null,
      spreadRatio: null,
    };
  }

  const o2OverallMin = Math.min(...studies.map((s) => s.oxygenRange[0]));
  const o2OverallMax = Math.max(...studies.map((s) => s.oxygenRange[1]));
  const o2SpanDelta = Number((o2OverallMax - o2OverallMin).toFixed(1));

  const uniqueFuelTypes = Array.from(new Set(studies.map((s) => s.fuelType)));
  const isMixedFuel = uniqueFuelTypes.length > 1;

  const metricsList = studies.map((s) => getStudyMetrics(s, runs));

  const validQuench = metricsList
    .map((m) => m.quenchDiameterMm)
    .filter((v): v is number => v !== null);
  const quenchMin = validQuench.length > 0 ? Math.min(...validQuench) : null;
  const quenchMax = validQuench.length > 0 ? Math.max(...validQuench) : null;
  const quenchDelta =
    quenchMin !== null && quenchMax !== null
      ? Number((quenchMax - quenchMin).toFixed(2))
      : null;

  const validSpread = metricsList
    .map((m) => m.flameSpreadVelocityMmS)
    .filter((v): v is number => v !== null);
  const spreadMin = validSpread.length > 0 ? Math.min(...validSpread) : null;
  const spreadMax = validSpread.length > 0 ? Math.max(...validSpread) : null;
  const spreadRatio =
    spreadMin !== null && spreadMax !== null && spreadMin > 0
      ? Number((spreadMax / spreadMin).toFixed(1))
      : null;

  return {
    o2OverallMin,
    o2OverallMax,
    o2SpanDelta,
    uniqueFuelTypes,
    isMixedFuel,
    quenchMin,
    quenchMax,
    quenchDelta,
    spreadMin,
    spreadMax,
    spreadRatio,
  };
}

/**
 * Computes study-specific highlight flags against peers.
 */
export function getStudyHighlightFlags(
  targetStudy: Investigation,
  allStudies: Investigation[],
  runs: TestRun[] = TEST_RUNS
): StudyHighlightFlags {
  if (allStudies.length <= 1) {
    return {
      isHighestO2: false,
      isLowestO2Moc: false,
      isHighestPressure: false,
      isLowestPressure: false,
      isFastestSpread: false,
      isNarrowestQuench: false,
      isUniqueFuel: false,
    };
  }

  const allMetrics = allStudies.map((s) => getStudyMetrics(s, runs));
  const targetMetrics = getStudyMetrics(targetStudy, runs);
  const maxO2 = Math.max(...allStudies.map((s) => s.oxygenRange[1]));
  const minO2Moc = Math.min(...allStudies.map((s) => s.oxygenRange[0]));
  const maxPressure = Math.max(...allStudies.map((s) => s.pressureRangePsi[1]));
  const minPressure = Math.min(...allStudies.map((s) => s.pressureRangePsi[0]));

  const validSpreads = allMetrics
    .map((m) => m.flameSpreadVelocityMmS)
    .filter((v): v is number => v !== null);
  const maxSpread = validSpreads.length > 0 ? Math.max(...validSpreads) : null;

  const validQuench = allMetrics
    .map((m) => m.quenchDiameterMm)
    .filter((v): v is number => v !== null);
  const minQuench = validQuench.length > 0 ? Math.min(...validQuench) : null;

  const peerFuels = allStudies
    .filter((s) => s.id !== targetStudy.id)
    .map((s) => s.fuelType);

  return {
    isHighestO2: targetStudy.oxygenRange[1] === maxO2 && maxO2 > minO2Moc,
    isLowestO2Moc: targetStudy.oxygenRange[0] === minO2Moc && maxO2 > minO2Moc,
    isHighestPressure:
      targetStudy.pressureRangePsi[1] === maxPressure && maxPressure > minPressure,
    isLowestPressure:
      targetStudy.pressureRangePsi[0] === minPressure && maxPressure > minPressure,
    isFastestSpread:
      targetMetrics.flameSpreadVelocityMmS !== null &&
      maxSpread !== null &&
      targetMetrics.flameSpreadVelocityMmS === maxSpread &&
      validSpreads.length > 1,
    isNarrowestQuench:
      targetMetrics.quenchDiameterMm !== null &&
      minQuench !== null &&
      targetMetrics.quenchDiameterMm === minQuench &&
      validQuench.length > 1,
    isUniqueFuel: !peerFuels.includes(targetStudy.fuelType),
  };
}

function escapeCsvCell(val: string | number | boolean | null | undefined): string {
  if (val === null || val === undefined) return '""';
  return `"${String(val).replace(/"/g, '""')}"`;
}

export function generateComparisonCsv(
  studies: Investigation[],
  runs: TestRun[] = TEST_RUNS
): string {
  const metricsList = studies.map((s) => getStudyMetrics(s, runs));
  const headers = ['Parameter', ...studies.map((s) => s.code)];
  const rows: Array<[string, ...(string | number | null)[]]> = [
    ['Investigation Code', ...studies.map((s) => s.code)],
    ['Investigation Title', ...studies.map((s) => s.title)],
    ['Primary Investigator', ...studies.map((s) => s.primaryInvestigator)],
    ['Institution', ...studies.map((s) => s.institution || 'NASA GRC')],
    ['Facility Hardware', ...studies.map((s) => s.hardware)],
    ['Flight Platform', ...studies.map((s) => s.platform)],
    ['Year Range', ...studies.map((s) => s.yearRange)],
    ['Fuel Category', ...studies.map((s) => s.fuelType.toUpperCase())],
    ['Primary Materials', ...studies.map((s) => s.fuelDetails.materials.join('; '))],
    ['Chamber Oxygen Limits', ...metricsList.map((m) => m.o2RangeDisplay)],
    ['Pressure Envelope', ...metricsList.map((m) => m.pressureRangeDisplay)],
    ['Flow Velocity Range', ...metricsList.map((m) => m.flowRangeDisplay)],
    ['Mean Quench Diameter', ...metricsList.map((m) => m.quenchDiameterDisplay)],
    ['Flame Spread Velocity', ...metricsList.map((m) => m.flameSpreadVelocityDisplay)],
    ['Verified Test Runs', ...metricsList.map((m) => m.verifiedRunCount)],
    ['Confidence Tier', ...studies.map((s) => `Tier ${s.confidence}`)],
    ['Evidence Badge', ...studies.map((s) => s.badge)],
    ['NASA PSI Dataset URL', ...studies.map((s) => s.dataAvailability.psiUrl)],
  ];

  return [
    headers.map(escapeCsvCell).join(','),
    ...rows.map((row) => row.map(escapeCsvCell).join(',')),
  ].join('\r\n');
}
