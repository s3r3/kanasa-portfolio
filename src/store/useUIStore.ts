import { create } from "zustand";

interface UIState {
  isContactOpen: boolean;
  theme: 'light' | 'dark';
  toggleContact: () => void;
  closeContact: () => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isContactOpen: false,
  theme: 'light',
  toggleContact: () => set((state) => ({ isContactOpen: !state.isContactOpen })),
  closeContact: () => set({ isContactOpen: false }),
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      return { theme: next };
    }),
}));
