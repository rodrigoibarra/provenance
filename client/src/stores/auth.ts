import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "@/lib/api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token"));

  const isAuthenticated = computed(() => !!token.value);

  async function login(username: string, password: string) {
	const res = await api.auth.login(username, password);
	token.value = res.token;
	localStorage.setItem("token", res.token);
  }

  function logout() {
	token.value = null;
	localStorage.removeItem("token");
  }

  return { token, isAuthenticated, login, logout };
});