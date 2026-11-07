# StructPaper Precision Polish & Dock Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the sticky sidebar dock by removing `overflow-x: hidden` from `html, body`, add spring physics and Framer Motion hover/active interactions to dock pills, remove the unneeded top header, shrink page headings down to clean plain-background headers without card frames, align all cards to StructPaper's exact card styling and hover scale (with zero emerald, only lime), add StructPaper's end-of-list indicator, and implement the sticky backdrop-blur filter toolbar with custom selects on Explorer.

**Architecture:** Next.js 15 App Router with Tailwind CSS, Framer Motion spring animations (`type: 'spring', stiffness: 350, damping: 26`), StructPaper design patterns from `StructPaper/apps/web`, Space Apps Electric Lime (`#D4FC02`) theme color, and zero unrequested routes or headers.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest.

## Global Constraints

- Sticky Dock MUST remain stationary in the viewport during vertical scrolling. `overflow-x: hidden` MUST NOT be placed on `html` or `body`.
- Top Header (`Header.tsx`) MUST be removed from `AppShell`.
- All page headings MUST be compact and placed directly on the `#F8F9FA` background without heavy card wrappers.
- Dock pills MUST use Framer Motion with spring physics (`whileHover={{ scale: 1.04 }}`, `whileTap={{ scale: 0.96 }}`, spring morph).
- All cards MUST use StructPaper style with `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`.
- Emerald green is strictly forbidden; only Space Apps Electric Lime (`#D4FC02`, `lime-500`, `lime-50`, `lime-900`) is allowed.
- Explorer toolbar MUST be `sticky top-3 z-20 bg-[#F8F9FA]/90 backdrop-blur-md` with custom search and custom select dropdowns.
- Lists MUST have the StructPaper end-of-list indicator.
- All files strictly under 300 lines of code.
- 100% test pass rate in Vitest, 0 TypeScript errors, clean production build.

---

### Task 1: Fix Sticky Dock, Spring Physics & Remove Top Header

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/app/globals.css`
- Modify: `FlameInFreewall_Tourbillion/src/components/layout/AppShell.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/layout/Sidebar.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/layout/DockPillButton.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/layout.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/navigation.test.tsx`

**Interfaces:**
- Consumes: Framer Motion `motion.aside`, `motion.button`.
- Produces: True sticky dock anchored to viewport during scrolling, spring physics on expand/collapse, no top header.

- [ ] **Step 1: Write test verifying AppShell has no top Header and Sidebar has sticky classes**

```typescript
// tests/layout.test.tsx
it('renders AppShell without top header and Sidebar with sticky self-start', () => {
  render(<AppShell><div>Content</div></AppShell>);
  expect(screen.queryByLabelText(/Flame in Freefall Mission Control Header/i)).toBeNull();
  const aside = screen.getByLabelText(/FlameGuard AI primary navigation dock/i);
  expect(aside.className).toContain('sticky');
  expect(aside.className).toContain('self-start');
});
```

- [ ] **Step 2: Remove `overflow-x: hidden` from `globals.css`**

In `src/app/globals.css`, remove `overflow-x: hidden` from `html, body`.

- [ ] **Step 3: Remove `<Header />` from `AppShell.tsx`**

Remove `<Header />` import and rendering in `src/components/layout/AppShell.tsx`.

- [ ] **Step 4: Update `Sidebar.tsx` and `DockPillButton.tsx` with Framer Motion spring physics**

Use `motion.aside` in `Sidebar.tsx` with:
`className="hidden sm:flex flex-col items-start justify-between h-[calc(100vh-1.5rem)] sticky top-3 my-3 ml-3.5 flex-shrink-0 z-30 select-none self-start"`
Use `transition={{ type: 'spring', stiffness: 350, damping: 26 }}`.
In `DockPillButton.tsx`, use `motion.button` with `whileHover={{ scale: 1.04 }}`, `whileTap={{ scale: 0.96 }}`.

- [ ] **Step 5: Run tests & commit**

```bash
git add src/app/globals.css src/components/layout/ tests/
git commit -m "fix(dock): restore viewport stickiness, add spring physics to dock, and remove top header"
```

---

### Task 2: Compact Page Headings on Plain Background (No Heavy Card Frames)

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/dashboard/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/explorer/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/mission/page.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/dashboard.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/explorer.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/mission.test.tsx`

**Interfaces:**
- Consumes: Page routes.
- Produces: Clean, compact page headers placed directly on the `#F8F9FA` background without heavy card wrappers.

- [ ] **Step 1: Update page heading in `dashboard/page.tsx`**

