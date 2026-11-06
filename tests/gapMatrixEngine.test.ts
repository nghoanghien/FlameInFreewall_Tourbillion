import { describe, it, expect } from 'vitest';
import { evaluateGapMatrix } from '../src/lib/gapMatrixEngine';
import { calculateTopicalRankings } from '../src/lib/rankingEngine';
import type { ScenarioState } from '../src/types';

describe('gapMatrixEngine', () => {
  it('detects GAP and flags partial-gravity guardrail for Artemis Lunar 0.16g scenario', () => {
    const lunarScenario: ScenarioState = {
      name: 'Artemis Lunar Base',
      environment: 'lunar',
      gravity: 0.16,
      oxygenPct: 30,
      pressurePsi: 10.2,
      material: 'PMMA',
      airflowVelocity: 8,
    };

    const result = evaluateGapMatrix(lunarScenario);

    expect(result.isPartialGravityGap).toBe(true);
    expect(['GAP', 'PARTIAL']).toContain(result.overallStatus);
    expect(result.overallStatus).not.toBe('MATCH');

    // Strict NASA safety guardrail notice
    expect(result.safetyVerdictNotice.toLowerCase()).toContain('cannot conclude safe');
    expect(result.safetyVerdictNotice.toLowerCase()).toContain('empirical');

    // Gravity dimension match
    const gravDim = result.dimensions.find((d) => d.dimension === 'gravity');
    expect(gravDim).toBeDefined();
    expect(['GAP', 'PARTIAL']).toContain(gravDim?.status);
  });

  it('detects GAP and flags partial-gravity guardrail for Mars 0.38g habitat', () => {
    const marsScenario: ScenarioState = {
      name: 'Mars Surface Habitat',
      environment: 'mars',
      gravity: 0.38,
      oxygenPct: 28,
      pressurePsi: 8.2,
      material: 'Nomex',
      airflowVelocity: 10,
    };

    const result = evaluateGapMatrix(marsScenario);

    expect(result.isPartialGravityGap).toBe(true);
    expect(['GAP', 'PARTIAL']).toContain(result.overallStatus);
    expect(result.overallStatus).not.toBe('MATCH');
  });

  it('evaluates ISS 0.0g PMMA baseline without flagging partial-gravity gap', () => {
    const issScenario: ScenarioState = {
      name: 'ISS US Lab Baseline',
      environment: 'iss',
      gravity: 0.0,
      oxygenPct: 21,
      pressurePsi: 14.7,
      material: 'PMMA',
      airflowVelocity: 5,
    };

    const result = evaluateGapMatrix(issScenario);

    expect(result.isPartialGravityGap).toBe(false);
    expect(result.dimensions.length).toBeGreaterThanOrEqual(5);

    const gravDim = result.dimensions.find((d) => d.dimension === 'gravity');
    expect(gravDim?.status).toBe('MATCH');
  });

  it('flags material GAP for unstudied novel materials', () => {
    const unknownMaterialScenario: ScenarioState = {
      name: 'Novel Composite Test',
      environment: 'iss',
      gravity: 0.0,
      oxygenPct: 21,
      pressurePsi: 14.7,
      material: 'UnknownSyntheticX_9000',
      airflowVelocity: 5,
    };

    const result = evaluateGapMatrix(unknownMaterialScenario);

    const matDim = result.dimensions.find((d) => d.dimension === 'material');
    expect(matDim?.status).toBe('GAP');
    expect(result.overallStatus).toBe('GAP');
  });
});

describe('rankingEngine', () => {
  const sampleScenario: ScenarioState = {
    name: 'ISS Microgravity Baseline',
    environment: 'iss',
    gravity: 0.0,
    oxygenPct: 21,
    pressurePsi: 14.7,
    material: 'PMMA',
    airflowVelocity: 5,
  };

  it('calculates topical rankings returning sorted ranked investigations', () => {
    const rankings = calculateTopicalRankings(sampleScenario);

    expect(rankings.length).toBeGreaterThan(0);
    expect(rankings[0].rank).toBe(1);

    // Verify descending order
    for (let i = 0; i < rankings.length - 1; i++) {
      expect(rankings[i].similarityScore).toBeGreaterThanOrEqual(
        rankings[i + 1].similarityScore
      );
      expect(rankings[i + 1].rank).toBe(i + 2);
    }
  });

  it('safely handles zero or empty weights with fallback preventing NaN or division by zero', () => {
    const zeroWeights = {
      gravityWeight: 0,
      materialWeight: 0,
      oxygenWeight: 0,
      pressureWeight: 0,
      airflowWeight: 0,
    };

    const rankings = calculateTopicalRankings(sampleScenario, zeroWeights);

    expect(rankings.length).toBeGreaterThan(0);
    for (const item of rankings) {
      expect(Number.isNaN(item.similarityScore)).toBe(false);
      expect(item.similarityScore).toBeGreaterThanOrEqual(0);
      expect(item.similarityScore).toBeLessThanOrEqual(100);
    }
  });

  it('ranks solid polymer studies like BASS highly for PMMA scenario', () => {
    const rankings = calculateTopicalRankings(sampleScenario);
    const topCodes = rankings.slice(0, 5).map((r) => r.investigation.code);

    // At least one of BASS, BASS-II, SoFIE-GEL, SoFIE-MIST should be in top 5
    const hasSolidPolymerStudy = topCodes.some((code) =>
      ['BASS', 'BASS-II', 'SOFIE-GEL', 'SOFIE-MIST', 'SoFIE-GEL', 'SoFIE-MIST'].includes(code)
    );
    expect(hasSolidPolymerStudy).toBe(true);
  });
});
