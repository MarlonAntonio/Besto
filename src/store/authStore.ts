import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be handled securely on the server

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: (password: string) => {
    if (password === ADMIN_PASSWORD) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false }),
}));