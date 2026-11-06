# FlameGuard AI (Flame in Freefall) — System Architecture & Design Specification

**Document Version:** 1.0.0  
**Date:** 2026-11-07  
**Project Path:** `c:\Users\OWNER\source\Eatzy\FlameInFreewall_Tourbillion`  
**Reference Sources:**
- Architecture & Diagrams: `docs/index (3).html` (D01 to D15)
- Feature Prototype: `docs/FlameGuard_AI_Local (2).html`
- Design System Origin: `StructPaper/apps/web` (AppShell, DockPill Sidebar, Liquid Glass Toast, PaperCard, JournalHub) & `eatzy_frontend` (Customer & Restaurant modals)
- Visual Style Guidelines: NASA Space Apps Challenge 2026 Theme (Photos 1, 2) + Kurzgesagt Art Style (Photos 3, 4, 5)

---

## 1. Intent & The Why

### 1.1 Intent
FlameGuard AI is a scientific research and mission intelligence web platform designed for the **NASA Space Apps Challenge: Flame in Freefall**. The application provides an evidence-first interface for astronauts, aerospace engineers, and researchers to explore 20+ microgravity combustion investigations from the NASA Physical Sciences Informatics (PSI) repository, identify critical safety and evidence gaps in extravehicular/habitat mission scenarios (ISS, Lunar Base, Mars Colony), and audit the scientific readiness of predictive flame propagation models.

### 1.2 The Why
In terrestrial gravity ($1g$), buoyancy forces draw heated air upward, pulling in fresh oxygen and shaping flames into elongated vertical teardrops. In microgravity ($0g$), buoyancy vanishes; diffusion and weak forced ventilation dominate, creating slow-burning, spherical, cyan-dominant flames that produce invisible cool-flame phenomena and behave unpredictably. 

Existing documentation prototypes are visually bare and unstyled. This project re-engineers FlameGuard AI into an industry-grade, beautifully crafted web application adopting the proven layout architecture and high-polish component systems of **StructPaper** and **Eatzy**, re-skinned into the vibrant **NASA Space Apps 2026 visual identity** (royal space navy blue + electric neon lime) and a **Kurzgesagt-inspired vector glow aesthetic** for scientific storytelling.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Accurate Functional Parity with FlameGuard AI Specs:** Recreate all 15 system workflows from `index (3).html` and `FlameGuard_AI_Local`:
   - Research Dashboard with NASA PSI KPIs, metrics, and investigation catalog.
   - Experiment Explorer with faceted search/filters, table vs. card view, detailed study view, and a side-by-side multi-study Comparison Modal (2–3 investigations).
   - Mission Scenario & Evidence Gaps with unified parameter configuration (environment, gravity, $O_2$, pressure, material, airflow), topical relevance ranking, and a condition coverage Gap Matrix.
   - Predictive Lab Readiness panel with guarded execution audit (requirements check: verified runs, validated model, uncertainty bounds).
   - Floating Grounded AI Assistant (RAG Dock) with traceable citations, source links, and claim validation tags (`Measured`, `Modeled`, `Illustrative`).
2. **StructPaper UI Architecture Integration:**
   - Persistent `AppShell` with responsive sidebar dock.
   - Expandable **DockPillButton** navigation bar (collapsed `58px` circle, expanded `280px` rounded pill) with liquid glass tooltips and Framer Motion spring physics.
   - Application Header with NASA Space Apps branding, status pill badges, and quick workspace actions.
   - Liquid Glass Dynamic Island Toaster (`DynamicIslandToast` / `Toaster`) with multi-tone alerts (success, error, warning, info, loading).
   - Card and modal components modeled after `PaperCard`, `JournalProfileCard`, `PaperFiltersBar`, and Eatzy modal design.
3. **NASA Space Apps Theme (Photos 1 & 2):**
   - Top announcement banner: Electric Neon Lime (`#d4fc02` / `#e2ff3b`).
   - Deep Royal Space Navy navigation & hero backdrops (`#0b2374` / `#0f172a` / `#080c18`).
   - Clean, readable contrast on cards with dark-glass and crisp light-surface variants.
