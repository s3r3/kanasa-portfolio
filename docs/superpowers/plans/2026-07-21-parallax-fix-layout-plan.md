# Parallax, Layout Fix & Page Transitions — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll parallax, page transitions, and fix layout issues across all 5 pages.

**Architecture:** Leverage existing framer-motion + Lenis infra. New `animations.ts` for shared config, `ParallaxImage` component for scroll-driven parallax, `PageTransition` for route transitions. Mechanical refactor to replace inline easing literals.

**Tech Stack:** Next.js, framer-motion 12, Lenis, zustand

## Global Constraints

- No new dependencies — framer-motion `useScroll`/`useTransform` cover parallax natively
- Existing bg color `#cec9c0` for all loading states
- Import paths use `@/` shortcut
- All new components marked `'use client'` (they use framer-motion hooks)
- `EASE` and `SPRING` exports from `src/lib/animations.ts` are the single source of truth for all easing configs

---

### Task 1: Create Shared Animation Config

**Files:**
- Create: `src/lib/animations.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `EASE.smooth`, `EASE.reveal`, `EASE.spring`, `SPRING.cursor`, `SPRING.parallax`, `SPRING.tilt`

- [ ] **Step 1: Create `src/lib/animations.ts`**

```typescript
export const EASE = {
  smooth: [0.76, 0, 0.24, 1] as [number, number, number, number],
  reveal: [0.22, 1, 0.36, 1] as [number, number, number, number],
  spring: [0.25, 1, 0.5, 1] as [number, number, number, number],
};

export const SPRING = {
  cursor: { damping: 25, stiffness: 400 } as const,
  parallax: { stiffness: 150, damping: 25, mass: 0.5 } as const,
  tilt: { damping: 50, stiffness: 200, mass: 0.5 } as const,
};
```

- [ ] **Step 2: Verify file exists and compiles**

Run: `npx tsc --noEmit src/lib/animations.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/animations.ts
git commit -m "feat: add shared animation config (EASE + SPRING)"
```

---

### Task 2: Fix Double Navbar on About Page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Remove duplicate Navbar import and JSX**

Line 5 `import Navbar from '@/components/layout/Navbar';` — delete
Line 114 `<Navbar />` — delete

- [ ] **Step 2: Verify no Navbar import remains**

```bash
grep -n 'Navbar' src/app/about/page.tsx
```
Expected: No matches

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "fix: remove duplicate Navbar in about page"
```

---

### Task 3: Create ParallaxImage Component

**Files:**
- Create: `src/components/ui/ParallaxImage.tsx`

**Interfaces:**
- Consumes: nothing (self-contained framer-motion `useScroll` + `useTransform`)
- Produces: `<ParallaxImage src alt speed className />` — reusable parallax wrapper

- [ ] **Step 1: Create `src/components/ui/ParallaxImage.tsx`**

```tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ponytail: generic parallax wrapper. speed 0-1. multi-layer support when parallax scenes grow
export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className || ''}`}
      role="img"
      aria-label={alt}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, y }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls -la src/components/ui/ParallaxImage.tsx
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ParallaxImage.tsx
git commit -m "feat: add ParallaxImage component with scroll-driven Y transform"
```

---

### Task 4: Page Transitions + Loading State

**Files:**
- Create: `src/components/providers/PageTransition.tsx`
- Create: `src/app/loading.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `EASE.smooth` from `src/lib/animations.ts`
- Produces: Page transition animation wrapper + loading skeleton

- [ ] **Step 1: Create `src/components/providers/PageTransition.tsx`**

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { EASE } from '@/lib/animations';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: EASE.smooth }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create `src/app/loading.tsx`**

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#efeee8]">
      <div className="text-sm font-mono tracking-widest uppercase text-black/30">
        Loading...
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Modify `src/app/layout.tsx` — wrap children with PageTransition**

Add import:
```typescript
import PageTransition from '@/components/providers/PageTransition';
```

Change the children wrapper from:
```tsx
{children}
```
to:
```tsx
<PageTransition>{children}</PageTransition>
```

- [ ] **Step 4: Verify build**

