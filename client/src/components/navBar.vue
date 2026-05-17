<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <nav class="navbar is-dark">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item has-text-white has-text-weight-bold">
          Provenance
        </span>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <button class="button is-light is-small" @click="logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
