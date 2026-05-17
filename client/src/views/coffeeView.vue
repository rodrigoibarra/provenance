<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useCoffeesStore } from "@/stores/coffees";
import type { CoffeeBag } from "@provenance/schemas";

const route = useRoute();
const router = useRouter();
const store = useCoffeesStore();

const coffee = ref<CoffeeBag | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    coffee.value = await store.getOne(id);
  } catch {
    error.value = "Coffee bag not found";
  } finally {
    loading.value = false;
  }
});

async function handleDelete() {
  if (!coffee.value) return;
  if (!confirm("Are you sure you want to delete this coffee bag?")) return;
  await store.removeCoffee(coffee.value.id);
  router.push({ name: "coffees" });
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div v-if="loading" class="has-text-centered">
        <span class="is-size-5">Loading...</span>
      </div>

      <div v-else-if="error" class="notification is-danger is-light">
        {{ error }}
      </div>

      <div v-else-if="coffee">
        <div class="level">
          <div class="level-left">
            <h1 class="title">{{ coffee.roaster ?? "Unknown Roaster" }}</h1>
          </div>
          <div class="level-right">
            <div class="buttons">
              <RouterLink :to="`/coffees/${coffee.id}/edit`" class="button is-warning">
                Edit
              </RouterLink>
              <button class="button is-danger" @click="handleDelete">
                Delete
              </button>
              <RouterLink to="/coffees" class="button">
                Back
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="box">
          <div class="columns is-multiline">
            <div class="column is-half">
              <p class="heading">Roaster</p>
              <p>{{ coffee.roaster ?? "—" }}</p>
            </div>
            <div class="column is-half">
              <p class="heading">Origin</p>
              <p>{{ coffee.origin ?? "—" }}</p>
            </div>
            <div class="column is-half">
              <p class="heading">Variety</p>
              <p>{{ coffee.variety ?? "—" }}</p>
            </div>
            <div class="column is-half">
              <p class="heading">Process</p>
              <p>{{ coffee.process ?? "—" }}</p>
            </div>
            <div class="column is-half">
              <p class="heading">Farm</p>
              <p>{{ coffee.farm ?? "—" }}</p>
            </div>
            <div class="column is-half">
              <p class="heading">Producer</p>
              <p>{{ coffee.producer ?? "—" }}</p>
            </div>
            <div class="column is-half">
              <p class="heading">Status</p>
              <span class="tag" :class="coffee.status === 'active' ? 'is-success' : 'is-light'">
                {{ coffee.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
