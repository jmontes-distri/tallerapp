import { create } from 'zustand'

export const useStore = create((set) => ({
  // Auth
  user: null,
  isLoggedIn: false,
  userRole: null, // 'taller' o 'cliente'
  
  setUser: (user, role) => set({ user, isLoggedIn: !!user, userRole: role }),
  logout: () => set({ user: null, isLoggedIn: false, userRole: null }),
  
  // Taller Data
  tallerData: null,
  setTallerData: (data) => set({ tallerData: data }),
  
  // Solicitud actual
  currentRequest: null,
  setCurrentRequest: (request) => set({ currentRequest: request }),
}))
