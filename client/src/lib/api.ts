import type { CoffeeBag, CreateCoffeeBag, UpdateCoffeeBag } from "@provenance/schemas";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:9999";

function getToken() {
  return localStorage.getItem("token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  auth: {
    login: (username: string, password: string) =>
      request<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }),
  },
  coffees: {
    list: () => request<CoffeeBag[]>("/coffees"),
    getOne: (id: number) => request<CoffeeBag>(`/coffees/${id}`),
    create: (data: CreateCoffeeBag) =>
      request<CoffeeBag>("/coffees", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: UpdateCoffeeBag) =>
      request<CoffeeBag>(`/coffees/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    remove: (id: number) =>
      request<void>(`/coffees/${id}`, { method: "DELETE" }),
  },
};
