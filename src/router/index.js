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
    meta: {
      title: '登录 | 垃圾分类管理系统'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: User,    
    meta: {
      title: '用户 | 垃圾分类管理系统'
    }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//动态更改标题
router.beforeEach((to,from,next) => {
  window.document.title = to.meta.title
  next()
})

export default router;
