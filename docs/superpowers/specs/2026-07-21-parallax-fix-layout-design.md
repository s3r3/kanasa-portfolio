# Parallax, Layout Fix & Page Transitions

## 1. Shared Animation Config

**File:** `src/lib/animations.ts` (new)

Consolidate 3 easing curves + 3 spring configs that are currently inlined across 11 files.

```ts
export const EASE = {
  smooth: [0.76, 0, 0.24, 1] as [number, number, number, number],
  reveal: [0.22, 1, 0.36, 1] as [number, number, number, number],
  spring: [0.25, 1, 0.5, 1] as [number, number, number, number],
};

export const SPRING = {
  cursor: { damping: 25, stiffness: 400 },
  parallax: { stiffness: 150, damping: 25, mass: 0.5 },
  tilt: { damping: 50, stiffness: 200, mass: 0.5 },
};
```

Replace all inline array literals in every component with imports from this file.

## 2. Fix Double Navbar (About Page)

**File:** `src/app/about/page.tsx`

Remove `<Navbar />` (line 114) — root layout already renders it. The about page has a rogue duplicate.

## 3. ParallaxImage Component

**File:** `src/components/ui/ParallaxImage.tsx` (new)

Generic scroll parallax wrapper using framer-motion `useScroll` + `useTransform` (native, no extra lib):

- Props: `src`, `alt`, `speed` (default 0.3), `className`
- Renders `<div ref={targetRef}>` + `<motion.div style={{ y }}>` with parallax translateY driven by `scrollYProgress` from `['start end', 'end start']`
- `speed` controls intensity: 0.3 = subtle, 0.6 = dramatic

Replacements:
- WorkCard inline parallax (useScrollStore subscribe) → `ParallaxImage speed={0.15}`
- About puzzle bg (`animate={{ y: bgParallax }}`) → `ParallaxImage speed={0.4}`

## 4. Page Transitions

**File:** `src/components/providers/PageTransition.tsx` (new)

- Uses `AnimatePresence mode="wait"` with `key={pathname}`
- Fade + slide-up on enter, fade on exit
- Duration 0.4s, `EASE.smooth`

**File:** `src/app/layout.tsx` — wrap `{children}` with `<PageTransition>`

**File:** `src/app/loading.tsx` (new) — minimal skeleton, same bg color + centered spinner/text

## 5. Reinforce Reveal on About Page

**File:** `src/app/about/page.tsx`

Sections currently without scroll-reveal animation — wrap with `<Reveal>`:
- Stats row (80/150/200+)
- Capability list (Strategy, Solid UI/UX, ...)
- Team grid section header + member cards

## 6. Consolidated Scroll Progress (About Page)

**File:** `src/app/about/page.tsx`

Currently two separate `useScrollStore.subscribe` effects for zoom-reveal and puzzle parallax. Merge into one effect that updates both `zoomProgress` and `puzzleProgress` from a single subscription.

## 7. Replace Inline Literals

Replace every occurrence of the 3 easing curves with `EASE.smooth` / `EASE.reveal` / `EASE.spring` in:

- `Navbar.tsx` — local `smoothEase` → delete, import `EASE.smooth`
- `ContactOverlay.tsx` — inline array → `EASE.smooth`
- `SplashScreen.tsx` — inline arrays → `EASE.smooth`, `EASE.reveal`
- `ProjectSlider.tsx` — local `EASE` → import `EASE.smooth`
- `WorkSection.tsx` — inline array → `EASE.spring`
- `WorkDetailTemplate.tsx` — inline array → `EASE.smooth`
- `ServicesSection.tsx` — spring config → `SPRING.tilt`
- `WorkCard` (work/page.tsx) — inline arrays → `EASE.spring`, `SPRING.parallax`
- `AboutPage` accordion — inline array → `EASE.smooth`
- `CareerModal` / careers/page.tsx modal — inline → `EASE.smooth`

## Files Modified

| File | Action |
|------|--------|
| `src/lib/animations.ts` | **NEW** |
| `src/components/ui/ParallaxImage.tsx` | **NEW** |
| `src/components/providers/PageTransition.tsx` | **NEW** |
| `src/app/loading.tsx` | **NEW** |
| `src/app/layout.tsx` | Add PageTransition wrapper |
| `src/app/about/page.tsx` | Remove double Navbar, reinforce Reveal, consolidate scroll, replace inline literals |
| `src/app/work/page.tsx` | WorkCard → ParallaxImage, replace inline literals |
| `src/components/layout/Navbar.tsx` | Import EASE from animations |
| `src/components/layout/ContactOverlay.tsx` | Import EASE from animations |
| `src/components/ui/SplashScreen.tsx` | Import EASE from animations |
| `src/components/ui/ProjectSlider.tsx` | Import EASE from animations, delete local const |
| `src/components/ui/WorkSection.tsx` | Import EASE/SPRING from animations |
| `src/components/ui/ServicesSection.tsx` | Import SPRING from animations |
| `src/components/ui/WorkDetailTemplate.tsx` | Import EASE from animations |
| `src/components/ui/CareerModal.tsx` | Import EASE from animations |

## Verification

1. `npm run dev` — no TS/build errors
2. Navigate all 5 pages — each page transition animates (fade in)
3. Scroll each page — parallax images move at different speed than scroll
4. About page — no double navbar, stats/capabilities/team section fade in on scroll
5. Work page — cards still have parallax effect on scroll, grid/list toggle works
6. Services + Careers — hero looks right, no regression
7. Lighthouse — no CLS regression from page transition
