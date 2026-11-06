import { INVESTIGATIONS } from '../data/investigations';
import {
  EVIDENCE_CLAIMS,
  EVIDENCE_CLAIMS_BY_ID,
  EVIDENCE_CLAIMS_BY_INVESTIGATION,
} from '../data/evidenceClaims';
import type { Investigation, EvidenceClaim, AiCitation } from '../types';

export interface RagQueryResult {
  answer: string;
  citations: AiCitation[];
  evidenceGapWarning?: string;
  isOutOfScope?: boolean;
  suggestedQuestions?: string[];
}

export interface QuickPromptItem {
  id: string;
  label: string;
  query: string;
}

export const QUICK_PROMPTS: QuickPromptItem[] = [
  {
    id: 'lunar-flammability',
    label: 'Lunar 0.16g Flammability',
    query: 'How does Lunar partial gravity (0.16g) affect flame spread and fire safety?',
  },
  {
    id: 'sphericity',
    label: 'Microgravity Sphericity',
    query: 'Why do flames become spherical in microgravity and stop flickering?',
  },
  {
    id: 'cool-flames',
    label: 'Cool Flame Hazards',
    query: 'What are cool flames and why do they pose an invisible danger in spacecraft?',
  },
  {
    id: 'nomex-enriched',
    label: 'Nomex in 34% O₂',
    query: 'Does Nomex fabric remain flame-resistant in enriched 34% O2 exploration atmospheres?',
  },
  {
    id: 'bass-vs-sofie',
    label: 'BASS vs SoFIE',
    query: 'What are the key differences between BASS and SoFIE experiments on the ISS?',
  },
  {
    id: 'saffire-burns',
    label: 'Saffire Large-Scale Fires',
    query: 'What did the Saffire tests reveal about large-scale spacecraft fires?',
  },
  {
    id: 'fire-suppression',
    label: 'Fire Suppression & Mist',
    query: 'How does fine water mist extinguish fires in microgravity compared to nitrogen?',
  },
];

const INVESTIGATIONS_BY_ID: Record<string, Investigation> = INVESTIGATIONS.reduce(
  (acc, inv) => {
    acc[inv.id] = inv;
    return acc;
  },
  {} as Record<string, Investigation>
);

export function buildCitation(claim: EvidenceClaim, investigation?: Investigation): AiCitation {
  const inv = investigation || INVESTIGATIONS_BY_ID[claim.investigationId];
  return {
    investigationId: claim.investigationId,
    code: claim.investigationCode || inv?.code || 'NASA-PSI',
    title: inv?.title || claim.investigationCode,
    claimId: claim.id,
    claimText: claim.claimText,
    badge: claim.evidenceStatus,
    doi: claim.doi,
    facility: inv?.platform || inv?.hardware || 'ISS - Microgravity Research',
  };
}

const PROPULSION_REGEX =
  /\b(rocket engine|thruster|liquid rocket|propulsion|turbopump|rs-25|merlin|bipropellant|hydrazine|hypergolic|combustion chamber|rocket nozzle|liquid propellant|solid rocket motor)\b/i;

export function isPropulsionOutOfScope(query: string): boolean {
  return PROPULSION_REGEX.test(query);
}

const LUNAR_GAP_WARNING =
  'NASA PSI Evidence Gap Warning: Sustained partial-gravity (0.16g Lunar, 0.38g Mars) combustion has not yet been systematically measured in long-duration orbit. Findings rely on parabolic flights (KC-135/Zero-G, ~20s), burning rate emulators, and numerical extrapolation. Safety designs must enforce conservative margins.';

