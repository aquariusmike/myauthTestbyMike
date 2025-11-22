import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  { path: "/", name: "Home", component: Home },

  // 🔥 THIS FIX ENSURES /home never loads
  { path: "/home", redirect: "/" },

  { path: "/login", name: "Login", component: Login },
  { path: "/dashboard", name: "Dashboard", component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protect dashboard only
router.beforeEach(async (to, from, next) => {
  if (to.path !== "/dashboard") return next();

  try {
    const res = await fetch("http://localhost:4000/auth/user", {
      credentials: "include"
    });

    const data = await res.json();

    if (data.user) next();      // verified
    else next("/login");        // no session
  } catch {
    next("/login");
  }
});

export default router;
