<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const username = ref("");
const password = ref("");
const error = ref<string | null>(null);
const loading = ref(false);

async function handleLogin() {
  error.value = null;
  loading.value = true;
  try {
    await auth.login(username.value, password.value);
    router.push({ name: "coffees" });
  } catch {
    error.value = "Invalid credentials";
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-4">
            <h1 class="title has-text-centered">Provenance</h1>
            <div class="box">
              <div v-if="error" class="notification is-danger is-light">
                {{ error }}
              </div>
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    v-model="username"
                    class="input"
                    type="text"
                    placeholder="Username"
                    @keyup.enter="handleLogin"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    v-model="password"
                    class="input"
                    type="password"
                    placeholder="Password"
                    @keyup.enter="handleLogin"
                  />
                </div>
              </div>
              <button
                class="button is-primary is-fullwidth"
                :class="{ 'is-loading': loading }"
                @click="handleLogin"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
