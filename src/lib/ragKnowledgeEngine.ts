import { INVESTIGATIONS } from '../data/investigations';
import { EVIDENCE_CLAIMS } from '../data/evidenceClaims';
import type { RagQueryResult, QuickPromptItem } from './ragSyntheses';
import {
  QUICK_PROMPTS,
  LUNAR_GAP_WARNING,
  INVESTIGATIONS_BY_ID,
  buildCitation,
  getLunarSynthesis,
  getSphericitySynthesis,
  getCoolFlamesSynthesis,
  getNomexPmmaEnrichedSynthesis,
  getBassVsSofieSynthesis,
  getSaffireSynthesis,
  getSuppressionSynthesis,
} from './ragSyntheses';

export type { RagQueryResult, QuickPromptItem };
export { QUICK_PROMPTS, buildCitation };

const PROPULSION_REGEX =
  /\b(rocket engine|thruster|liquid rocket|propulsion|turbopump|rs-25|merlin|bipropellant|hydrazine|hypergolic|combustion chamber|rocket nozzle|liquid propellant|solid rocket motor)\b/i;

export function isPropulsionOutOfScope(query: string): boolean {
  return PROPULSION_REGEX.test(query);
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
