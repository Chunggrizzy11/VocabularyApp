import { api } from "./api";

interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: "user" | "admin";
    };
  };
}

interface UserResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
}

interface UsersResponse {
  success: boolean;
  data: Array<{
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
  }>;
}

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password });
      // The API currently returns errors in a specific format
      if (!response.success) {
        if (response.fieldErrors) {
          const err = new Error(response.message || "Login failed");
          err.fieldErrors = response.fieldErrors;
          throw err;
        }
        throw new Error(response.message || "Login failed");
      }
      return response.data as AuthResponse['data'];
    } catch (error) {
      throw error;
    }
  },

  async register(name: string, email: string, password: string) {
    try {
      const response = await api.post("/auth/register", { name, email, password });
      if (!response.success) {
        if (response.fieldErrors) {
          const err = new Error(response.message || "Registration failed");
          err.fieldErrors = response.fieldErrors;
          throw err;
        }
        throw new Error(response.message || "Registration failed");
      }
      return response.data as AuthResponse['data'];
    } catch (error) {
      throw error;
    }
  },

  getMe: () =>
    api.get<UserResponse>("/auth/me").then(r => r.data),

  getUsers: () =>
    api.get<UsersResponse>("/auth/users").then(r => r.data),
};