4. **Kurzgesagt Art Style on Landing Page (Photos 3, 4, 5):**
   - Flat vector illustrations with rich neon gradients (purple `#8b5cf6`, cyan `#06b6d4`, amber `#f97316`, electric lime `#d4fc02`).
   - Minimalist glowing vector diagrams illustrating $1g$ vs $0g$ combustion physics, oxygen partial pressure, and lunar/martian flammability risks.
   - Fluid interactive animations via Framer Motion.
5. **Clean & Modular Codebase:**
   - Zero giant monolithic files. Component files kept under 250–350 lines, separated into logic hooks, shared types, UI atoms/molecules, and domain data stores.

### 2.2 Non-Goals
- Real-time WebGL CFD fluid dynamics simulation: The application focuses on empirical evidence retrieval, deterministic physical telemetry calculations, and vector/shader illustrations, not heavy multi-gigabyte GPU grid simulations.
- Interactive backend ingestion/curation admin CMS: Diagrams D12 and D13 represent the data provenance pipeline and relational schema, fulfilled via comprehensive, pre-curated static seed datasets in `src/data/*.ts` without requiring dedicated `/admin` CRUD routes. User navigation strictly follows Diagram D06.

### 2.3 Anti-Goals
- **Never issue a reckless "Safe" safety verdict:** Follow NASA PSI fire safety protocols (Diagram D10) — mission scenarios with unmeasured partial gravity ($0 < g < 1$) or untested fabrics must explicitly show `EVIDENCE GAP` or `PARTIAL`, never an unconditional green check or "Safe to proceed" stamp.
- **No ungrounded AI hallucinations:** The AI assistant must never fabricate PSI investigation numbers, DOIs, or test results; missing evidence must yield explicit gap notifications.
- **No monolithic single-file bundle:** Must not dump all application logic into an unmaintainable bundle like the prototype HTML.

---

## 3. Approaches Considered & Selected Approach

### 3.1 Approaches Considered
1. **Approach 1: Standalone Modular Next.js 15 App Router with Tailwind CSS & Framer Motion (SELECTED)**
   - Initialized directly in `FlameInFreewall_Tourbillion`.
   - Independent `package.json`, TypeScript configuration, Tailwind tokens, and component library.
   - *Pros:* Clean boundaries, no legacy dependencies, completely matches StructPaper patterns while maintaining independence.
2. **Approach 2: Monorepo Workspace Linking with StructPaper / Eatzy**
   - Configured as a workspace package under the parent monorepo.
   - *Cons:* High risk of React 18 vs 19 and Next.js 14 vs 15 version collisions; unneeded dependency overhead from StructPaper compiler clients and Eatzy food delivery services.

### 3.2 Decision
The user unanimously approved **Approach 1**.

### 3.3 Builder Review Decisions & Clarifications
1. **Grounded AI RAG Engine (D11):** Implemented primarily as an offline-first, client-side deterministic retrieval engine over `src/data/evidenceClaims.ts` and `src/data/investigations.ts`, guaranteeing zero API key requirement and 100% reliable offline presentation (with graceful support for an optional external LLM Route Handler if an API key is configured).
2. **Predictive Lab Panel Execution (D14):** By default, demonstrates guarded execution: baseline ISS microgravity with PMMA executes the validated empirical model with uncertainty intervals, whereas any untested partial-gravity ($0 < g < 1$) or unknown fabric scenario locks into `MODEL OFFLINE / DOMAIN OUT OF BOUNDS` to strictly enforce NASA safety guardrails.
3. **Data Ingestion & Provenance Scope (D12 & D13):** Handled via rich, structured static seed files (`investigations.ts`, `testRuns.ts`, `evidenceClaims.ts`), preserving full many-to-many claim provenance without bloat from unneeded administrative ingestion UIs.

---

## 4. Architectural Blueprint & File Layout