// Curated Syntheses for primary NASA PSI Knowledge Domains
function getLunarSynthesis(): RagQueryResult {
  const claimIds = ['CLAIM-PGRAV-01', 'CLAIM-PGRAV-03', 'CLAIM-PGRAV-04', 'CLAIM-PGRAV-05', 'CLAIM-O2P-01'];
  const citations = claimIds
    .map((id) => EVIDENCE_CLAIMS_BY_ID[id])
    .filter((c): c is EvidenceClaim => Boolean(c))
    .map((c) => buildCitation(c));

  return {
    answer:
      `In Lunar partial gravity (0.16g), flame behavior presents a counter-intuitive and acute fire safety hazard. ` +
      `Natural buoyant acceleration generates a gentle draft velocity of approximately 12–20 cm/s. ` +
      `Unlike Earth 1g—where vigorous buoyant draft (30–60 cm/s) cools the fuel bed and sweeps away reaction heat—the low lunar flow is too weak to quench the flame yet strong enough to continuously supply fresh oxygen. ` +
      `This draft places Lunar conditions directly inside the peak flammability ventilation window. ` +
      `Consequently, solid materials that easily self-extinguish during standard 1g downward certification tests (NASA-STD-6001 Test 1) can sustain continuous, self-propagating fires in Lunar habitats. ` +
      `When combined with Artemis exploration atmospheres (e.g. 30–34% O₂ at 8.2–10.2 psia), flame spread is significantly accelerated because reduced nitrogen concentration eliminates critical thermal ballast.`,
    citations,
    evidenceGapWarning: LUNAR_GAP_WARNING,
    suggestedQuestions: [
      'Does Nomex fabric burn in 34% O2 exploration atmospheres?',
      'Why do materials pass 1g downward flammability tests but burn in microgravity?',
      'What did burning rate emulator (BRE) experiments discover about partial gravity?',
    ],
  };
}

function getSphericitySynthesis(): RagQueryResult {
  const claimIds = ['CLAIM-BUOY-01', 'CLAIM-BUOY-02', 'CLAIM-BUOY-04', 'CLAIM-DIFF-01', 'CLAIM-DIFF-02'];
  const citations = claimIds
    .map((id) => EVIDENCE_CLAIMS_BY_ID[id])
    .filter((c): c is EvidenceClaim => Boolean(c))
    .map((c) => buildCitation(c));

  return {
    answer:
      `In true microgravity (0g), flames lose their familiar terrestrial teardrop shape and become nearly spherical, dim, and quiet. ` +
      `On Earth (1g), gravity causes hot, low-density combustion products to rapidly accelerate upward at 30–60 cm/s, producing hydrodynamic Kelvin-Helmholtz vortex shedding that flickers at 8–15 Hz. ` +
      `In microgravity, buoyancy vanishes ($u_b \\sim \\sqrt{g \\beta \\Delta T L} \\to 0$). ` +
      `Without buoyant convection, oxidizer transport is governed purely by isotropic molecular diffusion ($D \\nabla^2 Y_i$). ` +
      `The flame surrounds the fuel source symmetrically like a luminous bubble. ` +
      `Flickering disappears, replaced by a slow ~0.4 Hz diffusive breathing oscillation or steady burn, and soot residence times increase by a factor of 4 to 8, concentrating soot into dark core shells.`,
    citations,
    evidenceGapWarning: undefined,
    suggestedQuestions: [
      'What are cool flames and how do they form in spherical droplet burning?',
      'How does low-speed ventilation airflow reshape spherical flames?',
      'What did SPICE and SLICE experiments measure regarding microgravity soot?',
    ],
  };
}

function getCoolFlamesSynthesis(): RagQueryResult {
  const claimIds = ['CLAIM-COOL-01', 'CLAIM-COOL-02', 'CLAIM-COOL-03', 'CLAIM-COOL-04', 'CLAIM-COOL-06'];
  const citations = claimIds
    .map((id) => EVIDENCE_CLAIMS_BY_ID[id])
    .filter((c): c is EvidenceClaim => Boolean(c))
    .map((c) => buildCitation(c));

  return {
    answer:
      `Cool flames represent one of the most significant microgravity combustion discoveries made aboard the ISS (FLEX and FLEX-2 experiments). ` +
      `When large isolated alkane fuel droplets (such as n-heptane or n-decane) burn in microgravity, radiative heat losses eventually extinguish the visible high-temperature hot flame (1600–1900 K). ` +
      `Instead of burning stopping, the droplet continues vaporizing and oxidizes at a low temperature of 500–800 K in a quasi-steady "cool flame" regime. ` +
      `This reaction is sustained by alkylperoxy radical isomerization (ROO → QOOH) without producing visible soot or yellow continuum radiation. ` +
      `Cool flames are completely invisible to the human eye and visible-spectrum cameras, emitting only faint UV/IR chemiluminescence (formaldehyde H₂CO* at 360–460 nm). ` +
      `They pose a stealth hazard in spacecraft: if cabin ventilation ramps up or oxygen levels shift, invisible cool flames can abruptly trigger a secondary thermal explosion and reignite into destructive hot fires.`,
    citations,
    evidenceGapWarning: undefined,
    suggestedQuestions: [
      'How does CO2 diluent affect cool flames versus hot flames?',
      'What instruments are required to detect invisible spacecraft cool flames?',
      'How do binary alkane mixtures burn compared to single-component fuels?',
    ],
  };
}

