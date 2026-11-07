# Light Theme StructPaper Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the UI of `FlameInFreewall_Tourbillion` from dark mode into the clean, light aesthetic of StructPaper (`#F8F9FA` background, `#FFFFFF` cards, `#1A1A1A` typography, sticky sidebar dock) with Space Apps Electric Lime (`#D4FC02`) and Royal Navy (`#0B2374`) theme colors, strictly matching the features of the NASA PSI prototype and removing all unrequested routes (like `/settings`).

**Architecture:** Next.js 15 App Router with Tailwind CSS design tokens matching StructPaper (`--bg-primary: #F8F9FA`, `--bg-card: #FFFFFF`, `--text-main: #1A1A1A`, `--border-color: #EAECEF`), Plus Jakarta Sans font, fixed sticky dock navigation with `DockPillButton` liquid glass pills, crisp white `PaperCard` layouts for investigations and telemetry, light glass modal for study comparison, and an electric lime accented AI drawer.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, Testing Library.

**Spec:** NASA PSI Microgravity Combustion Science Documentation (`FlameInFreewall_Tourbillion/docs/index (3).html`, `FlameInFreewall_Tourbillion/docs/FlameGuard_AI_Local (2).html`), StructPaper Design System (`StructPaper/apps/web`), Space Apps Theme Photos 1 & 2.

## Global Constraints

- Background MUST be StructPaper light `#F8F9FA`; cards MUST be `#FFFFFF` with `rounded-3xl` and `border border-gray-100`; text MUST be `#1A1A1A` with muted `#64748B`. No full dark-mode dashboard surfaces.
- Primary accent MUST be Space Apps Electric Lime (`#D4FC02`) and Navy Accent (`#0B2374`) instead of StructPaper green (`#78C841`).
- Navigation Dock MUST be sticky (`h-[calc(100vh-1.5rem)] sticky top-3 my-3 ml-3.5 z-30`) and never scroll away with content.
- Route `/settings` MUST be deleted. Navigation MUST strictly expose `/dashboard`, `/explorer`, and `/mission`.
- All physics calculations, 20 NASA PSI investigations, 160 test runs, 45 claims, gap matrix engine, ranking engine, and RAG retrieval MUST remain 100% functional and intact.
- Keep all files strictly under 300 lines of code.
- Vitest test suite must pass with 100% success rate, and `npm run build` must compile cleanly.

## Review Focus

1. Sticky Dock Positioning: Dock stays fixed at `top-3` while `/explorer` or `/dashboard` scrolls vertically.
2. Color Contrast: Text is readable with `#1A1A1A` on `#FFFFFF` / `#F8F9FA`, and dark `#0A1128` text on `#D4FC02` lime pills.
3. Removed `/settings`: No links or routes exist for settings; navigation consists solely of Dashboard, Explorer, Mission.
4. Light Telemetry & Charts: SVG/Recharts curves and axes are high contrast against white card surfaces (`#1A1A1A` text, `#0B2374` / `#F97316` curves, `#E2E8F0` grid).
5. Modal & Drawer Overlay: Comparison modal and AI drawer open smoothly over `#F8F9FA` with backdrop blur without layout shift.

---

### Task 1: Design Tokens, Typography & AppShell Light Theme

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/app/globals.css`
- Modify: `FlameInFreewall_Tourbillion/src/app/layout.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/layout/AppShell.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/design-tokens.test.tsx`

**Interfaces:**
- Consumes: Tailwind classes and CSS variables in `globals.css`.
- Produces: Base `:root` variables (`--bg-primary: #F8F9FA`, `--bg-card: #FFFFFF`, `--brand-lime: #D4FC02`, `--brand-navy: #0B2374`), light body background, and light `AppShell`.

- [ ] **Step 1: Write test for light theme CSS variables and AppShell structure**

