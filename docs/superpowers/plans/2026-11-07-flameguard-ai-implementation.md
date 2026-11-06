# FlameGuard AI (Flame in Freefall) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive, industry-standard Next.js 15 App Router application for FlameGuard AI inside `FlameInFreewall_Tourbillion`, implementing all 15 scientific research workflows from NASA PSI documentation, featuring the StructPaper layout & design system (DockPillButton sidebar, AppShell, Liquid Glass Dynamic Island Toaster, PaperCards) styled in the NASA Space Apps 2026 visual identity (Electric Lime `#D4FC02` + Royal Navy Blue `#0B2374`) with Kurzgesagt-style vector storytelling.

**Architecture:** Client-side modular Next.js 15 App Router application structured into clear layers (`components/`, `data/`, `lib/`, `store/`, `hooks/`). Uses Tailwind CSS for tokenized theming, Framer Motion for smooth dock expansion and glowing Kurzgesagt vectors, Zustand for centralized workspace and AI assistant states, and Vitest for deterministic math/engine test coverage.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS, Framer Motion, Lucide React, Zustand, Vitest.

**Spec:** `C:\Users\OWNER\source\Eatzy\FlameInFreewall_Tourbillion\docs\superpowers\specs\2026-11-07-flameguard-ai-design.md`

## Global Constraints

- **Language:** All user-facing UI labels, telemetry units, scientific abstracts, and AI prompts are in English (NASA Space Apps standard).
- **Target Directory:** Built strictly inside `c:\Users\OWNER\source\Eatzy\FlameInFreewall_Tourbillion`.
- **Palette Tokens:** Electric Lime (`#D4FC02` / `#E2FF3B`), NASA Royal Navy (`#0B2374` / `#102B82`), Dark Cosmic Surface (`#080C18`), Elevated Card (`#111827` / `#162036`), Light Surface (`#F8F9FA`).
- **Typography:** `Plus Jakarta Sans` for headings & badges, `Inter` for interface controls, `JetBrains Mono` for telemetry and equations.
- **NASA Safety Guardrail:** Scenarios with partial gravity ($0 < g < 1$) or untested fabrics MUST show `EVIDENCE GAP` / `Illustrative` and never claim unconditional safety.
- **Clean Code Standards:** Zero giant monolithic files. All components kept under 250–350 lines, strictly typed, no `any`.

## Review Focus

1. **Partial Gravity Boundary ($0 < g < 1$):** Selecting Lunar ($0.16g$) or Martian ($0.38g$) gravity must trigger `PARTIAL` or `GAP` badges in the Gap Matrix and lock the Predictive Lab with `MODEL OFFLINE`.
2. **Comparison Selection Cap:** Selecting more than 3 studies in the Explorer must prevent overflow, show a toast alert, and cap at 3 items.
3. **Empty/Zero State Safety:** Setting ranking filters to zero or searching non-existent fuels must show a graceful empty state without runtime crash.
4. **Dock Pill Sidebar Responsiveness:** Sidebar must seamlessly collapse to `58px` circle buttons with floating tooltips, and expand to `280px` without layout jumping or text clipping.
5. **Toast Stacking:** Rapid successive triggers of `toast.success` or `toast.error` must queue cleanly inside the Dynamic Island container.

---

### Task 1: Project Initialization, Tech Stack Scaffolding & Design System Tokens

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/types/index.ts`

**Interfaces:**
- Produces: Project root config, Tailwind CSS custom variables, base HTML shell, and global type definitions (`Investigation`, `TestRun`, `EvidenceClaim`, `ScenarioState`).

- [ ] **Step 1: Create configuration files (`package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `.gitignore`)**
- [ ] **Step 2: Install core dependencies (`next`, `react`, `react-dom`, `lucide-react`, `framer-motion`, `zustand`, `tailwindcss`, `vitest`)**
  - Run: `npm install`
- [ ] **Step 3: Setup `src/types/index.ts` declaring types for investigations, test runs, claims, and scenario presets**
- [ ] **Step 4: Create `src/app/globals.css` with Space Apps & Kurzgesagt theme tokens (`--brand-lime: #D4FC02`, `--brand-navy: #0B2374`, `--surface-cosmic: #080C18`)**
- [ ] **Step 5: Verify build baseline**
  - Run: `npm run build` or test compile with `npx tsc --noEmit`

---

### Task 2: Liquid Glass Dynamic Island Toast System & Global Stores

**Files:**
- Create: `src/components/toast/toast-store.ts`
- Create: `src/components/toast/LiquidGlassToast.tsx`
- Create: `src/components/toast/Toaster.tsx`
- Create: `src/components/DynamicIslandToast.tsx`
- Create: `src/store/useWorkspaceStore.ts`
- Create: `src/store/useAiAssistantStore.ts`
- Test: `tests/toastStore.test.ts`
- Test: `tests/workspaceStore.test.ts`