```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/components/providers/PageTransition.tsx src/app/loading.tsx src/app/layout.tsx
git commit -m "feat: add page transitions and loading skeleton"
```

---

### Task 5: Replace Inline Literals — Layout Components

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/ContactOverlay.tsx`

- [ ] **Step 1: Navbar.tsx — replace local EASE with import**

Add import at top:
```typescript
import { EASE } from '@/lib/animations';
```

Delete local const (line 12):
```typescript
const smoothEase: [number, number, number, number] = [0.76, 0, 0.24, 1];
```

Replace `smoothEase` references with `EASE.smooth` (2 occurrences at existing lines 41, 52).

- [ ] **Step 2: ContactOverlay.tsx — replace inline array**

Add import:
```typescript
import { EASE } from '@/lib/animations';
```

Line 39: `ease: [0.76, 0, 0.24, 1]` → `ease: EASE.smooth`

- [ ] **Step 3: Verify both files compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx src/components/layout/ContactOverlay.tsx
git commit -m "refactor: replace inline easing with shared config in layout components"
```

---

### Task 6: Replace Inline Literals — UI Components

**Files:**
- Modify: `src/components/ui/SplashScreen.tsx`
- Modify: `src/components/ui/ProjectSlider.tsx`
- Modify: `src/components/ui/WorkSection.tsx`
- Modify: `src/components/ui/ServicesSection.tsx`
- Modify: `src/components/ui/WorkDetailTemplate.tsx`
- Modify: `src/components/ui/CareerModal.tsx`

- [ ] **Step 1: SplashScreen.tsx**

Add import:
```typescript
import { EASE } from '@/lib/animations';
```

Replace `[0.76, 0, 0.24, 1]` (exit) → `EASE.smooth`
Replace `[0.22, 1, 0.36, 1]` (animate/exit) → `EASE.reveal`

- [ ] **Step 2: ProjectSlider.tsx**

Add import:
```typescript
import { EASE } from '@/lib/animations';
```

Replace local `const EASE = ...` with delete (line 7). Replace `EASE` usage (line 75) — name conflict means rename local usage or alias. Since we removed the local, the import `EASE` is now the shared one — same name, no other changes needed at usage site.

- [ ] **Step 3: WorkSection.tsx**

Add import:
```typescript
import { EASE, SPRING } from '@/lib/animations';
```

Replace `{ damping: 25, stiffness: 400 }` (cursor spring, line 12) → `SPRING.cursor`
Replace `[0.25, 1, 0.5, 1]` (grid card scale, line 104) → `EASE.spring`

- [ ] **Step 4: ServicesSection.tsx**

Add import:
```typescript
import { SPRING } from '@/lib/animations';
```

Replace `{ damping: 50, stiffness: 200, mass: 0.5 }` (line 16) → `SPRING.tilt`

- [ ] **Step 5: WorkDetailTemplate.tsx**

Add import:
```typescript
import { EASE } from '@/lib/animations';
```

Find the inline `[0.76, 0, 0.24, 1]` in className and replace with reference. Since it's in a Tailwind class string, not JS prop, replace:
```
ease-[cubic-bezier(0.76,0,0.24,1)]
```
This is in a className string — can't use JS import there. Keep as-is; skip this file.

- [ ] **Step 6: CareerModal.tsx**

Add import:
```typescript
import { EASE } from '@/lib/animations';
```

Replace `[0.76, 0, 0.24, 1]` if present. Check the file — CareerModal uses `duration: 0.2` with no custom easing array in the spec. If no inline array, skip.