### 4.1 Directory Structure
```
FlameInFreewall_Tourbillion/
├── docs/
│   ├── index (3).html
│   ├── FlameGuard_AI_Local (2).html
│   └── superpowers/
│       └── specs/
│           └── 2026-11-07-flameguard-ai-design.md
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── (landing)/
│   │   │   ├── page.tsx               # Kurzgesagt visual storytelling landing page
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx             # AppShell wrapper (Sidebar + Header + Toaster)
│   │   │   ├── dashboard/page.tsx     # Research Dashboard (KPIs, catalog, quick stats)
│   │   │   ├── explorer/
│   │   │   │   ├── page.tsx           # Experiment Explorer (Table/Grid + Filters)
│   │   │   │   └── [id]/page.tsx      # Investigation Detail (Runs, telemetry, claims)
│   │   │   ├── mission/page.tsx       # Mission Scenario & Gap Matrix & Predictive Lab
│   │   │   └── settings/page.tsx      # System settings, data export, NASA PSI info
│   │   ├── globals.css                # Tailwind base + Space Apps & Kurzgesagt tokens
│   │   └── layout.tsx                 # Root layout with Toaster and Global Providers
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx           # Adaptive layout wrapper
│   │   │   ├── Sidebar.tsx            # StructPaper DockPillButton sidebar
│   │   │   ├── Header.tsx             # StructPaper-styled header with NASA Space Apps theme
│   │   │   └── BottomNav.tsx          # Mobile navigation dock
│   │   ├── toast/
│   │   │   ├── LiquidGlassToast.tsx   # StructPaper Dynamic Island liquid toast
│   │   │   ├── Toaster.tsx            # Toast container
│   │   │   └── toast-store.ts         # Toast trigger API (toast.success, toast.error, etc.)
│   │   ├── landing/
│   │   │   ├── LandingHero.tsx        # Top banner, Space Apps heading, CTA buttons
│   │   │   ├── KurzgesagtFlameScene.tsx # Flat vector glow 1g vs 0g animated diagram
│   │   │   ├── AtmosphericPhysics.tsx # Partial pressure & Moon base flammability vector visual
│   │   │   ├── MissionControlCTA.tsx  # Interactive quick launch to workspace
│   │   │   └── LandingFooter.tsx
│   │   ├── dashboard/
│   │   │   ├── KpiStatCards.tsx       # 5 NASA PSI KPI summary cards
│   │   │   ├── CuratedStudiesRow.tsx  # Featured investigations carousel/grid
│   │   │   ├── DomainBreakdown.tsx    # Fuel type & gravity regime charts
│   │   │   └── QuickScenarioTrigger.tsx
│   │   ├── explorer/
│   │   │   ├── ExplorerFiltersBar.tsx # Keyword search, gravity filter, fuel selector, sort
│   │   │   ├── InvestigationCard.tsx  # StructPaper PaperCard pattern for studies
│   │   │   ├── InvestigationTable.tsx # High-density tabular view
│   │   │   ├── ComparisonModal.tsx    # Multi-study side-by-side comparison overlay
│   │   │   └── DetailTabs/            # Overview, Test Runs, Telemetry, Citations tabs
│   │   ├── mission/
│   │   │   ├── ScenarioConfigForm.tsx # Environment, gravity, O2, pressure, material, airflow
│   │   │   ├── EvidenceRankingList.tsx# Topical relevance ranked investigations
│   │   │   ├── ConditionGapMatrix.tsx # 6-dimension match audit (gravity, material, O2, etc.)
│   │   │   └── PredictiveLabPanel.tsx # Guarded execution, model readiness & requirements checklist
│   │   ├── ai/
│   │   │   ├── FloatingAiDock.tsx     # Floating assistant trigger pill
│   │   │   ├── AiDrawer.tsx           # Contextual RAG chat drawer
│   │   │   └── CitationBadge.tsx      # Traceable NASA citation pill with modal preview
│   │   └── ui/                        # Button, Modal, Badge, Tooltip, Input, Select, Tabs
│   ├── data/
│   │   ├── investigations.ts          # Curated NASA PSI investigations database
│   │   ├── testRuns.ts                # Individual test run conditions & measurements
│   │   ├── evidenceClaims.ts          # Traceable peer-reviewed research claims
│   │   └── presets.ts                 # ISS, Moon Base, Mars Habitat, Exploration presets
│   ├── lib/
│   │   ├── combustionMath.ts          # Microgravity flame elongation, sphericity, cool flame
│   │   ├── gapMatrixEngine.ts         # Multi-condition scenario match & gap evaluation
│   │   ├── rankingEngine.ts           # Topical relevance ranking calculator
│   │   └── ragKnowledgeEngine.ts      # Grounded Q&A retrieval with citation matching
│   └── store/
│       ├── useWorkspaceStore.ts       # Active filters, compare list, active scenario
│       └── useAiAssistantStore.ts     # Chat history, open state, active context study
```

---

## 5. UI/UX Design System Specifications

