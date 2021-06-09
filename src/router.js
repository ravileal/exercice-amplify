import { createWebHistory, createRouter } from "vue-router";
import { Auth } from "aws-amplify";

import Home from "./components/Home";
import Autenticacao from "./components/Autenticacao";

const history = createWebHistory();
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/autenticacao",
    component: Autenticacao,
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
          path: "/autenticacao",
        });
      });
  }
  next();
});

export default router;