- [ ] **Step 7: Verify all compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/SplashScreen.tsx src/components/ui/ProjectSlider.tsx src/components/ui/WorkSection.tsx src/components/ui/ServicesSection.tsx src/components/ui/WorkDetailTemplate.tsx src/components/ui/CareerModal.tsx
git commit -m "refactor: replace inline easing with shared config in UI components"
```

---

### Task 7: Replace Inline Literals — Page Files

**Files:**
- Modify: `src/app/work/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/careers/page.tsx`

- [ ] **Step 1: Work page (`src/app/work/page.tsx`)**

Add import:
```typescript
import { EASE, SPRING } from '@/lib/animations';
```

Replace in WorkCard:
- `{ stiffness: 150, damping: 25, mass: 0.5 }` (line 100) → `SPRING.parallax`
- `[0.25, 1, 0.5, 1]` (line 126) → `EASE.spring`
- `[0.25, 1, 0.5, 1]` (line 137) → `EASE.spring`

- [ ] **Step 2: About page — accordion easing**

Add import:
```typescript
import { EASE } from '@/lib/animations';
```

Replace `[0.76, 0, 0.24, 1]` in philosophy accordion (line 282) → `EASE.smooth`

- [ ] **Step 3: Careers page — modal easing**

Add import:
```typescript
import { EASE } from '@/lib/animations';
```

Replace `[0.76, 0, 0.24, 1]` if present. Check file — careers page modals use `duration: 0.2` with no custom easing array. If no inline array, skip.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/app/work/page.tsx src/app/about/page.tsx src/app/careers/page.tsx
git commit -m "refactor: replace inline easing in page components"
```

---

### Task 8: Reinforce Reveal on About Page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Add Reveal import if not present**

Check existing imports — `Reveal` is not used in about page currently (it uses inline framer-motion). Add:
```typescript
import Reveal from '@/components/ui/Reveal';
```

- [ ] **Step 2: Wrap stats section with Reveal**

Find the stats section (lines 181-196, the 80/150/200+ row). Wrap each stat `<div>` with `<Reveal delay={i * 0.1}>`:

Before:
```tsx
<div className="flex flex-col mb-12 md:mb-0 bg-[#cec9c0] px-4">
  <span className="text-6xl ...">80</span>
  <span className="text-xs ...">Projects</span>
</div>
<div className="flex flex-col mb-8 md:mb-0 bg-[#cec9c0] px-4 pb-12">
  <span className="text-6xl ...">150</span>
  <span className="text-xs ...">Awards</span>
</div>
<div className="flex flex-col bg-[#cec9c0] px-4 pt-12 border-t border-black">
  <span className="text-6xl ...">200+</span>
  <span className="text-xs ...">Clients</span>
</div>
```

After:
```tsx
<Reveal delay={0} className="flex flex-col mb-12 md:mb-0 bg-[#cec9c0] px-4">
  <span className="text-6xl ...">80</span>
  <span className="text-xs ...">Projects</span>
</Reveal>
<Reveal delay={0.1} className="flex flex-col mb-8 md:mb-0 bg-[#cec9c0] px-4 pb-12">
  <span className="text-6xl ...">150</span>
  <span className="text-xs ...">Awards</span>
</Reveal>
<Reveal delay={0.2} className="flex flex-col bg-[#cec9c0] px-4 pt-12 border-t border-black">
  <span className="text-6xl ...">200+</span>
  <span className="text-xs ...">Clients</span>
</Reveal>
```

- [ ] **Step 3: Wrap capability list with Reveal**

Find the capability list (lines 169-178). Add `Reveal` to the container or title:
```tsx
<Reveal className="col-span-1 md:col-span-6 flex flex-col font-mono text-xs md:text-sm uppercase tracking-wide">
```

- [ ] **Step 4: Wrap team section with Reveal**

Find team section (lines 199-216). Add `Reveal` to the section header and grid:
```tsx
<Reveal className="col-span-1 md:col-span-10">
  <h2 className="text-3xl ...">...</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <Reveal key={item} delay={(item % 4) * 0.1}>
        <div className="flex flex-col gap-2">
          ...
        </div>
      </Reveal>
    ))}
  </div>
</Reveal>
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add scroll-reveal animations to about page sections"
```

---

### Task 9: Consolidate Scroll Progress + ParallaxImage on About Page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Merge two `useScrollStore.subscribe` into one**

Currently two effects (lines 67-76 for zoom, lines 97-106 for puzzle). Merge:

