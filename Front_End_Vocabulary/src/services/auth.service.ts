import { api } from "./api";

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
  fieldErrors?: Record<string, string>;
  message?: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface UsersResponse {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

interface FieldError extends Error {
  fieldErrors?: Record<string, string>;
}

function extractFieldErrors(error: unknown): FieldError | null {
  const axiosError = error as { response?: { data?: AuthResponse } };
  if (axiosError.response?.data && axiosError.response.data.fieldErrors) {
    const err = new Error(axiosError.response.data.message || "Request failed") as FieldError;
    err.fieldErrors = axiosError.response.data.fieldErrors;
    return err;
  }
  return null;
}

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post<AuthResponse>("/auth/login", { email, password });
      if (response.fieldErrors) {
        const err = new Error(response.message || "Login failed") as FieldError;
        err.fieldErrors = response.fieldErrors;
        throw err;
      }
      return { token: response.token, user: response.user };
    } catch (error: unknown) {
      const fieldError = extractFieldErrors(error);
      if (fieldError) throw fieldError;
      throw error;
    }
  },

  async register(name: string, email: string, password: string) {
    try {
      const response = await api.post<AuthResponse>("/auth/register", { name, email, password });
      if (response.fieldErrors) {
        const err = new Error(response.message || "Registration failed") as FieldError;
        err.fieldErrors = response.fieldErrors;
        throw err;
      }
      return { token: response.token, user: response.user };
    } catch (error: unknown) {
      const fieldError = extractFieldErrors(error);
      if (fieldError) throw fieldError;
      throw error;
    }
  },

  getMe: () =>
    api.get<UserData>("/auth/me"),

  getUsers: () =>
    api.get<UsersResponse[]>("/auth/users"),
};