<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import navBar from "@/components/navBar.vue";

const auth = useAuthStore();
</script>

<template>
  <navBar v-if="auth.isAuthenticated" />
  <RouterView />
</template>