```typescript
// tests/design-tokens.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@/components/layout/AppShell';

describe('Design Tokens & AppShell', () => {
  it('renders AppShell with StructPaper light background #F8F9FA', () => {
    const { container } = render(
      <AppShell>
        <div data-testid="content">Dashboard Content</div>
      </AppShell>
    );
    const shellRoot = container.firstElementChild;
    expect(shellRoot?.className).toContain('bg-[#F8F9FA]');
    expect(shellRoot?.className).toContain('text-[#1A1A1A]');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/design-tokens.test.tsx`
Expected: FAIL due to missing or dark mode classes.

- [ ] **Step 3: Update `globals.css`, `layout.tsx`, and `AppShell.tsx`**

Set `:root` tokens:
`--bg-primary: #F8F9FA`, `--bg-card: #FFFFFF`, `--text-main: #1A1A1A`, `--text-muted: #64748B`, `--border-color: #EAECEF`, `--brand-lime: #D4FC02`, `--brand-navy: #0B2374`.
Update `body` in `layout.tsx` to `bg-[#F8F9FA] text-[#1A1A1A] antialiased`.
Update `AppShell.tsx` to wrap children in `<div className="min-h-screen flex flex-col sm:flex-row bg-[#F8F9FA] text-[#1A1A1A]">`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/design-tokens.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/layout/AppShell.tsx tests/design-tokens.test.tsx
git commit -m "style(tokens): setup StructPaper light theme tokens and AppShell light background"
```

---

### Task 2: Sticky Sidebar Navigation Dock & Header (Strict 3 Modules, No Settings)

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/components/layout/Sidebar.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/layout/DockPillButton.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/layout/Header.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/layout/BottomNav.tsx`
- Delete: `FlameInFreewall_Tourbillion/src/app/(dashboard)/settings`
- Delete: `FlameInFreewall_Tourbillion/tests/settings.test.tsx`
- Modify: `FlameInFreewall_Tourbillion/tests/navigation.test.tsx`

**Interfaces:**
- Consumes: Next.js `usePathname()`, Framer Motion.
- Produces: Sticky vertical dock with 3 nav items (`/dashboard`, `/explorer`, `/mission`), light glass inactive pills, electric lime active pill, clean light header.

- [ ] **Step 1: Write test for sticky dock and removed settings route**

```typescript
// tests/navigation.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '@/components/layout/Sidebar';

describe('Sidebar Navigation Dock', () => {
  it('renders sticky navigation dock with only 3 PSI modules and no settings', () => {
    render(<Sidebar />);
    expect(screen.getByLabelText(/Research Dashboard/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Experiment Explorer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mission Scenario/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Settings/i)).toBeNull();
    expect(screen.queryByLabelText(/Cài đặt/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/navigation.test.tsx`
Expected: FAIL because settings currently exists or dock is not sticky.

- [ ] **Step 3: Refactor Sidebar, DockPillButton, Header, BottomNav and delete settings**

1. Remove `/settings` from `NAV_ITEMS` and `ROUTE_LABELS`.
2. Delete directory `src/app/(dashboard)/settings` and `tests/settings.test.tsx`.
3. Configure `Sidebar.tsx` with:
   `className="hidden sm:flex flex-col items-start justify-between h-[calc(100vh-1.5rem)] sticky top-3 my-3 ml-3.5 flex-shrink-0 z-30 select-none transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"`
4. Configure `DockPillButton.tsx`:
   - Inactive: `bg-white/80 hover:bg-white backdrop-blur-md shadow-[0_0_14px_rgba(0,0,0,0.08),0_0_3px_rgba(0,0,0,0.04)] text-zinc-700 hover:text-zinc-950 border border-white/80 hover:scale-[1.02]`
   - Active: `bg-[#D4FC02] border-4 border-lime-200 shadow-[0_0_18px_rgba(212,252,2,0.40)] text-zinc-950 scale-[1.01]`
5. Configure `Header.tsx`:
   `bg-white/80 backdrop-blur-md border-b border-gray-100/80 text-[#1A1A1A]`, Space Apps Challenge badge with navy background `#0B2374` and lime text `#D4FC02`.