function getNomexPmmaEnrichedSynthesis(): RagQueryResult {
  const claimIds = ['CLAIM-O2P-01', 'CLAIM-O2P-02', 'CLAIM-O2P-04', 'CLAIM-O2P-06', 'CLAIM-FLOW-01'];
  const citations = claimIds
    .map((id) => EVIDENCE_CLAIMS_BY_ID[id])
    .filter((c): c is EvidenceClaim => Boolean(c))
    .map((c) => buildCitation(c));

  return {
    answer:
      `NASA Artemis exploration architectures employ reduced pressure and enriched oxygen atmospheres (typically 8.2 psia at 34% O₂ or 10.2 psia at 30% O₂) to enable rapid astronaut EVA spacewalks without pre-breathe de-nitrogenation. ` +
      `While human lungs only respond to oxygen partial pressure ($ppO_2 = X_{O_2} \\cdot P_{tot} \\approx 3.0\\text{ psia}$, matching sea level), chemical kinetics and flammability scale with oxygen mole fraction ($X_{O_2}$). ` +
      `Reducing nitrogen eliminates the inert thermal ballast that absorbs reaction heat in Earth air. ` +
      `As verified in BASS-II and SoFIE: ` +
      `1) Nomex HT90-40 fabric, widely certified as flame-resistant and self-extinguishing in standard Earth air (Limiting Oxygen Index $\\approx 28.5\\%$, dropping to $26.5\\%$ in microgravity flow), burns vigorously and continuously in 30–34% O₂ atmospheres. ` +
      `2) Cast PMMA (acrylic) exhibits doubled flame spread rates, heavy volatile bubbling, and drops its extinction boundary down to 16.5% O₂. ` +
      `Materials considered fire-safe on Earth are not safe in exploration atmospheres without re-qualification.`,
    citations,
    evidenceGapWarning: undefined,
    suggestedQuestions: [
      'What is the Limiting Oxygen Index (LOI) of Nomex in microgravity?',
      'How does total pressure reduction (8.2 psia vs 14.7 psia) affect flame spread?',
      'What happens to PMMA cylinders under concurrent ventilation airflow?',
    ],
  };
}

function getBassVsSofieSynthesis(): RagQueryResult {
  const bass = INVESTIGATIONS_BY_ID['bass'] || INVESTIGATIONS_BY_ID['bass-ii'];
  const sofie = INVESTIGATIONS_BY_ID['sofie-gel'] || INVESTIGATIONS_BY_ID['sofie-mist'];
  const bassClaims = (EVIDENCE_CLAIMS_BY_INVESTIGATION['bass'] || []).concat(
    EVIDENCE_CLAIMS_BY_INVESTIGATION['bass-ii'] || []
  );
  const sofieClaims = (EVIDENCE_CLAIMS_BY_INVESTIGATION['sofie-gel'] || []).concat(
    EVIDENCE_CLAIMS_BY_INVESTIGATION['sofie-mist'] || []
  );

  const selectedClaims = [
    bassClaims[0] || EVIDENCE_CLAIMS_BY_ID['CLAIM-FLOW-01'],
    bassClaims[1] || EVIDENCE_CLAIMS_BY_ID['CLAIM-SUPP-02'],
    sofieClaims[0] || EVIDENCE_CLAIMS_BY_ID['CLAIM-O2P-05'],
    sofieClaims[1] || EVIDENCE_CLAIMS_BY_ID['CLAIM-O2P-06'],
  ].filter((c): c is EvidenceClaim => Boolean(c));

  const citations = selectedClaims.map((c) => buildCitation(c));

  return {
    answer:
      `Both BASS and SoFIE are premier NASA microgravity solid fuel combustion investigations, but they serve complementary research roles with distinct hardware and objectives: ` +
      `\n\n• **BASS / BASS-II (Burning and Suppression of Solids)**: ` +
      `Conducted in the ISS Microgravity Science Glovebox (MSG) between 2012–2016. ` +
      `BASS focused on aerodynamic forced airflow velocity (0.5 to 50 cm/s) inside a 76 mm × 76 mm miniature flow duct, burning small flat sheets, cylindrical rods, and acrylic spheres. ` +
      `Its primary goal was measuring low-speed airflow flammability limits and testing direct gaseous nitrogen jet extinguishing tactics. ` +
      `\n\n• **SoFIE (Solid Fuel Ignition and Extinction)**: ` +
      `Deployed in the Combustion Integrated Rack (CIR) beginning in 2022 as an advanced multi-payload chamber (MIST, GEL, RT10, etc.). ` +
      `SoFIE expands beyond small samples to thick fuel slabs (10 mm PMMA), gelled fuels, and composite aramid fabrics under controlled radiant heating fluxes (10–25 kW/m²). ` +
      `SoFIE rigorously explores exploration atmospheres (8.2–14.7 psia, 15–40% O₂) and determines fundamental chemical extinction and blowoff criteria. ` +
      `\n\nIn summary: BASS established low-speed ventilation flow and manual suppression foundations; SoFIE provides high-precision fundamental ignition thresholds, external radiation coupling, and exploration atmosphere validation.`,
    citations,
    evidenceGapWarning: undefined,
    suggestedQuestions: [
      'What were the main suppression findings in BASS?',
      'How does external radiant heating in SoFIE-MIST lower the Limiting Oxygen Index?',
      'What hardware differences exist between MSG and CIR?',
    ],
  };
}