**Interfaces:**
- Consumes: `src/types/index.ts`
- Produces: `toast` trigger object (`toast.success`, `toast.error`, `toast.info`, `toast.warning`), `<Toaster />` component, `useWorkspaceStore`, `useAiAssistantStore`.

- [ ] **Step 1: Write unit tests in `tests/toastStore.test.ts` and `tests/workspaceStore.test.ts`**
  - Test toast creation, dismiss, and 3-item comparison toggle cap in `useWorkspaceStore`.
- [ ] **Step 2: Run test to verify failure**
  - Run: `npx vitest run tests/toastStore.test.ts tests/workspaceStore.test.ts`
- [ ] **Step 3: Implement `toast-store.ts`, `LiquidGlassToast.tsx`, `Toaster.tsx`, and `DynamicIslandToast.tsx` ported from StructPaper**
- [ ] **Step 4: Implement `useWorkspaceStore.ts` (manages comparison list max 3, active filter state, active scenario) and `useAiAssistantStore.ts`**
- [ ] **Step 5: Run tests to verify PASS**
  - Run: `npx vitest run tests/toastStore.test.ts tests/workspaceStore.test.ts`

---

### Task 3: Layout System & StructPaper DockPill Navigation (`AppShell`, `Sidebar`, `Header`)

**Files:**
- Create: `src/components/layout/DockPillButton.tsx`
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/BottomNav.tsx`
- Create: `src/components/layout/AppShell.tsx`
- Create: `src/app/(dashboard)/layout.tsx`

**Interfaces:**
- Consumes: `useWorkspaceStore`, `toast`, Lucide React icons
- Produces: Persistent dashboard shell with animated collapsible sidebar, top header with Space Apps branding, and mobile bottom navigation.

- [ ] **Step 1: Implement `DockPillButton.tsx` featuring Framer Motion spring expansion (`58px` circle to `280px` pill), liquid glass tooltip on hover, and Space Apps Lime glowing active state**
- [ ] **Step 2: Implement `Sidebar.tsx` with top toggle chevron button, navigation links (`/dashboard`, `/explorer`, `/mission`, `/settings`), and quick actions**
- [ ] **Step 3: Implement `Header.tsx` with NASA Space Apps Challenge header, breadcrumbs, status indicator, and quick scenario launcher**
- [ ] **Step 4: Implement `BottomNav.tsx` for mobile viewports**
- [ ] **Step 5: Implement `AppShell.tsx` and `src/app/(dashboard)/layout.tsx` with `<Toaster />` integration**
- [ ] **Step 6: Verify layout rendering without hydration errors**

---

### Task 4: NASA PSI Domain Data & Deterministic Calculation Engines

**Files:**
- Create: `src/data/investigations.ts`
- Create: `src/data/testRuns.ts`
- Create: `src/data/evidenceClaims.ts`
- Create: `src/data/presets.ts`
- Create: `src/lib/combustionMath.ts`
- Create: `src/lib/gapMatrixEngine.ts`
- Create: `src/lib/rankingEngine.ts`
- Test: `tests/combustionMath.test.ts`
- Test: `tests/gapMatrixEngine.test.ts`

**Interfaces:**
- Produces:
  - `INVESTIGATIONS`: 20 curated NASA PSI studies (BASS, ACME, FLEX, SoFIE, CIR, etc.)
  - `TEST_RUNS`: 148+ verified test runs with experimental conditions & telemetry
  - `EVIDENCE_CLAIMS`: 45 peer-reviewed claims with provenance tags (`Measured`, `Modeled`, `Illustrative`)
  - `evaluateGapMatrix(scenario: ScenarioState): GapMatrixResult`
  - `calculateTopicalRankings(scenario: ScenarioState): RankedInvestigation[]`

- [ ] **Step 1: Write unit tests in `tests/combustionMath.test.ts` and `tests/gapMatrixEngine.test.ts`**
  - Verify $0g$ spherical flame output, $1g$ elongation, Lunar $0.16g$ `GAP` detection, and zero-division protection in ranking engine.
- [ ] **Step 2: Run tests to verify failure**
  - Run: `npx vitest run tests/combustionMath.test.ts tests/gapMatrixEngine.test.ts`
- [ ] **Step 3: Populate `src/data/` with NASA PSI datasets (`investigations.ts`, `testRuns.ts`, `evidenceClaims.ts`, `presets.ts`)**
- [ ] **Step 4: Implement `src/lib/combustionMath.ts`, `src/lib/gapMatrixEngine.ts`, and `src/lib/rankingEngine.ts`**
- [ ] **Step 5: Run tests to verify PASS**
  - Run: `npx vitest run tests/combustionMath.test.ts tests/gapMatrixEngine.test.ts`

---

### Task 5: Kurzgesagt Art Style Landing Page (`/`)

**Files:**
- Create: `src/components/landing/LandingHero.tsx`
- Create: `src/components/landing/KurzgesagtFlameScene.tsx`
- Create: `src/components/landing/AtmosphericPhysics.tsx`
- Create: `src/components/landing/MissionControlCTA.tsx`
- Create: `src/components/landing/LandingFooter.tsx`
- Create: `src/app/(landing)/page.tsx`
- Create: `src/app/(landing)/layout.tsx`

**Interfaces:**
- Consumes: Space Apps theme tokens, Framer Motion, Lucide React
- Produces: Responsive cinematic landing page with Kurzgesagt vector illustrations and quick workspace access.

- [ ] **Step 1: Implement top announcement banner ("Space Apps Connect is now open!") and `LandingHero.tsx` with NASA Space Apps Challenge branding and CTA**
- [ ] **Step 2: Implement `KurzgesagtFlameScene.tsx` featuring glowing flat vector illustrations of Earth 1g teardrop vs ISS 0g spherical blue flame with interactive animation**
- [ ] **Step 3: Implement `AtmosphericPhysics.tsx` illustrating the Moon Base flammability trap ($30\%\text{ O}_2$ at $10.2\text{ psia}$ matching sea-level breathing $ppO_2$ while drastically elevating flame spread)**
- [ ] **Step 4: Implement `MissionControlCTA.tsx` and `LandingFooter.tsx`**
- [ ] **Step 5: Assemble `src/app/(landing)/page.tsx` and verify visual smoothness and responsive layout**

---

### Task 6: Research Dashboard Page (`/dashboard`)

**Files:**
- Create: `src/components/dashboard/KpiStatCards.tsx`
- Create: `src/components/dashboard/CuratedStudiesGrid.tsx`
- Create: `src/components/dashboard/DomainBreakdown.tsx`
- Create: `src/components/dashboard/QuickScenarioTrigger.tsx`
- Create: `src/app/(dashboard)/dashboard/page.tsx`

**Interfaces:**
- Consumes: `src/data/investigations.ts`, `src/data/testRuns.ts`, `useWorkspaceStore`, `toast`
- Produces: `/dashboard` route with KPIs, featured investigations, and domain distribution.

- [ ] **Step 1: Implement `KpiStatCards.tsx` with 5 metrics (Total Investigations, Verified Runs, Microgravity Data Points, Evidence Claims, Partial Gravity Gap Notice)**
- [ ] **Step 2: Implement `CuratedStudiesGrid.tsx` using StructPaper `PaperCard` styling with fuel badges and quick actions**
- [ ] **Step 3: Implement `DomainBreakdown.tsx` showing fuel categories (Solid, Droplet, Gas) and gravity regimes**
- [ ] **Step 4: Implement `QuickScenarioTrigger.tsx` providing one-click launch into ISS, Moon, and Mars habitat scenarios**
- [ ] **Step 5: Assemble `src/app/(dashboard)/dashboard/page.tsx` and verify data rendering**

---

### Task 7: Experiment Explorer & Detail Pages (`/explorer` & `/explorer/[id]`)

**Files:**
- Create: `src/components/explorer/ExplorerFiltersBar.tsx`
- Create: `src/components/explorer/InvestigationCard.tsx`
- Create: `src/components/explorer/InvestigationTable.tsx`
- Create: `src/components/explorer/detail/StudyHeader.tsx`
- Create: `src/components/explorer/detail/TestRunsTable.tsx`
- Create: `src/components/explorer/detail/TelemetryPane.tsx`
- Create: `src/components/explorer/detail/ClaimsList.tsx`
- Create: `src/app/(dashboard)/explorer/page.tsx`
- Create: `src/app/(dashboard)/explorer/[id]/page.tsx`

**Interfaces:**
- Consumes: `src/data/investigations.ts`, `src/data/testRuns.ts`, `src/data/evidenceClaims.ts`, `useWorkspaceStore`, `toast`
- Produces: `/explorer` catalog with card/table views and dynamic `/explorer/[id]` detail view.

- [ ] **Step 1: Implement `ExplorerFiltersBar.tsx` with search input, fuel filter, gravity filter, and table/card view toggle**
- [ ] **Step 2: Implement `InvestigationCard.tsx` (PaperCard design) and `InvestigationTable.tsx` (dense table with comparison checkboxes)**
- [ ] **Step 3: Assemble `src/app/(dashboard)/explorer/page.tsx` with pagination/filtering**
- [ ] **Step 4: Implement study detail components: `StudyHeader.tsx`, `TestRunsTable.tsx`, `TelemetryPane.tsx`, and `ClaimsList.tsx`**
- [ ] **Step 5: Assemble `src/app/(dashboard)/explorer/[id]/page.tsx` with tabbed navigation (Overview, Test Runs, Telemetry, Claims, Citations)**

---

### Task 8: Multi-Study Comparison Modal

**Files:**
- Create: `src/components/explorer/ComparisonBar.tsx`
- Create: `src/components/explorer/ComparisonModal.tsx`
- Create: `src/components/explorer/ComparisonColumn.tsx`

**Interfaces:**
- Consumes: `useWorkspaceStore`, `INVESTIGATIONS`, `toast`
- Produces: Floating selection pill and full-screen glass comparison modal for 2–3 studies.

- [ ] **Step 1: Implement `ComparisonBar.tsx` as a floating glass bar at bottom screen when 1+ studies are selected, showing badges and "Compare" button**
- [ ] **Step 2: Implement `ComparisonColumn.tsx` rendering study metadata, oxygen limits, quench thresholds, and flame spread rates side-by-side**
- [ ] **Step 3: Implement `ComparisonModal.tsx` with Framer Motion backdrop blur, parameter delta highlighting, and CSV export action**
- [ ] **Step 4: Integrate comparison triggers into Explorer cards, table rows, and study detail header**

---

### Task 9: Mission Scenario, Evidence Gap Matrix & Predictive Lab (`/mission`)

**Files:**
- Create: `src/components/mission/ScenarioConfigForm.tsx`
- Create: `src/components/mission/ConditionGapMatrix.tsx`
- Create: `src/components/mission/RankedEvidenceList.tsx`
- Create: `src/components/mission/PredictiveLabPanel.tsx`
- Create: `src/app/(dashboard)/mission/page.tsx`

**Interfaces:**
- Consumes: `src/data/presets.ts`, `src/lib/gapMatrixEngine.ts`, `src/lib/rankingEngine.ts`, `useWorkspaceStore`, `toast`
- Produces: `/mission` route providing the unified environment scenario workbench.

- [ ] **Step 1: Implement `ScenarioConfigForm.tsx` with environment presets (ISS, Moon, Mars, Custom) and interactive sliders for gravity, O2%, pressure, material, airflow**
- [ ] **Step 2: Implement `ConditionGapMatrix.tsx` displaying the 6-dimension match audit with `RELATED`, `PARTIAL`, `GAP` badges and NASA safety warning**
- [ ] **Step 3: Implement `RankedEvidenceList.tsx` displaying ranked PSI investigations based on scenario condition relevance**
- [ ] **Step 4: Implement `PredictiveLabPanel.tsx` featuring guarded execution (executes baseline ISS with PMMA with uncertainty intervals; locks on partial gravity with `MODEL OFFLINE`)**
- [ ] **Step 5: Assemble `src/app/(dashboard)/mission/page.tsx` with view switching (Evidence Analysis vs Predictive Lab)**

---

### Task 10: Floating Grounded AI Assistant (RAG Dock)

**Files:**
- Create: `src/components/ai/FloatingAiDock.tsx`
- Create: `src/components/ai/AiDrawer.tsx`
- Create: `src/components/ai/CitationBadge.tsx`
- Create: `src/lib/ragKnowledgeEngine.ts`

**Interfaces:**
- Consumes: `src/data/evidenceClaims.ts`, `src/data/investigations.ts`, `useAiAssistantStore`
- Produces: Persistent floating dock button and contextual research assistant drawer with traceable citations.

- [ ] **Step 1: Implement `src/lib/ragKnowledgeEngine.ts` for offline deterministic retrieval matching queries to NASA PSI claims and studies**
- [ ] **Step 2: Implement `CitationBadge.tsx` displaying clickable source badges (`[BASS-II Run #4]`) with tooltip/modal preview**
- [ ] **Step 3: Implement `FloatingAiDock.tsx` with pulsing glow button at bottom-right**
- [ ] **Step 4: Implement `AiDrawer.tsx` with pre-filled question prompts, chat thread, and citation-backed answer cards**
- [ ] **Step 5: Embed `<FloatingAiDock />` in `AppShell` so it is globally available across all dashboard routes**

---

### Task 11: End-to-End Build Verification, Linting & Polish

**Files:**
- Review: all `src/**` files
- Test: Vitest test suite

**Interfaces:**
- Produces: Production-ready clean build with zero errors.

- [ ] **Step 1: Run complete Vitest test suite**
  - Run: `npx vitest run`
  - Expected: All tests pass.
- [ ] **Step 2: Run TypeScript strict check**
  - Run: `npx tsc --noEmit`
  - Expected: 0 type errors.
- [ ] **Step 3: Run Next.js production build**
  - Run: `npm run build`
  - Expected: Successful static/dynamic compilation of all routes (`/`, `/dashboard`, `/explorer`, `/explorer/[id]`, `/mission`).
- [ ] **Step 4: Final visual inspection and documentation sync**