6. Configure `BottomNav.tsx`:
   `bg-white/90 backdrop-blur-md border-t border-gray-100 text-zinc-700`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/navigation.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/ tests/navigation.test.tsx
git rm -rf src/app/\(dashboard\)/settings tests/settings.test.tsx
git commit -m "feat(nav): convert dock to sticky StructPaper pills with Space Apps lime theme and remove settings"
```

---

### Task 3: Research Dashboard Light Mode Refactor

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/dashboard/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/dashboard/KpiStatCards.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/dashboard/CuratedStudiesGrid.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/dashboard/DomainBreakdown.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/dashboard/QuickScenarioTrigger.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/dashboard.test.tsx`

**Interfaces:**
- Consumes: `investigations` dataset, `testRuns` dataset, `useWorkspaceStore`.
- Produces: StructPaper light dashboard view with white rounded-3xl KPI cards, PaperCard curated grid, light domain breakdown bars.

- [ ] **Step 1: Write test for light dashboard rendering**

```typescript
// tests/dashboard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/(dashboard)/dashboard/page';

describe('Dashboard Page Light Theme', () => {
  it('renders KPI stats and curated studies with light white cards and dark text', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Microgravity Combustion Science/i)).toBeInTheDocument();
    expect(screen.getByText(/20/i)).toBeInTheDocument(); // 20 investigations
    expect(screen.getByText(/160/i)).toBeInTheDocument(); // 160 test runs
  });
});
```

- [ ] **Step 2: Run test to verify it runs against current code**

Run: `npx vitest run tests/dashboard.test.tsx`

- [ ] **Step 3: Refactor Dashboard components to StructPaper light cards**

1. `KpiStatCards.tsx`: Replace dark cards with `bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all`. Metrics in `text-zinc-950 font-extrabold text-2xl`.
2. `CuratedStudiesGrid.tsx`: Style items as StructPaper `PaperCard`s (`bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]`), domain tags in `bg-blue-50 text-[#0B2374] border border-blue-100 font-bold`.
3. `DomainBreakdown.tsx`: Light card with navy blue and electric lime progress bars.
4. `QuickScenarioTrigger.tsx`: White card with electric lime CTA button (`bg-[#D4FC02] text-zinc-950 hover:bg-[#c3e802] font-extrabold rounded-2xl shadow-md`).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/dashboard.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/\(dashboard\)/dashboard/page.tsx src/components/dashboard/ tests/dashboard.test.tsx
git commit -m "style(dashboard): refactor KPI cards, domain breakdown and curated grid to StructPaper light cards"
```

---

### Task 4: Experiment Explorer Light Mode Refactor

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/explorer/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/ExplorerFiltersBar.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/InvestigationCard.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/InvestigationTable.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/ParameterDeltaSummary.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/explorer.test.tsx`

**Interfaces:**
- Consumes: `investigations` dataset, search query, filter state, view mode (`grid` | `table`).
- Produces: Light filter bar matching `PaperFiltersBar`, white investigation cards matching `PaperCard`, clean light data table.

- [ ] **Step 1: Write test for Explorer light filter bar and card rendering**

