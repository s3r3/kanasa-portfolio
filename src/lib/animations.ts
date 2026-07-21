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