### 5.1 Color Palette (NASA Space Apps 2026 + Kurzgesagt Vectors)
- **Top Announcement / Accent:** `#D4FC02` (Electric Neon Lime)
- **Secondary Lime Highlight:** `#E2FF3B`
- **NASA Space Royal Navy:** `#0B2374` / `#102B82`
- **Cosmic Deep Dark Surface:** `#080C18`
- **Elevated Card Surface (Dark Mode):** `#111827` / `#162036` (with `border-white/10`)
- **Light Surface (StructPaper Mode):** `#F8F9FA` / `#FFFFFF`
- **Kurzgesagt Neon Accents:**
  - Flame Amber / 1g Heat: `#FFB454` / `#F97316`
  - Microgravity Cyan / 0g Glow: `#4CC9F0` / `#06B6D4`
  - Deep Neon Purple / Core: `#8B5CF6` / `#A855F7`
  - High Alert / Gap: `#FB4141` / `#EF4444`
  - Partial / Warning: `#FF9B2F` / `#F59E0B`
  - Confirmed / Measured: `#10B981`

### 5.2 Typography
- **Headings & Badges:** `Plus Jakarta Sans`, font-extrabold / font-black
- **Body & Controls:** `Inter`, ui-sans-serif
- **Data, Telemetry & Physical Formulas:** `JetBrains Mono`, Consolas, monospace

### 5.3 Interaction Patterns
- **Sidebar Dock (StructPaper pattern):**
  - Collapsed state: `58px` width, circular icons, liquid glass tooltip appears on 250ms hover to the right.
  - Expanded state: `280px` width, full label and subtitle displayed, active item rendered with Space Apps Electric Lime pill and glowing border.
  - Top Chevron toggle button to expand/collapse.
- **Dynamic Island Toast (StructPaper pattern):**
  - Smooth floating pill positioned at top center (`z-[9999]`).
  - Supports `toast.success()`, `toast.error()`, `toast.info()`, `toast.warning()`, and promise loading states.
- **Comparison Modal (Explorer):**
  - Fixed floating dock when 1+ studies selected ("X studies selected — Compare").
  - On trigger, opens a glass backdrop modal showing side-by-side parameter tables with delta highlighting.

---

## 6. Functional Modules & Implementation Details

### 6.1 Landing Page (`/`)
- **Hero Banner:** Space Apps Connect notice, NASA Space Apps 2026 logo, high-impact serif/display title: *"Flame in Freefall — Microgravity Combustion & Spacecraft Fire Safety Intelligence"*.
- **Interactive Kurzgesagt Visual Section:**
  - Animated side-by-side vector diagram: Earth 1g (buoyancy, rising hot gases, yellow teardrop, soot) vs Microgravity 0g ISS (pure diffusion, spherical blue flame, cooler burn, lingering soot).
  - Lunar & Martian Atmospheric Flammability visual: Interactive slider comparing $21\%\text{ O}_2$ at $14.7\text{ psia}$ (Earth) vs $30\%\text{ O}_2$ at $10.2\text{ psia}$ (Lunar habitat), demonstrating that equal breathing oxygen partial pressure ($3.06\text{ psia}$) increases flame spread risk dramatically.
- **CTA:** Direct launch buttons into `/dashboard`, `/explorer`, and `/mission`.

### 6.2 Research Dashboard (`/dashboard`)
- **5 High-Level Telemetry KPIs:** Total Ingested PSI Investigations (20), Total Verified Test Runs (148+), Microgravity Data Points ($10^4+$), Cataloged Evidence Claims (45), and Partial Gravity Extrapolation Gap Notice.
- **Curated Investigations Grid:** StructPaper `PaperCard` layout with investigation badges (`BASS`, `ACME`, `FLEX`, `SoFIE`), fuel types, principal investigators, and quick access buttons.
- **Domain Breakdown Visuals:** Microgravity flame spread distributions, fuel category breakdown (Solid, Droplet, Gaseous, Fabric).

