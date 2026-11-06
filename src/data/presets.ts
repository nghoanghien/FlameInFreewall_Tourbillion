import type { ScenarioPreset } from '../types';

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'iss-baseline',
    name: 'ISS US Lab (Destiny Module)',
    subtitle: 'Earth-Normal Cabin Atmosphere in Microgravity (0.00g)',
    environment: 'iss',
    gravity: 0.0,
    oxygenPct: 21.0,
    pressurePsi: 14.7,
    material: 'PMMA',
    airflowVelocity: 5.0,
    badge: 'Measured',
    primaryRisk:
      'Absence of buoyant convection; gentle HVAC forced ventilation (2–8 cm/s) sustains spherical diffusion flame and prevents natural quenching.',
    description:
      'Nominal ISS microgravity cabin environment. Buoyancy-driven flow is virtually absent, meaning oxygen transport is driven entirely by cabin ventilation fans.',
  },
  {
    id: 'artemis-lunar-base',
    name: 'Artemis Moon Base / Rover',
    subtitle: 'High-O₂ Reduced-Pressure Exploration Atmosphere (0.16g)',
    environment: 'lunar',
    gravity: 0.16,
    oxygenPct: 30.0,
    pressurePsi: 10.2,
    material: 'PMMA',
    airflowVelocity: 8.0,
    badge: 'Illustrative',
    primaryRisk:
      '30% O₂ mole fraction removes nitrogen heat-sink dilution, sharply accelerating flame spread; 0.16g partial-gravity flame dynamics are empirical knowledge gaps.',
    description:
      'Exploration atmosphere matching Earth alveolar ppO₂ (3.06 psia) to reduce pre-breathe times for EVA. Elevated O₂ mole fraction drastically increases polymer flammability.',
  },
  {
    id: 'mars-surface-habitat',
    name: 'Mars Surface Habitat',
    subtitle: 'Martian Reduced Gravity & Exploration Atmosphere (0.38g)',
    environment: 'mars',
    gravity: 0.38,
    oxygenPct: 28.0,
    pressurePsi: 8.2,
    material: 'Nomex',
    airflowVelocity: 10.0,
    badge: 'Illustrative',
    primaryRisk:
      '0.38g intermediate buoyancy coupled with low total pressure (8.2 psia) creates unique mixed-convection boundary layer; empirical data gap in NASA PSI.',
    description:
      'Pressurized surface habitat on Mars at 0.38g gravity with 28% O₂ / 8.2 psia exploration atmosphere, testing textile fire retardance and slow convective plumes.',
  },
  {
    id: 'eva-spacesuit',
    name: 'Exploration EVA Spacesuit',
    subtitle: 'Low-Pressure High-O₂ Pressure Garment (0.00g)',
    environment: 'iss',
    gravity: 0.0,
    oxygenPct: 34.0,
    pressurePsi: 7.2,
    material: 'Nomex',
    airflowVelocity: 12.0,
    badge: 'Measured',
    primaryRisk:
      'Low total pressure and elevated oxygen concentrations dramatically lower the Limiting Oxygen Index (LOI) of otherwise flame-retardant meta-aramid textiles.',
    description:
      'Mobility-optimized spacesuit pressure garment atmosphere. High O₂ mole fraction and internal circulation loop create significant flashover hazard.',
  },
  {
    id: 'earth-calibration',
    name: 'Terrestrial 1g Calibration Facility',
    subtitle: 'Terrestrial NASA-STD-6001 Flammability Test Baseline (1.00g)',
    environment: 'earth',
    gravity: 1.0,
    oxygenPct: 21.0,
    pressurePsi: 14.7,
    material: 'PMMA',
    airflowVelocity: 0.0,
    badge: 'Measured',
    primaryRisk:
      'Rapid buoyant convection (30–60 cm/s chimney effect) elongates flame into upward teardrop, yielding high soot and intense radiant feedback.',
    description:
      'Standard sea-level 1.00g terrestrial laboratory reference condition used for NASA-STD-6001 upward flammability certification.',
  },
  {
    id: 'custom-sandbox',
    name: 'Custom Deep Space Habitat',
    subtitle: 'User-Configured Atmospheric & Gravitational Parameter Envelope',
    environment: 'custom',
    gravity: 0.0,
    oxygenPct: 25.0,
    pressurePsi: 12.0,
    material: 'Cotton',
    airflowVelocity: 6.0,
    badge: 'Modeled',
    primaryRisk:
      'Composite materials subject to arbitrary atmospheric pressure and ventilation rates require rigorous cross-study empirical verification.',
    description:
      'Configurable habitat sandbox allowing exploration of untested partial pressures, novel fabrics, and ventilation speeds.',
  },
];

export const PRESETS_RECORD: Record<string, ScenarioPreset> = SCENARIO_PRESETS.reduce(
  (acc, preset) => {
    acc[preset.id] = preset;
    return acc;
  },
  {} as Record<string, ScenarioPreset>
);
