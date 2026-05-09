import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  collapsed: boolean
  width: number
  toggleCollapsed: () => void
  setCollapsed: (collapsed: boolean) => void
  setWidth: (width: number) => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      width: 240,
      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      setCollapsed: (collapsed) => set({ collapsed }),
      setWidth: (width) => set({ width }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
)