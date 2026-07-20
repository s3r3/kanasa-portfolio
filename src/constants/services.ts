export interface ServiceNode {
  id: string;
  label: string;
  x: number;
  y: number;
  image: string;
}

export const MAIN_NODES: ServiceNode[] = [
  { id: 'design', label: 'DESIGN', x: 25, y: 35, image: '/images/3d-design.svg' },
  { id: 'tech', label: 'TECHNOLOGY', x: 32, y: 80, image: '/images/3d-tech.svg' },
  { id: 'strategy', label: 'STRATEGY & BUSINESS', x: 82, y: 28, image: '/images/3d-strategy.svg' },
];

// 40 titik statis (seed deterministik agar tidak ada hydration mismatch)
export const BG_LINES = Array.from({ length: 40 }).map((_, i) => {
  const angle = (i * 9) * (Math.PI / 180);
  const radius = 20 + (i % 25);
  return {
    x: Math.round((50 + Math.cos(angle) * radius) * 1e5) / 1e5,
    y: Math.round((50 + Math.sin(angle) * radius) * 1e5) / 1e5,
  };
});
