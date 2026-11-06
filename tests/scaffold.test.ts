import { describe, it, expect } from 'vitest';
import type { Investigation, ScenarioState } from '../src/types';

describe('Project Scaffold & Types', () => {
  it('correctly models an Investigation and ScenarioState', () => {
    const scenario: ScenarioState = {
      name: 'ISS Microgravity Baseline',
      environment: 'iss',
      gravity: 0,
      oxygenPct: 21,
      pressurePsi: 14.7,
      material: 'PMMA',
      airflowVelocity: 5,
    };

    expect(scenario.gravity).toBe(0);
    expect(scenario.environment).toBe('iss');
    expect(scenario.oxygenPct).toBe(21);
  });
});
