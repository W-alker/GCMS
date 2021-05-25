import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("views/home/Home");
const User = () => import("views/user/UserHome");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