### 6.3 Experiment Explorer (`/explorer` & `/explorer/[id]`)
- **Search & Filters:** Real-time text search, Fuel filter (Solid, Droplet, Gas), Gravity regime ($0g, 0.16g, 0.38g, 1g$), Chamber atmosphere ($O_2\%$, pressure), Sort by year/relevance.
- **View Toggle:** Grid card view (cards with pill tags and metadata) vs. Dense table view (columns: Code, Title, Fuel, Chamber Oxygen, Gravity, Runs, Actions).
- **Comparison Modal:** Checkbox selection on cards/rows. When $\ge 2$ selected, floating bar enables "Compare Studies". Modal shows synchronized parameter grid: Oxygen range, Quench limit, Peak flame spread rate, Soot volume fraction, and Evidence claims.
- **Study Detail Page (`/explorer/[id]`):**
  - Breadcrumbs navigation matching Space Apps style.
  - Tab 1: Scientific Abstract & PI Metadata.
  - Tab 2: Test Runs & Environmental Conditions (table of individual ignition events).
  - Tab 3: Telemetry & Empirical Curves (flame radius over time, quenching diameter).
  - Tab 4: Peer-Reviewed Claims with Evidence Badges (`Measured`, `Modeled`, `Illustrative`).
  - Tab 5: PSI Raw Data Links & Citations.

### 6.4 Mission Scenario & Evidence Gaps (`/mission`)
- **Scenario Configuration Form:**
  - Presets: ISS US Lab ($0g, 21\% \text{O}_2, 14.7\text{ psi}$), Artemis Lunar Habitat ($0.16g, 30\% \text{O}_2, 10.2\text{ psi}$), Mars Surface Habitat ($0.38g, 28\% \text{O}_2, 8.2\text{ psi}$), Custom.
  - Controls: Gravity slider ($0g \to 1g$), Oxygen slider ($15\% \to 40\%$), Pressure slider ($7 \to 16\text{ psi}$), Fuel material select (Nomex, PMMA, Cotton, Polyethylene, Methane), Airflow slider ($0 \to 25\text{ cm/s}$).
- **Evidence Gap Matrix (Diagram D10):**
  - Evaluates 6 dimensions: Gravity match, Material match, Oxygen match, Pressure match, Airflow match, and Combined coverage.
  - Renders explicit badges: `RELATED` (cyan), `PARTIAL` (amber), `GAP` (red).
  - Prominent safety disclaimer: *"Cannot conclude safe or unsafe — Empirical NASA PSI tests under exact habitat conditions are required."*
- **Ranked Investigation Results:** Studies sorted by topical condition relevance, showing similarity index and closest test run.
- **Predictive Lab Panel (Diagram D14):**
  - "Scientific Model Readiness" audit.
  - Visual lock state (`MODEL OFFLINE`) explaining why direct fire-spread ML cannot run without certified experimental validation and domain bounds.
  - Checklist of 3 requirements: 01 Verified test-run measurements, 02 Validated predictive model, 03 Uncertainty bounds review.

### 6.5 Global AI Assistant (Floating RAG Dock)
- Persistent button at bottom right (or docked).
- Expandable slide-over chat drawer.
- Pre-populated prompt suggestions: *"How does Lunar 0.16g affect flame spread?", "Why is Nomex flammable in 30% O2?", "Explain BASS vs SoFIE-GEL"*.
- Strict Grounding Engine: Every response tags claims with `[Source: BASS-II Run #4]`, `[NASA PSI Evidence Claim #12]`, or clearly marks unsupported queries with an Evidence Gap notice.

---

## 7. Responsibilities Left to the Builder
- Detailed styling of individual SVG paths for Kurzgesagt illustrations (DNA-style flame molecular chains, circular microgravity flame glow).
- Exact mock values and telemetry samples in `src/data/` based on real NASA PSI mission logs (BASS, ACME, FLEX, SPICE, CIR, SoFIE).
- Unit test coverage with Vitest for math/ranking engines.

---

## 8. Verification & Acceptance Criteria
1. `npm run build` passes with zero TypeScript and linting errors.
2. All 5 main routes (`/`, `/dashboard`, `/explorer`, `/explorer/[id]`, `/mission`) render smoothly without hydration errors.
3. Collapsible DockPill sidebar expands and collapses with tooltips and active state styling.
4. Dynamic Island Toast successfully triggers with smooth animation on user actions (e.g., adding to comparison, launching scenario).
5. Comparison Modal opens and accurately compares 2 to 3 selected investigations.
6. Scenario Gap Matrix correctly calculates `GAP` when testing materials or partial-gravity conditions absent from PSI test logs.
7. Mobile responsiveness verified across tablet and phone viewports.
