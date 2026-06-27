const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

async function request<T>(
  endpoint: string,
  options: RequestInit & RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("auth_token");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    // Try to parse JSON error with fieldErrors
    try {
      const errorJson = await response.json();
      const err = new Error(errorJson.message || `HTTP ${response.status}`) as any;
      if (errorJson.fieldErrors) err.fieldErrors = errorJson.fieldErrors;
      throw err;
    } catch (e: any) {
      if (e.fieldErrors) throw e; // re-throw our enriched error
      // Fallback: plain text
      throw new Error(e.message || `HTTP ${response.status}`);
    }
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