Remove `<section className="rounded-3xl p-6 sm:p-8 bg-white border border-gray-100 shadow-...">`.
Replace with sleek, compact heading:
```tsx
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
  <div className="space-y-1">
    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#D4FC02]/20 border border-[#D4FC02]/60 text-zinc-950 text-[11px] font-mono font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0B2374]" />
      NASA Space Apps 2026 · Flame in Freefall
    </div>
    <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
      Microgravity Combustion Science &amp; Fire Safety Intelligence
    </h1>
    <p className="text-xs text-[#64748B]">
      Unified mission workspace synthesizing 20 NASA PSI investigations, 160 test runs, and 45 evidence claims.
    </p>
  </div>
  ... compact buttons
</div>
```

- [ ] **Step 2: Update page heading in `explorer/page.tsx` and `mission/page.tsx`**

Apply the same compact plain-background styling.

- [ ] **Step 3: Run tests & commit**

```bash
git add src/app/\(dashboard\)/ tests/
git commit -m "style(layout): shrink page hero blocks to compact headers on plain background"
```

---

### Task 3: Sticky Explorer Filters Toolbar & Custom Select Dropdowns

**Files:**
- Create: `FlameInFreewall_Tourbillion/src/components/ui/CustomSelect.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/ExplorerFiltersBar.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/explorer/page.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/explorer.test.tsx`

**Interfaces:**
- Consumes: Filter states (domain, fuel, apparatus, search query, view mode).
- Produces: `sticky top-3 z-20 bg-[#F8F9FA]/90 backdrop-blur-md` toolbar, Eatzy inner-shadow search input, custom animated Select dropdowns with hidden native `<select>` for accessibility and tests.

- [ ] **Step 1: Create `CustomSelect.tsx`**

Implement lightweight custom select with `motion.div` dropdown and hidden native `<select>` for test passability.

- [ ] **Step 2: Refactor `ExplorerFiltersBar.tsx`**

Make toolbar `sticky top-3 z-20 bg-[#F8F9FA]/90 backdrop-blur-md pt-2 pb-3`.
Eatzy search input with inner shadow and clear icon.
Pill filter chips with `motion.button`.

- [ ] **Step 3: Run tests & commit**

```bash
git add src/components/ui/CustomSelect.tsx src/components/explorer/ExplorerFiltersBar.tsx src/app/\(dashboard\)/explorer/page.tsx tests/explorer.test.tsx
git commit -m "feat(explorer): implement sticky backdrop-blur toolbar with custom select and Eatzy search"
```

---

### Task 4: StructPaper Card Styling & Zero-Emerald Lime Enforcement

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/components/dashboard/CuratedStudiesGrid.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/InvestigationCard.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/ConditionGapMatrix.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/PredictiveLabPanel.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/TestRunsTable.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/dashboard.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/explorer.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/mission.test.tsx`

**Interfaces:**
- Consumes: Card data models.
- Produces: StructPaper cards with `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`, soft shadows, and strictly Lime (no emerald).

- [ ] **Step 1: Update cards to StructPaper hover and tap scale**

Apply `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}` via Framer Motion.
Replace any `emerald-` or `green-` classes with `lime-` (e.g. `bg-lime-50 text-lime-900 border-lime-200`, `text-lime-700`).

- [ ] **Step 2: Run tests & commit**

```bash
git add src/components/ tests/
git commit -m "style(cards): apply StructPaper card hover scale and enforce lime accents without emerald"
```

---

### Task 5: End-of-List Indicators & Verification Across all Test Suites & Build

**Files:**
- Create: `FlameInFreewall_Tourbillion/src/components/ui/EndOfListIndicator.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/explorer/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/mission/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/TestRunsTable.tsx`
- Test: All test suites (`npx vitest run`)

**Interfaces:**
- Consumes: List length.
- Produces: StructPaper end of list indicator ("Bạn đã xem hết danh sách...").

- [ ] **Step 1: Create `EndOfListIndicator.tsx`**

Implement StructPaper's exact end-of-list component:
```tsx
<div className="py-10 flex items-center justify-center gap-4 opacity-50 select-none">
  <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent w-24" />
  <div className="flex flex-col items-center gap-1.5">
    <CheckCircle2 className="w-4 h-4 text-zinc-500" />
    <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider">
      {text || 'Bạn đã xem hết danh sách'}
    </span>
  </div>
  <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent w-24" />
</div>
```

- [ ] **Step 2: Add `EndOfListIndicator` to Explorer, Mission, and TestRunsTable**

- [ ] **Step 3: Run Vitest, TypeScript, and Next.js Build**

Verify 100% test pass rate, 0 TS errors, clean build.

- [ ] **Step 4: Commit**

```bash
git add src/ tests/
git commit -m "feat(release): add StructPaper end of list indicators and verify full test suite"
```
