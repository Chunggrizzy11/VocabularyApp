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

  const apiError = error as { data?: { fieldErrors?: Record<string, string>; message?: string } };
  if (apiError.data && apiError.data.fieldErrors) {
    const err = new Error(apiError.data.message || "Request failed") as FieldError;
    err.fieldErrors = apiError.data.fieldErrors;
    return err;
  }

  return null;
}

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post<{ success: boolean; data: AuthResponse }>("/auth/login", { email, password });
      const data = response.data;
      if (data.fieldErrors) {
        const err = new Error(data.message || "Login failed") as FieldError;
        err.fieldErrors = data.fieldErrors;
        throw err;
      }
      return { token: data.token, user: data.user };
    } catch (error: unknown) {
      const fieldError = extractFieldErrors(error);
      if (fieldError) throw fieldError;
      throw error;
    }
  },

  async register(name: string, email: string, password: string) {
    try {
      const response = await api.post<{ success: boolean; data: AuthResponse }>("/auth/register", { name, email, password });
      const data = response.data;
      if (data.fieldErrors) {
        const err = new Error(data.message || "Registration failed") as FieldError;
        err.fieldErrors = data.fieldErrors;
        throw err;
      }
      return { token: data.token, user: data.user };
    } catch (error: unknown) {
      const fieldError = extractFieldErrors(error);
      if (fieldError) throw fieldError;
      throw error;
    }
  },

  getMe: () =>
    api.get<{ success: boolean; data: UserData }>("/auth/me").then(r => r.data),

  getUsers: () =>
    api.get<{ success: boolean; data: UsersResponse[] }>("/auth/users").then(r => r.data),
};