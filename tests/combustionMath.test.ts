import { describe, it, expect } from 'vitest';
import {
  calculateFlameSphericity,
  calculateFlameElongation,
  calculateSootFraction,
  calculateCoolFlameState,
  calculateFlameSpreadVelocity,
  computeCombustionPhysics,
} from '../src/lib/combustionMath';

describe('combustionMath', () => {
  describe('calculateFlameSphericity', () => {
    it('returns high sphericity (~0.98) in 0g quiescent microgravity', () => {
      const sphericity = calculateFlameSphericity(0, 0);
      expect(sphericity).toBeGreaterThanOrEqual(0.95);
      expect(sphericity).toBeLessThanOrEqual(1.0);
    });

    it('returns low sphericity (<0.35) in 1g terrestrial gravity due to buoyant elongation', () => {
      const sphericity = calculateFlameSphericity(1.0, 0);
      expect(sphericity).toBeLessThanOrEqual(0.35);
      expect(sphericity).toBeGreaterThan(0.1);
    });

    it('decreases sphericity with increasing forced airflow wake stretch', () => {
      const zeroFlow = calculateFlameSphericity(0, 0);
      const highFlow = calculateFlameSphericity(0, 30);
      expect(highFlow).toBeLessThan(zeroFlow);
    });
  });

  describe('calculateFlameElongation', () => {
    it('returns baseline elongation (~1.0) in 0g quiescent environment', () => {
      const elongation = calculateFlameElongation(0, 0);
      expect(elongation).toBeCloseTo(1.0, 1);
    });

    it('returns high elongation (~2.8x) at 1g due to natural convection plume', () => {
      const elongation = calculateFlameElongation(1.0, 0);
      expect(elongation).toBeGreaterThanOrEqual(2.5);
      expect(elongation).toBeLessThanOrEqual(3.2);
    });
  });

  describe('calculateSootFraction', () => {
    it('yields low soot fraction in 0g microgravity (cleaner radical emission)', () => {
      const soot0g = calculateSootFraction(0, 21, 'PMMA');
      const soot1g = calculateSootFraction(1.0, 21, 'PMMA');
      expect(soot0g).toBeLessThan(soot1g);
    });

    it('reflects material soot propensities (e.g. Heptane or Candle Wax vs Nomex)', () => {
      const sootPmma = calculateSootFraction(1.0, 21, 'PMMA');
      const sootWax = calculateSootFraction(1.0, 21, 'candle_wax');
      expect(sootWax).toBeGreaterThanOrEqual(sootPmma);
    });
  });

  describe('calculateCoolFlameState', () => {
    it('identifies cool flame phenomena for n-heptane droplet combustion in 0g', () => {
      const coolState = calculateCoolFlameState(0, 21, 'heptane');
      expect(coolState.isCoolFlamePossible).toBe(true);
      expect(coolState.tempK).toBeLessThanOrEqual(900);
      expect(coolState.tempK).toBeGreaterThanOrEqual(500);
    });

    it('identifies normal hot flame regime for standard PMMA at 21% O2', () => {
      const state = calculateCoolFlameState(1.0, 21, 'PMMA');
      expect(state.isCoolFlamePossible).toBe(false);
      expect(state.tempK).toBeGreaterThan(1200);
    });
  });

  describe('calculateFlameSpreadVelocity', () => {
    it('calculates positive flame spread velocity for PMMA under 21% O2 and moderate flow', () => {
      const res = calculateFlameSpreadVelocity({
        gravity: 0,
        oxygenPct: 21,
        pressurePsi: 14.7,
        airflowVelocity: 5,
        material: 'PMMA',
      });
      expect(res.spreadRateMmS).toBeGreaterThan(0);
      expect(res.isExtinction).toBe(false);
    });

    it('detects extinction when oxygen is below the material LOI', () => {
      const res = calculateFlameSpreadVelocity({
        gravity: 0,
        oxygenPct: 12, // Below PMMA LOI ~17.5%
        pressurePsi: 14.7,
        airflowVelocity: 5,
        material: 'PMMA',
      });
      expect(res.isExtinction).toBe(true);
      expect(res.spreadRateMmS).toBe(0);
    });
  });

  describe('computeCombustionPhysics composite state', () => {
    it('correctly maps 0g ISS scenario parameters to spherical blue flame physical state', () => {
      const state = computeCombustionPhysics({
        environment: 'iss',
        gravity: 0,
        oxygenPct: 21,
        pressurePsi: 14.7,
        material: 'PMMA',
        airflowVelocity: 5,
        name: 'ISS Test',
      });

      expect(state.sphericity).toBeGreaterThan(0.85);
      expect(state.elongation).toBeLessThan(1.5);
      expect(state.flameColorPrimary).toBe('#4CC9F0'); // Cyan 0g glow
      expect(state.isPartialGravityGap).toBe(false);
    });

    it('correctly maps 1g Earth scenario to elongated amber teardrop plume', () => {
      const state = computeCombustionPhysics({
        environment: 'earth',
        gravity: 1.0,
        oxygenPct: 21,
        pressurePsi: 14.7,
        material: 'PMMA',
        airflowVelocity: 0,
        name: 'Earth Test',
      });

      expect(state.sphericity).toBeLessThan(0.35);
      expect(state.elongation).toBeGreaterThanOrEqual(2.5);
      expect(state.flameColorPrimary).toBe('#FFB454'); // Amber 1g plume
      expect(state.isPartialGravityGap).toBe(false);
    });
  });
});
