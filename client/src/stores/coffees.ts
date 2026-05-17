import { defineStore } from "pinia";
import { ref } from "vue";
import type { CoffeeBag, CreateCoffeeBag, UpdateCoffeeBag } from "@provenance/schemas";
import { api } from "@/lib/api";

export const useCoffeesStore = defineStore("coffees", () => {
  const coffees = ref<CoffeeBag[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCoffees() {
    loading.value = true;
    error.value = null;
    try {
      coffees.value = await api.coffees.list();
    } catch (e) {
      error.value = "Failed to fetch coffees";
    } finally {
      loading.value = false;
    }
  }

  async function createCoffee(data: CreateCoffeeBag) {
    const created = await api.coffees.create(data);
    coffees.value.push(created);
    return created;
  }

  async function getOne(id: number) {
    return api.coffees.getOne(id);
  }

  async function updateCoffee(id: number, data: UpdateCoffeeBag) {
    const updated = await api.coffees.update(id, data);
    const index = coffees.value.findIndex(c => c.id === id);
    if (index !== -1) coffees.value[index] = updated;
    return updated;
  }

  async function removeCoffee(id: number) {
    await api.coffees.remove(id);
    coffees.value = coffees.value.filter(c => c.id !== id);
  }

  return { coffees, loading, error, fetchCoffees, createCoffee, updateCoffee, removeCoffee, getOne };
});