function getSaffireSynthesis(): RagQueryResult {
  const saffireClaims = [
    EVIDENCE_CLAIMS_BY_ID['CLAIM-O2P-04'],
    EVIDENCE_CLAIMS_BY_ID['CLAIM-SUPP-03'],
    EVIDENCE_CLAIMS_BY_ID['CLAIM-FLOW-04'],
  ].filter((c): c is EvidenceClaim => Boolean(c));

  const citations = saffireClaims.map((c) => buildCitation(c));

  return {
    answer:
      `The SAFFIRE (Spacecraft Fire Safety Demonstration) series (Saffire I through VI) overcame the primary limitation of human-tended ISS research: the strict sample size restrictions imposed by astronaut safety. ` +
      `Conducted inside uncrewed Northrop Grumman Cygnus cargo vehicles after departing the ISS and prior to destructive atmospheric reentry, Saffire ignited large-scale fires inside a full-scale flow duct. ` +
      `Key findings include: ` +
      `\n1) **Large-Scale Propagation**: Saffire tested large 0.4 m × 1.0 m fabric sheets (cotton-fiberglass SIBAL) and thick PMMA slabs. Real fires exhibited faster flame spread and larger turbulent preheat zones than small glovebox specimens predicted. ` +
      `\n2) **Exploration Atmosphere Burns**: Conducted burns at reduced pressure (8.2 psia) and elevated oxygen (up to 34% O₂), verifying that elevated oxygen mole fractions maintain dangerous flame speeds despite lower atmospheric density. ` +
      `\n3) **Post-Venting Smoldering Persistence**: Cygnus cabin depressurization below 4.0 psia halted visible flaming, but internal solid-state char smoldering persisted until vacuum levels were achieved, proving depressurization alone cannot immediately neutralize deep embers.`,
    citations,
    evidenceGapWarning: undefined,
    suggestedQuestions: [
      'Why is Cygnus depressurization insufficient to extinguish internal smoldering?',
      'How did Saffire sample sizes compare to ISS glovebox samples?',
      'What materials were burned during the Saffire flight tests?',
    ],
  };
}

function getSuppressionSynthesis(): RagQueryResult {
  const suppClaims = [
    EVIDENCE_CLAIMS_BY_ID['CLAIM-SUPP-01'],
    EVIDENCE_CLAIMS_BY_ID['CLAIM-SUPP-02'],
    EVIDENCE_CLAIMS_BY_ID['CLAIM-SUPP-03'],
    EVIDENCE_CLAIMS_BY_ID['CLAIM-SUPP-04'],
    EVIDENCE_CLAIMS_BY_ID['CLAIM-SUPP-05'],
  ].filter((c): c is EvidenceClaim => Boolean(c));

  const citations = suppClaims.map((c) => buildCitation(c));

  return {
    answer:
      `Spacecraft fire suppression differs fundamentally from terrestrial firefighting due to the absence of buoyant convective sorting and the risk of collateral habitat contamination: ` +
      `\n1) **Fine Water Mist (< 30 micron droplets)**: As demonstrated in NASA Fine Water Mist investigations, micro-droplets evaporate completely within the flame thermal boundary layer without dripping or coalescing, extracting 2260 kJ/kg of latent heat. It achieves extinguishment using ~70% less water mass than 1g systems. Sub-25 micron mist remains a dry fog, preventing dielectric short circuits in energized electronics racks. ` +
      `\n2) **Nitrogen Jet Inerting**: Evaluated in BASS, targeted nitrogen discharge starves the reaction below Minimum Oxygen Concentration (MOC) while aerodynamic convective strain blows away pyrolyzate vapor. ` +
      `\n3) **Cabin Depressurization**: Reduces flame spread by lowering oxygen partial pressure, but smoldering persists in porous materials down to full vacuum venting. ` +
      `\n4) **Detection Hazard (SAME)**: Smoke aerosol particles in microgravity lack buoyant sedimentation and agglomerate into giant fractal chain flocs (> 10 micron), rendering terrestrial ionization detectors sluggish and necessitating multi-wavelength optical scattering.`,
    citations,
    evidenceGapWarning: undefined,
    suggestedQuestions: [
      'Why does water mist avoid electrical shorting in avionics bays?',
      'How does smoke particle agglomeration affect spacecraft smoke detectors?',
      'What is the Minimum Oxygen Concentration (MOC) for solid polymers in 0g?',
    ],
  };
}

