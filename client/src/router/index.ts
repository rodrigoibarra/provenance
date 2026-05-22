import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory('/app/'),
  routes: [
  {
    path: "/login",
    name: "login",
    component: ()=> import ("@/views/loginView.vue"),
  },
  {
    path:"/coffees",
    name:"coffees",
    component: () => import ("@/views/coffeesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:"/coffees/add",
    name:"coffee-add",
    component: () => import ("@/views/coffeeAddView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:"/coffees/:id",
    name: "coffee",
    component: ()=>  import ("@/views/coffeeView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:"/coffees/:id/edit",
    name: "coffee-edit",
    component: ()=>  import ("@/views/coffeeEditView.vue"),
    meta: { requiresAuth: true },
  },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login" };
  }

  if (to.name === "login" && auth.isAuthenticated) {
    return { name: "coffees" };
  }
});

export default router;
