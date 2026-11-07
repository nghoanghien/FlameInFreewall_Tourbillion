# StructPaper Fidelity Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the UI of `FlameInFreewall_Tourbillion` to 100% fidelity with StructPaper (`StructPaper/apps/web`): port the exact LiquidGlass dynamic island toast, Google Sans / Plus Jakarta Sans typography with all unwanted mono removed, minimalist headers matching `/templates`, Eatzy-style large inner-shadow search bar, full-bleed sticky blur toolbar (`-mx-4 px-4` with gradient mask), borderless grayish cards (`bg-gray-200/50 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]`), custom `eatzy-inner` select dropdowns, and card shimmer skeleton loading.

**Architecture:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion spring physics.

## Global Constraints

- Toast system MUST match StructPaper's LiquidGlassToast and Toaster component.
- `font-mono` MUST NOT be used for normal text or metadata. Standard font is Plus Jakarta Sans / Google Sans.
- Page headers MUST be minimalist like StructPaper's templates page (`JournalHubView`).
- Explorer toolbar MUST be full-bleed (`sticky top-0 z-30 -mx-3 px-3 sm:-mx-6 sm:px-6 py-3 pb-5`) with background blur mask.
- Search input MUST use Eatzy inner shadow (`inset 0 0 20px rgba(0,0,0,0.09)`) and large comfortable padding.
- Cards MUST have grayish resting background (`bg-gray-200/50`) without borders, turning white on hover (`hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]`).
- Emerald is strictly forbidden; all accents use Space Apps Electric Lime (`#D4FC02`).
- Custom Select MUST match StructPaper `eatzy-inner` styling.
- Shimmer skeleton loading MUST match StructPaper's `PaperCardShimmer`.
- All files strictly under 300 lines of code.
- 100% test pass rate in Vitest, 0 TypeScript errors, clean production build.

---

### Task 1: Toast System Overhaul (Exact StructPaper LiquidGlass Dynamic Island)

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/components/toast/LiquidGlassToast.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/toast/Toaster.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/toast/toast-store.ts`
- Test: `FlameInFreewall_Tourbillion/tests/toast.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/toastStore.test.ts`

**Interfaces:**
- Consumes: `toastStore` events.
- Produces: StructPaper LiquidGlass dynamic island notification capsules with hover-pause timer, stacking physics, and Space Apps lime theme.

- [ ] **Step 1: Port StructPaper's LiquidGlassToast and Toaster structure**
- [ ] **Step 2: Run toast tests and verify passing**
- [ ] **Step 3: Commit**

```bash
git add src/components/toast/ tests/toast.test.tsx tests/toastStore.test.ts
git commit -m "feat(toast): match StructPaper LiquidGlass dynamic island notification system"
```

---

### Task 2: Typography Overhaul & Templates-Style Minimalist Page Headers

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/app/globals.css`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/dashboard/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/explorer/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/mission/page.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/dashboard/KpiStatCards.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/dashboard.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/explorer.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/mission.test.tsx`

**Interfaces:**
- Consumes: Page routes and typography tokens.
- Produces: Purged `font-mono` from normal labels, minimalist headers matching `/templates` (`h1` with icon and pill badge).

- [ ] **Step 1: Remove `font-mono` from normal labels across dashboard, explorer, and mission**
- [ ] **Step 2: Update page headers to match StructPaper `/templates` (`JournalHubView`)**
- [ ] **Step 3: Run tests and commit**

```bash
git add src/app/\(dashboard\)/ src/components/dashboard/ tests/
git commit -m "style(typography): remove unwarranted mono fonts and align headers to StructPaper templates style"
```

---

### Task 3: Full-Bleed Sticky Filter Toolbar, Large Search Input & Custom Select

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/components/ui/CustomSelect.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/ExplorerFiltersBar.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/explorer/page.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/explorer.test.tsx`

**Interfaces:**
- Consumes: Filter states and search inputs.
- Produces: Full-bleed `sticky top-0 z-30 -mx-3 px-3 sm:-mx-6 sm:px-6` toolbar with blurred backdrop mask, large Eatzy inner-shadow search input, and `eatzy-inner` custom select.

- [ ] **Step 1: Refactor `CustomSelect.tsx` to match StructPaper `variant="eatzy-inner"`**
- [ ] **Step 2: Refactor `ExplorerFiltersBar.tsx` with full-bleed container, larger search bar, and inner shadow**
- [ ] **Step 3: Run tests and commit**

```bash
git add src/components/ui/CustomSelect.tsx src/components/explorer/ExplorerFiltersBar.tsx src/app/\(dashboard\)/explorer/page.tsx tests/explorer.test.tsx
git commit -m "feat(explorer): implement full-bleed sticky toolbar with Eatzy inner-shadow search and custom select"
```

---

### Task 4: Borderless Grayish Cards (`bg-gray-200/50`) with Pure White Hover Elevation

**Files:**
- Modify: `FlameInFreewall_Tourbillion/src/components/dashboard/CuratedStudiesGrid.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/InvestigationCard.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/ConditionGapMatrix.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/mission/PredictiveLabPanel.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/components/explorer/detail/ClaimsList.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/dashboard.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/explorer.test.tsx`
- Test: `FlameInFreewall_Tourbillion/tests/mission.test.tsx`

**Interfaces:**
- Consumes: Card data models.
- Produces: `bg-gray-200/50` resting state with no border, lifting to `hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]` with lime accents.

- [ ] **Step 1: Update cards to `bg-gray-200/50 p-4 sm:p-5 rounded-3xl border-0 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]`**
- [ ] **Step 2: Verify zero emerald, only lime badges**
- [ ] **Step 3: Run tests and commit**

```bash
git add src/components/ tests/
git commit -m "style(cards): convert cards to StructPaper borderless grayish resting state with white hover elevation"
```

---

### Task 5: Loading Shimmer Skeleton System & Full Build Verification

**Files:**
- Create: `FlameInFreewall_Tourbillion/src/components/explorer/InvestigationCardShimmer.tsx`
- Modify: `FlameInFreewall_Tourbillion/src/app/(dashboard)/explorer/page.tsx`
- Test: All tests across the test suite (`npx vitest run`)

**Interfaces:**
- Consumes: Filter loading state.
- Produces: StructPaper shimmer gradient cards during loading / filtering.

- [ ] **Step 1: Create `InvestigationCardShimmer.tsx` with StructPaper shimmer animation**
- [ ] **Step 2: Wire loading state in `explorer/page.tsx` to render shimmer cards**
- [ ] **Step 3: Run full Vitest test suite, TypeScript check, and Next.js build**
- [ ] **Step 4: Commit**

```bash
git add src/ tests/
git commit -m "feat(release): implement StructPaper card shimmer loading skeleton and verify clean build"
```