// Dynamic Search for arbitrary queries across INVESTIGATIONS and EVIDENCE_CLAIMS
function searchDynamicClaims(
  query: string,
  activeStudyId?: string | null
): RagQueryResult {
  const terms = query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  // If study context is provided, prioritize it
  let candidateStudies = INVESTIGATIONS;
  if (activeStudyId && INVESTIGATIONS_BY_ID[activeStudyId]) {
    const active = INVESTIGATIONS_BY_ID[activeStudyId];
    candidateStudies = [active, ...INVESTIGATIONS.filter((i) => i.id !== activeStudyId)];
  }

  // Score investigations
  const scoredInvs = candidateStudies.map((inv) => {
    let score = 0;
    const textToMatch = `${inv.code} ${inv.title} ${inv.subtitle} ${inv.researchPurpose} ${inv.hardware} ${inv.tags.join(' ')} ${inv.fuelDetails.materials.join(' ')}`.toLowerCase();
    for (const term of terms) {
      if (textToMatch.includes(term)) {
        score += 3;
      }
    }
    if (activeStudyId && inv.id === activeStudyId) {
      score += 4;
    }
    return { inv, score };
  });

  // Score claims
  const scoredClaims = EVIDENCE_CLAIMS.map((claim) => {
    let score = 0;
    const textToMatch = `${claim.investigationCode} ${claim.category} ${claim.claimText} ${claim.scientificContext} ${claim.limitation ?? ''}`.toLowerCase();
    for (const term of terms) {
      if (textToMatch.includes(term)) {
        score += 2;
      }
    }
    if (activeStudyId && claim.investigationId === activeStudyId) {
      score += 3;
    }
    return { claim, score };
  });

  const bestClaims = scoredClaims
    .filter((sc) => sc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((sc) => sc.claim);

  const bestInvs = scoredInvs
    .filter((si) => si.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((si) => si.inv);

  if (bestClaims.length === 0 && bestInvs.length === 0) {
    return {
      answer:
        `No direct empirical match was found in the NASA Physical Sciences Informatics (PSI) combustion dataset for "${query}". ` +
        `FlameGuard AI is strictly grounded in verified NASA flight and ground experiments (BASS, SoFIE, Saffire, FLEX, ACME, SAME, etc.). ` +
        `Try exploring our core knowledge domains below.`,
      citations: [],
      suggestedQuestions: QUICK_PROMPTS.slice(0, 4).map((p) => p.query),
    };
  }

  // Construct citations
  const citations = bestClaims.map((claim) =>
    buildCitation(claim, INVESTIGATIONS_BY_ID[claim.investigationId])
  );

  const hasPartialGravityClaim = bestClaims.some((c) => c.category === 'partial_gravity');
  const evidenceGapWarning = hasPartialGravityClaim ? LUNAR_GAP_WARNING : undefined;

  // Synthesize answer from retrieved studies and claims
  const invSummaries = bestInvs
    .map(
      (inv) =>
        `• **${inv.code} (${inv.title})**: ${inv.researchPurpose} (Platform: ${inv.platform}, Hardware: ${inv.hardware}). Key finding: ${inv.keyFindings.summary}`
    )
    .join('\n\n');

  const claimBullets = bestClaims
    .map((c) => `• [${c.investigationCode} / ${c.id}]: ${c.claimText} (${c.scientificContext})`)
    .join('\n\n');

  let answerText = `Based on retrieved NASA Physical Sciences Informatics (PSI) test data:\n\n`;
  if (invSummaries) {
    answerText += `${invSummaries}\n\n`;
  }
  if (claimBullets) {
    answerText += `**Supporting Flight Evidence & Provenance**:\n${claimBullets}`;
  }

  return {
    answer: answerText,
    citations,
    evidenceGapWarning,
    suggestedQuestions: QUICK_PROMPTS.slice(0, 3).map((p) => p.query),
  };
}

/**
 * Main retrieval interface for FlameGuard Grounded AI Assistant
 */
export function queryRagKnowledgeEngine(
  query: string,
  activeStudyId?: string | null
): RagQueryResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      answer: 'Please enter a combustion research question to query the NASA PSI knowledge base.',
      citations: [],
      suggestedQuestions: QUICK_PROMPTS.slice(0, 4).map((p) => p.query),
    };
  }

  // Guardrail: Liquid Rocket Engines / Thrusters / Propulsion are Out-Of-Scope
  if (isPropulsionOutOfScope(trimmed)) {
    return {
      answer:
        `**FlameGuard AI Scope Advisory: Rocket Propulsion Out of Scope**\n\n` +
        `Your query concerns liquid rocket engines, propulsion thrusters, or turbomachinery. ` +
        `The NASA Physical Sciences Informatics (PSI) repository and FlameGuard AI focus strictly on **spacecraft cabin fire safety, solid material flammability, droplet combustion, soot formation, and fire suppression in human-habitable orbital and planetary microgravity environments**.\n\n` +
        `Liquid propellant rocket combustion (e.g. RS-25, Merlin, bipropellant hypergolics, turbopumps) operates under extreme chamber pressures and forced supersonic convective flows, which belong to liquid propulsion engineering, not habitable cabin fire science.`,
      citations: [],
      isOutOfScope: true,
      suggestedQuestions: [
        'How does Lunar partial gravity (0.16g) affect flame spread?',
        'What are cool flames and why are they dangerous in spacecraft?',
        'Does Nomex fabric remain flame-resistant in enriched 34% O2 exploration atmospheres?',
      ],
    };
  }

  const normalized = trimmed.toLowerCase();

  // 1. Lunar / Moon Partial Gravity
  if (
    normalized.includes('lunar') ||
    normalized.includes('moon') ||
    normalized.includes('0.16') ||
    normalized.includes('partial gravity') ||
    (normalized.includes('gravity') && normalized.includes('partial'))
  ) {
    return getLunarSynthesis();
  }

  // 2. Microgravity Sphericity & Shape
  if (
    normalized.includes('spheric') ||
    normalized.includes('sphericity') ||
    normalized.includes('teardrop') ||
    normalized.includes('flicker') ||
    (normalized.includes('shape') && (normalized.includes('flame') || normalized.includes('microgravity')))
  ) {
    return getSphericitySynthesis();
  }

  // 3. Cool Flames
  if (
    normalized.includes('cool flame') ||
    normalized.includes('cool flames') ||
    normalized.includes('invisible flame') ||
    (normalized.includes('low temperature') && normalized.includes('flame')) ||
    normalized.includes('alkylperoxy')
  ) {
    return getCoolFlamesSynthesis();
  }

  // 4. Nomex / PMMA / Enriched O2
  if (
    (normalized.includes('nomex') || normalized.includes('pmma')) ||
    (normalized.includes('enriched') && normalized.includes('oxygen')) ||
    normalized.includes('34%') ||
    normalized.includes('exploration atmosphere')
  ) {
    return getNomexPmmaEnrichedSynthesis();
  }

  // 5. BASS vs SoFIE
  if (
    (normalized.includes('bass') && normalized.includes('sofie')) ||
    normalized.includes('difference between bass and sofie') ||
    normalized.includes('compare bass and sofie')
  ) {
    return getBassVsSofieSynthesis();
  }

  // 6. Saffire Large-Scale Burns
  if (
    normalized.includes('saffire') ||
    (normalized.includes('large scale') && normalized.includes('fire')) ||
    normalized.includes('cygnus')
  ) {
    return getSaffireSynthesis();
  }

  // 7. Fire Suppression & Mist
  if (
    normalized.includes('suppression') ||
    normalized.includes('water mist') ||
    normalized.includes('extinguish') ||
    (normalized.includes('nitrogen') && normalized.includes('fire')) ||
    normalized.includes('smoke detect')
  ) {
    return getSuppressionSynthesis();
  }

  // General Dynamic Semantic/Keyword Search
  return searchDynamicClaims(trimmed, activeStudyId);
}
