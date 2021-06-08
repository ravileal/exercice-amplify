import { createWebHistory, createRouter } from "vue-router";
import { Auth } from "aws-amplify";

import Home from "./components/Home";
import Login from "./components/Login";

const history = createWebHistory();
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = new createRouter({
  history,
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    Auth.currentAuthenticatedUser()
      .then(() => {
        next();
      })
      .catch(() => {
        next({
          path: "/login",
        });
      });
  }
  next();
});

export default router;
