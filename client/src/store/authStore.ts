import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  email: string | null;

  setAccessToken: (token: string) => void;
  setEmail: (email: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  email: null,

  setAccessToken: (token) =>
    set({
      accessToken: token,
    }),

  setEmail: (email) =>
    set({
      email: email,
    }),

  clearAuth: () =>
    set({
      accessToken: null,
      email: null,
    }),
}));
