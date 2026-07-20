import { create } from "zustand";

interface UIState {
  isContactOpen: boolean;
  toggleContact: () => void;
  closeContact: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isContactOpen: false,
  toggleContact: () => set((state) => ({ isContactOpen: !state.isContactOpen })),
  closeContact: () => set({ isContactOpen: false }),
}));
