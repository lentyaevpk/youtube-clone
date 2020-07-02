import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/LandingPage.vue")
  },
  {
    path: "/login",
    component: () => import("../components/LoginForm.vue"),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/register",
    component: () => import("../components/RegisterForm.vue"),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/video/upload",
    component: () => import("../components/VideoUpload.vue")
  },
  {
    path: "/video/:videoId",
    component: () => import("../views/VideoPage.vue")
  },
  {
    path: "/liked",
    component: () => import("../views/LikedVideosPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else if (!store.getters.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
