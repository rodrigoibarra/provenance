<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCoffeesStore } from "@/stores/coffees";

const router = useRouter();
const store = useCoffeesStore();

const form = ref({
  roaster: "",
  origin: "",
  variety: "",
  process: "",
  farm: "",
  producer: "",
  status: "active" as "active" | "finished",
});

const loading = ref(false);
const error = ref<string | null>(null);

async function handleSubmit() {
  loading.value = true;
  error.value = null;
  try {
    const created = await store.createCoffee({
      roaster: form.value.roaster || null,
      origin: form.value.origin || null,
      variety: form.value.variety || null,
      process: form.value.process || null,
      farm: form.value.farm || null,
      producer: form.value.producer || null,
      status: form.value.status,
    });
    router.push({ name: "coffee", params: { id: created.id } });
  } catch {
    error.value = "Failed to create coffee bag";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title">Add Coffee Bag</h1>
        </div>
        <div class="level-right">
          <RouterLink to="/coffees" class="button">Back</RouterLink>
        </div>
      </div>

      <div class="box">
        <div v-if="error" class="notification is-danger is-light mb-4">
          {{ error }}
        </div>

        <div class="columns is-multiline">
          <div class="column is-half">
            <div class="field">
              <label class="label">Roaster</label>
              <div class="control">
                <input v-model="form.roaster" class="input" type="text" placeholder="Roaster" />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Origin</label>
              <div class="control">
                <input v-model="form.origin" class="input" type="text" placeholder="Origin" />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Variety</label>
              <div class="control">
                <input v-model="form.variety" class="input" type="text" placeholder="Variety" />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Process</label>
              <div class="control">
                <input v-model="form.process" class="input" type="text" placeholder="Process" />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Farm</label>
              <div class="control">
                <input v-model="form.farm" class="input" type="text" placeholder="Farm" />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Producer</label>
              <div class="control">
                <input v-model="form.producer" class="input" type="text" placeholder="Producer" />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Status</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="form.status">
                    <option value="active">Active</option>
                    <option value="finished">Finished</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button
              class="button is-primary"
              :class="{ 'is-loading': loading }"
              @click="handleSubmit"
            >
              Add Coffee Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
