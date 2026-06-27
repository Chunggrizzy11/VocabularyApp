import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/auth.service";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: localStorage.getItem("auth_token"),
      isAuthenticated: false,
      isLoading: true,
      error: null,
      fieldErrors: null as Record<string, string> | null,

      login: (email: string, password: string) => {
        return new Promise<void>(async (resolve, reject) => {
          set({ isLoading: true, error: null, fieldErrors: null });
          try {
            const data = await authService.login(email, password);
            localStorage.setItem("auth_token", data.token);
            set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
            resolve();
          } catch (e: unknown) {
            const err = e as Error & { fieldErrors?: Record<string, string> };
            const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
            set({ error: message, fieldErrors: err.fieldErrors || null, isLoading: false });
            reject(e);
          }
        });
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null, fieldErrors: null });
        try {
          await authService.register(name, email, password);
          set({ isLoading: false });
        } catch (e: unknown) {
          const err = e as Error & { fieldErrors?: Record<string, string> };
          const message = err instanceof Error ? err.message : "Đăng ký thất bại";
          set({ error: message, fieldErrors: err.fieldErrors ?? null, isLoading: false });
          throw e;
        }
      },

      logout: () => {
        localStorage.removeItem("auth_token");
        set({ user: null, token: null, isAuthenticated: false, fieldErrors: null });
      },

      checkAuth: async () => {
        const token = get().token;
        if (!token) {
          set({ isLoading: false, isAuthenticated: false });
          return;
        }
        try {
          const data = await authService.getMe();
          set({ user: data, isAuthenticated: true, isLoading: false });
        } catch {
          localStorage.removeItem("auth_token");
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      },

      clearError: () => set({ error: null, fieldErrors: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated, fieldErrors: state.fieldErrors }),
    }
  )
);