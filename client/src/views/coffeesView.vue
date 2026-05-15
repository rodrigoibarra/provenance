<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useCoffeesStore } from "@/stores/coffees";

const store = useCoffeesStore();

onMounted(() => {
  store.fetchCoffees();
});
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title">Coffee Bags</h1>
        </div>
        <div class="level-right">
          <RouterLink to="/coffees/add" class="button is-primary">
            Add Coffee
          </RouterLink>
        </div>
      </div>

      <div v-if="store.loading" class="has-text-centered">
        <span class="is-size-5">Loading...</span>
      </div>

      <div v-else-if="store.error" class="notification is-danger is-light">
        {{ store.error }}
      </div>

      <div v-else>
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Roaster</th>
              <th>Origin</th>
              <th>Variety</th>
              <th>Process</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coffee in store.coffees" :key="coffee.id">
              <td>{{ coffee.roaster ?? "—" }}</td>
              <td>{{ coffee.origin ?? "—" }}</td>
              <td>{{ coffee.variety ?? "—" }}</td>
              <td>{{ coffee.process ?? "—" }}</td>
              <td>
                <span
                  class="tag"
                  :class="coffee.status === 'active' ? 'is-success' : 'is-light'"
                >
                  {{ coffee.status }}
                </span>
              </td>
              <td>
                <RouterLink :to="`/coffees/${coffee.id}`" class="button is-small">
                  View
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