Replace the two separate effects with one:
```tsx
useEffect(() => {
  const unsub = useScrollStore.subscribe(({ scrollY }) => {
    // Zoom reveal progress
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.abs(rect.top);
      setZoomProgress(Math.min(1, Math.max(0, total > 0 ? scrolled / total : 0)));
    }
    // Puzzle parallax progress
    if (puzzleRef.current) {
      const rect = puzzleRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.abs(rect.top);
      setPuzzleProgress(Math.min(1, Math.max(0, total > 0 ? scrolled / total : 0)));
    }
  });
  return unsub;
}, []);
```

Delete the second effect (lines 97-106).

- [ ] **Step 2: Replace puzzle bg parallax with ParallaxImage Import**

Add import:
```typescript
import ParallaxImage from '@/components/ui/ParallaxImage';
```

Replace the puzzle background div (lines 225-229):
Before:
```tsx
<motion.div
  animate={{ y: bgParallax }}
  className="absolute inset-0 w-full h-[140%] -top-[-20%] bg-cover bg-center -z-10"
  style={{ backgroundImage: 'url(/images/puzzle-bg.jpg)' }}
/>
```

After:
```tsx
<ParallaxImage
  src="/images/puzzle-bg.jpg"
  alt="Puzzle background"
  speed={0.4}
  className="absolute inset-0 w-full h-[140%] -top-[-20%] -z-10"
/>
```

- [ ] **Step 3: Remove unused puzzle state/refs**

Remove `puzzleProgress` useState if no longer referenced anywhere (check — `bgParallax` was the only consumer and it's gone now).
Remove `bgParallax` const (line 108) since `ParallaxImage` handles it internally.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "refactor: consolidate scroll subscriptions, replace puzzle bg with ParallaxImage"
```

---

### Task 10: Replace WorkCard Parallax with ParallaxImage

**Files:**
- Modify: `src/app/work/page.tsx`

- [ ] **Step 1: Add ParallaxImage import**

```typescript
import ParallaxImage from '@/components/ui/ParallaxImage';
```

- [ ] **Step 2: Replace WorkCard manual parallax with ParallaxImage**

Inside `WorkCard` function (lines 91-152):

Remove the `useMotionValue`, `useSpring` imports if they become unused at top level.
Remove lines 99-112 (ref, motionValue, spring, useEffect subscription).

Replace the image div (lines 130-138):
Before:
```tsx
<div className="relative w-full bg-neutral-300 overflow-hidden ${item.aspect}">
  <motion.div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${item.image})`, y: smoothY }}
    whileHover={{ scale: 1.08 }}
    transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
  />
</div>
```

After:
```tsx
<ParallaxImage
  src={item.image}
  alt={item.client}
  speed={0.15}
  className={`relative w-full ${item.aspect}`}
/>
```

Add `whileHover` effect back via a wrapper div:
```tsx
<div className="relative w-full overflow-hidden">
  <motion.div
    whileHover={{ scale: 1.08 }}
    transition={{ duration: 0.7, ease: EASE.spring }}
    className="relative w-full"
  >
    <ParallaxImage
      src={item.image}
      alt={item.client}
      speed={0.15}
      className={item.aspect}
    />
  </motion.div>
</div>
```

Actually, cleaner: keep the overflow-hidden div and whileHover on the ParallaxImage's inner div. But ParallaxImage already has its own structure. Let me simplify — just wrap:

```tsx
<div className="relative w-full overflow-hidden ${item.aspect}">
  <motion.div
    whileHover={{ scale: 1.08 }}
    transition={{ duration: 0.7, ease: EASE.spring }}
  >
    <ParallaxImage src={item.image} alt={item.client} speed={0.15} className="w-full h-full" />
  </motion.div>
</div>
```

- [ ] **Step 3: Clean up unused imports**

After the change, `useMotionValue` and `useSpring` may no longer be used in `WorkCard`. Check and remove if so.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "refactor: replace WorkCard manual parallax with ParallaxImage"
```

---

## Verification

1. `npm run dev` — no TS/build errors
2. Navigate all 5 pages — each page transition animates (fade in)
3. Scroll each page — parallax images move at different speed than scroll
4. About page — no double navbar, stats/capabilities/team section fade in on scroll
5. Work page — cards still have parallax effect on scroll, grid/list toggle works
6. Services + Careers — no regression
