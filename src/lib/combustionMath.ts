import type { ScenarioState } from '../types';

export const MATERIAL_CONSTANTS: Record<
  string,
  {
    sootFactor: number;
    loi: number; // Limiting Oxygen Index (% O2)
    baseSpreadMmS: number;
  }
> = {
  PMMA: { sootFactor: 0.72, loi: 17.5, baseSpreadMmS: 0.85 },
  pmma: { sootFactor: 0.72, loi: 17.5, baseSpreadMmS: 0.85 },
  Nomex: { sootFactor: 0.55, loi: 28.5, baseSpreadMmS: 0.65 },
  nomex: { sootFactor: 0.55, loi: 28.5, baseSpreadMmS: 0.65 },
  Cotton: { sootFactor: 0.65, loi: 18.0, baseSpreadMmS: 1.25 },
  cotton: { sootFactor: 0.65, loi: 18.0, baseSpreadMmS: 1.25 },
  Polyethylene: { sootFactor: 0.78, loi: 17.0, baseSpreadMmS: 1.40 },
  polyethylene: { sootFactor: 0.78, loi: 17.0, baseSpreadMmS: 1.40 },
  heptane: { sootFactor: 0.48, loi: 14.5, baseSpreadMmS: 0.0 },
  Heptane: { sootFactor: 0.48, loi: 14.5, baseSpreadMmS: 0.0 },
  candle_wax: { sootFactor: 0.88, loi: 16.5, baseSpreadMmS: 0.5 },
  Methane: { sootFactor: 0.35, loi: 12.0, baseSpreadMmS: 0.0 },
  methane: { sootFactor: 0.35, loi: 12.0, baseSpreadMmS: 0.0 },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates microgravity flame sphericity (0.15 to 0.98)
 * Approaches ~0.98 in quiescent 0g and drops to <0.35 in terrestrial 1g.
 */
export function calculateFlameSphericity(gravity: number, airflowVelocity: number = 0): number {
  const g = clamp(gravity, 0.0, 1.0);
  const flow = clamp(airflowVelocity, 0.0, 50.0);
  const wakeStretch = clamp((flow / 50.0) * 0.45, 0.0, 0.45);
  return Number(clamp(1.0 - 0.75 * g - wakeStretch * 0.35, 0.15, 0.98).toFixed(3));
}

/**
 * Calculates buoyancy-driven flame elongation (1.0x to 3.0x)
 * 1.0x at quiescent 0g, ~2.8x at 1g buoyant plume.
 */
export function calculateFlameElongation(gravity: number, airflowVelocity: number = 0): number {
  const g = clamp(gravity, 0.0, 1.0);
  const flow = clamp(airflowVelocity, 0.0, 50.0);
  const wakeStretch = clamp((flow / 50.0) * 0.45, 0.0, 0.45);
  return Number((1.0 + 1.8 * g + wakeStretch * (1.0 - 0.5 * g)).toFixed(3));
}

/**
 * Calculates soot volume fraction / soot ratio (0.05 to 1.0)
 * Scaled by gravitational buoyant residence time and oxygen concentration.
 */
export function calculateSootFraction(
  gravity: number,
  oxygenPct: number = 21,
  material: string = 'PMMA'
): number {
  const g = clamp(gravity, 0.0, 1.0);
  const o2 = clamp(oxygenPct, 15, 100);
  const matKey = Object.keys(MATERIAL_CONSTANTS).find(
    (k) => k.toLowerCase() === material.toLowerCase()
  );
  const sootFactor = matKey ? MATERIAL_CONSTANTS[matKey].sootFactor : 0.70;

  const buoyancyDrive = 0.14 + 0.86 * g;
  const oxygenCleanFactor = clamp(1.12 - (o2 - 21) * 0.006, 0.45, 1.15);

  return Number(clamp(sootFactor * buoyancyDrive * oxygenCleanFactor, 0.05, 1.0).toFixed(3));
}

/**
 * Evaluates whether low-temperature cool-flame phenomena can occur
 * Characterized by 500-800 K temperatures and dim formaldehyde chemiluminescence.
 */
export function calculateCoolFlameState(
  gravity: number,
  oxygenPct: number,
  material: string
): { isCoolFlamePossible: boolean; visibility: number; tempK: number } {
  const g = clamp(gravity, 0.0, 1.0);
  const matLower = material.toLowerCase();
  const isAlkaneOrDroplet =
    matLower.includes('heptane') || matLower.includes('decane') || matLower.includes('droplet');

  const isCoolFlamePossible = g <= 0.05 && (isAlkaneOrDroplet || oxygenPct <= 18);

  if (isCoolFlamePossible) {
    const tempK = isAlkaneOrDroplet ? 680 : 740;
    return {
      isCoolFlamePossible: true,
      visibility: 0.38,
      tempK,
    };
  }

  // Hot flame peak temperature
  const tempK = Math.round(
    clamp(1420 + (oxygenPct - 21) * 14.5 + g * 340, 1200, 2680)
  );

  return {
    isCoolFlamePossible: false,
    visibility: 1.0,
    tempK,
  };
}

/**
 * Computes deterministic flame spread velocity across solid/condensed fuel
 * Follows Damköhler number and LOI threshold criteria.
 */
export function calculateFlameSpreadVelocity(scenario: {
  gravity: number;
  oxygenPct: number;
  pressurePsi: number;
  airflowVelocity: number;
  material: string;
}): { spreadRateMmS: number; regime: string; isExtinction: boolean } {
  const { gravity, oxygenPct, pressurePsi, airflowVelocity, material } = scenario;
  const g = clamp(gravity, 0.0, 1.0);
  const o2 = clamp(oxygenPct, 0, 100);
  const flow = clamp(airflowVelocity, 0, 100);

  const matKey = Object.keys(MATERIAL_CONSTANTS).find(
    (k) => k.toLowerCase() === material.toLowerCase()
  );
  const matInfo = matKey ? MATERIAL_CONSTANTS[matKey] : MATERIAL_CONSTANTS.PMMA;

  // Extinction if oxygen is below material Limiting Oxygen Index (LOI)
  if (o2 < matInfo.loi) {
    return {
      spreadRateMmS: 0,
      regime: 'Extinction (Oxygen below LOI threshold)',
      isExtinction: true,
    };
  }

  // Extinction risk via high-speed convective blowoff
  if (flow > 42) {
    return {
      spreadRateMmS: 0.15,
      regime: 'Blowoff Extinction Risk',
      isExtinction: false,
    };
  }

  // Quiescent microgravity radiative extinction (< 0.5 cm/s flow in 0g)
  if (g < 0.02 && flow < 0.5) {
    return {
      spreadRateMmS: 0.05,
      regime: 'Quiescent Oxygen Starvation / Radiative Quenching',
      isExtinction: false,
    };
  }

  // Deterministic physical spread rate calculation
  const oxygenMargin = (o2 - matInfo.loi) / 10.0;
  const pressureFactor = Math.sqrt(clamp(pressurePsi / 14.7, 0.4, 2.0));
  const convectiveSpeed = Math.sqrt(flow * flow + 900.0 * g); // Convective velocity vector
  const flowFactor = clamp(Math.pow(convectiveSpeed / 10.0, 0.4), 0.3, 2.2);

  const spread = matInfo.baseSpreadMmS * oxygenMargin * pressureFactor * flowFactor;

  let regime = 'Opposed Forced Flow';
  if (g >= 0.85) {
    regime = 'Buoyancy-Driven Plume';
  } else if (g > 0.01 && g < 0.85) {
    regime = 'Partial-Gravity Mixed Convection';
  } else if (flow <= 5) {
    regime = 'Diffusion-Dominated Sphere';
  }

  return {
    spreadRateMmS: Number(Math.max(spread, 0.05).toFixed(2)),
    regime,
    isExtinction: false,
  };
}

/**
 * Composite combustion physical state calculator
 */
export function computeCombustionPhysics(scenario: ScenarioState) {
  const g = clamp(scenario.gravity, 0.0, 1.0);
  const o2 = clamp(scenario.oxygenPct, 15, 100);
  const flow = clamp(scenario.airflowVelocity, 0, 50);

  const sphericity = calculateFlameSphericity(g, flow);
  const elongation = calculateFlameElongation(g, flow);
  const sootFraction = calculateSootFraction(g, o2, scenario.material);
  const coolState = calculateCoolFlameState(g, o2, scenario.material);
  const spreadResult = calculateFlameSpreadVelocity(scenario);

  const isPartialGravityGap = g > 0.01 && g < 0.98;
  const flameColorPrimary = sootFraction >= 0.45 ? '#FFB454' : '#4CC9F0';
  const flickerFrequencyHz = Number((0.4 + 9.6 * g + flow * 0.04).toFixed(2));

  let regimeLabel = spreadResult.regime;
  if (isPartialGravityGap) {
    regimeLabel = 'Partial-Gravity Mixed Convection (Empirical Gap)';
  } else if (g <= 0.02 && flow <= 5) {
    regimeLabel = 'Diffusion-Dominated Sphere';
  }

  return {
    sphericity,
    elongation,
    sootFraction,
    flameColorPrimary,
    flameColorCore: '#F5F7FA',
    peakTempK: coolState.tempK,
    spreadVelocityMmS: spreadResult.spreadRateMmS,
    isCoolFlame: coolState.isCoolFlamePossible,
    isPartialGravityGap,
    regimeLabel,
    flickerFrequencyHz,
  };
}
