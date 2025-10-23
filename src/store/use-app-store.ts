import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type TTheme = 'light' | 'dark';

interface IAppState {
  theme: TTheme;
  sidebarOpen: boolean;

  setTheme: (theme: TTheme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<IAppState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        sidebarOpen: true,
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    )
  )
);