```typescript
// tests/explorer.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExplorerPage from '@/app/(dashboard)/explorer/page';

describe('Explorer Page Light Theme', () => {
  it('renders light search bar, filter tabs, and investigation cards', () => {
    render(<ExplorerPage />);
    expect(screen.getByPlaceholderText(/Search investigations/i)).toBeInTheDocument();
    expect(screen.getByText(/All Domains/i)).toBeInTheDocument();
    expect(screen.getByText(/FLEX/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify current state**

Run: `npx vitest run tests/explorer.test.tsx`

- [ ] **Step 3: Refactor Explorer components to StructPaper light aesthetic**

1. `ExplorerFiltersBar.tsx`:
   - Filter tabs: `bg-gray-100/80 p-1 rounded-2xl`, active tab `bg-white text-zinc-950 font-bold shadow-xs`, inactive `text-zinc-600 hover:text-zinc-950`.
   - Search input: `bg-white border border-gray-200 text-zinc-900 placeholder:text-zinc-400 rounded-2xl shadow-2xs`.
   - View mode toggle: `bg-gray-100/80 rounded-2xl p-1`.
2. `InvestigationCard.tsx`:
   - Exact StructPaper `PaperCard` shape: `bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer`.
   - Domain badge: `bg-blue-50 text-[#0B2374] border border-blue-100 px-2.5 py-0.5 rounded-full font-bold text-xs`.
   - Apparatus badge: `bg-lime-50 text-lime-900 border border-lime-200 px-2 py-0.5 rounded-md text-xs font-semibold`.
3. `InvestigationTable.tsx`:
   - Light table container: `bg-white rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden`.
   - Header: `bg-gray-50/90 text-zinc-600 font-bold text-xs uppercase tracking-wider`.
   - Row: `border-b border-gray-100 hover:bg-gray-50/70 text-zinc-800 transition-colors`.
4. `ParameterDeltaSummary.tsx`: Light chips with `bg-gray-100 border border-gray-200 text-zinc-800`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/explorer.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/\(dashboard\)/explorer/page.tsx src/components/explorer/ tests/explorer.test.tsx
git commit -m "style(explorer): refactor filters bar, investigation cards and table to StructPaper light aesthetic"
```

---

### Task 5: Study Detail & Telemetry Light Mode Refactor

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/explorer/[id]/StudyDetailClient.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/StudyHeader.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/TestRunsTable.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/TelemetryPane.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/ChamberOverviewTab.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/ClaimsList.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/PsiExportTab.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/study-detail.test.tsx`

**Interfaces:**
- Consumes: `investigation` ID, `testRuns` for investigation, telemetry curves, evidence claims.
- Produces: Crisp white study detail page with high contrast telemetry charts and clean data tabs.

- [ ] **Step 1: Write test for Study Detail light view**

```typescript
// tests/study-detail.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StudyDetailClient } from '@/app/(dashboard)/explorer/[id]/StudyDetailClient';
import { INVESTIGATIONS } from '@/data/investigations';

describe('Study Detail Light Theme', () => {
  it('renders study detail header, tabs, and test runs table with white cards and dark text', () => {
    const study = INVESTIGATIONS[0];
    render(<StudyDetailClient investigation={study} />);
    expect(screen.getByText(study.name)).toBeInTheDocument();
    expect(screen.getByText(/Test Runs/i)).toBeInTheDocument();
    expect(screen.getByText(/Chamber Overview/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify current state**

Run: `npx vitest run tests/study-detail.test.tsx`

- [ ] **Step 3: Refactor Study Detail components to StructPaper light style**

1. `StudyHeader.tsx`: Light white hero card `bg-white rounded-3xl border border-gray-100 p-6 shadow-xs`, Space Apps Electric Lime badge, NASA investigation ID in `#0B2374`.
2. Tabs in `StudyDetailClient.tsx`: `bg-gray-100/80 rounded-2xl p-1`, active tab `bg-white text-zinc-950 font-bold shadow-xs`.
3. `TestRunsTable.tsx`: White container with light borders, clean status indicators.
4. `TelemetryPane.tsx`: White card `bg-white rounded-3xl border border-gray-100 p-5 shadow-xs`, dark axis lines (`#CBD5E1`), dark tick labels (`#475569`), curve lines in NASA Navy (`#0B2374`) and vibrant Flame Amber/Lime (`#F97316` / `#84CC16`).
5. `ChamberOverviewTab.tsx`, `ClaimsList.tsx`, `PsiExportTab.tsx`: Clean white cards with light borders and `#1A1A1A` text.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/study-detail.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/\(dashboard\)/explorer/\[id\]/StudyDetailClient.tsx src/components/explorer/detail/ tests/study-detail.test.tsx
git commit -m "style(detail): refactor study header, test runs table, and telemetry charts to light mode"
```

---

### Task 6: Comparison Modal & Mission Scenario Light Mode Refactor

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/ComparisonModal.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/mission/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/ScenarioConfigForm.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/ScenarioPresetSelector.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/ConditionGapMatrix.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/RankedEvidenceList.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/PredictiveLabPanel.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/mission.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/comparison.test.tsx`

**Interfaces:**
- Consumes: `useWorkspaceStore` comparison list and scenario state, `gapMatrixEngine`, `rankingEngine`, `predictiveLabEngine`.
- Produces: Eatzy/StructPaper light comparison modal, white scenario configuration cards, light Gap Matrix status badges, predictive lab models.

- [ ] **Step 1: Write tests for light Comparison Modal and Mission Scenario**

```typescript
// tests/mission.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MissionPage from '@/app/(dashboard)/mission/page';

describe('Mission Scenario Light Theme', () => {
  it('renders scenario configuration and gap matrix with light white cards and badges', () => {
    render(<MissionPage />);
    expect(screen.getByText(/Mission Scenario Planning/i)).toBeInTheDocument();
    expect(screen.getByText(/Condition Gap Matrix/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify current state**

Run: `npx vitest run tests/mission.test.tsx tests/comparison.test.tsx`

- [ ] **Step 3: Refactor ComparisonModal and Mission components to light mode**

1. `ComparisonModal.tsx`:
   - Backdrop: `bg-zinc-950/40 backdrop-blur-md`.
   - Modal container: `bg-white rounded-3xl border border-gray-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] text-[#1A1A1A] max-w-5xl w-full p-6`.
   - Comparison columns: light headers `bg-gray-50 border border-gray-200 rounded-2xl p-4`.
2. `ScenarioConfigForm.tsx` & `ScenarioPresetSelector.tsx`:
   - Inputs: `bg-white border border-gray-200 text-zinc-900 rounded-2xl focus:border-lime-500 focus:ring-2 focus:ring-lime-100 shadow-2xs`.
   - Preset buttons: `bg-gray-100 hover:bg-gray-200 text-zinc-800 rounded-2xl px-4 py-2 text-xs font-bold`.
   - Action buttons: Space Apps Electric Lime (`bg-[#D4FC02] text-zinc-950 hover:bg-[#c3e802] font-bold rounded-2xl`).
3. `ConditionGapMatrix.tsx`:
   - Card: `bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]`.
   - Badges:
     - `GAP`: `bg-rose-50 text-rose-700 border border-rose-200 font-bold px-2.5 py-1 rounded-full text-xs`
     - `PARTIAL`: `bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2.5 py-1 rounded-full text-xs`
     - `RELATED`: `bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-1 rounded-full text-xs`
4. `RankedEvidenceList.tsx`: White cards with score badges.
5. `PredictiveLabPanel.tsx`: White card with physics predictive model gauges in NASA Navy and Electric Lime.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/mission.test.tsx tests/comparison.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/explorer/ComparisonModal.tsx src/app/\(dashboard\)/mission/page.tsx src/components/mission/ tests/mission.test.tsx tests/comparison.test.tsx
git commit -m "style(mission): refactor comparison modal, scenario form, gap matrix, and predictive lab to light theme"
```

---

### Task 7: Floating Grounded AI Assistant & Toast Light Mode Refactor

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/components/ai/FloatingAiDock.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/ai/AiDrawer.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/ai/AiMessageItem.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/ai/CitationBadge.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/toast/LiquidGlassToast.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/DynamicIslandToast.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/ai-assistant.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/toast.test.tsx`

**Interfaces:**
- Consumes: `useAiAssistantStore`, `ragKnowledgeEngine`, `useToastStore`.
- Produces: Floating AI button with NASA Navy / Electric Lime accents, white backdrop-blur AI drawer, high-contrast message bubbles, StructPaper liquid glass toasts.

- [ ] **Step 1: Write test for AI Assistant light drawer and Floating dock**

```typescript
// tests/ai-assistant.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FloatingAiDock } from '@/components/ai/FloatingAiDock';
import { AiDrawer } from '@/components/ai/AiDrawer';

describe('AI Assistant Light Theme', () => {
  it('renders floating dock and light drawer with crisp white styling and dark text', () => {
    render(
      <>
        <FloatingAiDock />
        <AiDrawer />
      </>
    );
    expect(screen.getByLabelText(/Open FlameGuard AI/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify current state**

Run: `npx vitest run tests/ai-assistant.test.tsx tests/toast.test.tsx`

- [ ] **Step 3: Refactor AI Dock, Drawer, Message bubbles and Toasts to light mode**

1. `FloatingAiDock.tsx`:
   `bg-[#0B2374] text-[#D4FC02] hover:bg-[#152E85] shadow-[0_10px_30px_rgba(11,35,116,0.30)] rounded-full p-4 flex items-center gap-2 border-2 border-lime-300 font-extrabold cursor-pointer`.
2. `AiDrawer.tsx`:
   `bg-white/95 backdrop-blur-xl border-l border-gray-200 shadow-2xl text-[#1A1A1A] w-[420px] max-w-full flex flex-col`.
   Header: Space Apps Navy background `#0B2374` with Electric Lime `#D4FC02` title and close button.
   Input: `bg-gray-50 border border-gray-200 rounded-2xl text-zinc-900 placeholder:text-zinc-400`.
3. `AiMessageItem.tsx`:
   - User message: `bg-gray-100 text-zinc-900 rounded-2xl rounded-tr-xs p-3.5`.
   - Assistant message: `bg-white border border-gray-200 text-zinc-900 shadow-xs rounded-2xl rounded-tl-xs p-3.5`.
4. `CitationBadge.tsx`:
   `bg-lime-50 border border-lime-300 text-lime-950 font-bold px-2 py-0.5 rounded-full text-xs hover:bg-lime-100`.
5. `LiquidGlassToast.tsx` & `DynamicIslandToast.tsx`:
   StructPaper liquid glass toast: `bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.12)] text-zinc-900 rounded-3xl p-4`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/ai-assistant.test.tsx tests/toast.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ai/ src/components/toast/ src/components/DynamicIslandToast.tsx tests/ai-assistant.test.tsx tests/toast.test.tsx
git commit -m "style(ai): refactor floating dock, drawer, and toasts to StructPaper light aesthetic"
```

---

### Task 8: Landing Page Polish & Full Test Suite / Build Verification

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/app/(landing)/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/landing/LandingHero.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/landing/MissionControlCTA.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/landing/LandingFooter.tsx`
- Test: All tests across the test suite (`npx vitest run`)

**Interfaces:**
- Consumes: Landing components, Kurzgesagt flame artwork, navigation CTA to `/dashboard`.
- Produces: Vibrant Kurzgesagt art style landing page with Space Apps Lime CTA buttons and full test / production build verification.

- [ ] **Step 1: Verify landing page Kurzgesagt styling and Space Apps CTA**

Ensure landing page features the rich Kurzgesagt flat vector art style (cosmic dark backdrop, glowing neon gradients, vibrant vector shapes) as requested for the landing page in Photos 3, 4, 5, with Space Apps Electric Lime buttons directing users into the clean StructPaper light dashboard (`/dashboard`).

- [ ] **Step 2: Run full Vitest test suite**

Run: `npx vitest run`
Expected: 100% tests pass (all test files pass).

- [ ] **Step 3: Run TypeScript typecheck**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Run Next.js production build**

Run: `npm run build`
Expected: Build succeeds with all routes statically generated.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(landing\)/ src/components/landing/
git commit -m "feat(release): polish landing page with Kurzgesagt vector art style and verify clean build"
```
