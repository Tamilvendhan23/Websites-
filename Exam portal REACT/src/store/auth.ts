import { create } from 'zustand';
import { User } from '../types';
import { setAuthToken, removeAuthToken, setUser as setStoredUser, removeUser as removeStoredUser } from '../lib/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user, token) => {
    setAuthToken(token);
    setStoredUser(user);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    removeAuthToken();
    removeStoredUser();
    set({ user: null, isAuthenticated: false });
  },
}));