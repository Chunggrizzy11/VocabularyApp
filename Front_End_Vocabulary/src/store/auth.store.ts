import { create } from "zustand";
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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem("auth_token"),
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null, fieldErrors: null });
    try {
      const data = await authService.login(email, password);
      localStorage.setItem("auth_token", data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
    } catch (e: unknown) {
      const err = e as any;
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      set({ error: message, fieldErrors: err.fieldErrors || null, isLoading: false });
      throw e;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null, fieldErrors: null });
    try {
      await authService.register(name, email, password);
      // Không auto-login sau register — user tự đăng nhập lại
      set({ isLoading: false });
    } catch (e: unknown) {
      const err = e as any;
      const message = err instanceof Error ? err.message : "Đăng ký thất bại";
      set({ error: message, fieldErrors: err.fieldErrors || null, isLoading: false });
      throw e;
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    set({ user: null, token: null, isAuthenticated: false });
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
}));
