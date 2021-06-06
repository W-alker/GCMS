import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("views/home/Home");
const User = () => import("views/user/User");
const UserHome = () => import('views/user/UserHome');
const UserChangePwd = () => import('views/user/UserChangePwd');
const UserChangeInfo = () => import('views/user/UserChangeInfo');
const UserRecord = () => import('views/user/UserRecord')
const UserKnowledge= () => import('views/user/UserKnowledge')
const UserRecyclingPoint= () => import('views/user/UserRecyclingPoint')
const UserMailBox = () => import('views/user/UserMailBox')

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
    redirect: '/user/home',
    meta: {
      title: '用户 | 垃圾分类管理系统'
    },
    children: [
      {
        path: '/user/home',
        component: UserHome,
        meta: {
          title: '用户 | 垃圾分类管理系统'
        },
      },
      {
        path: '/user/changePwd',
        component: UserChangePwd,
        meta: {
          title: '修改密码 | 垃圾分类管理系统'
        },
      },
      {
        path: '/user/changeInfo',
        component: UserChangeInfo,
        meta: {
          title: '修改信息 | 垃圾分类管理系统'
        },
      },
      {
        path: '/user/record',
        component: UserRecord,
        meta: {
          title: '分类记录 | 垃圾分类管理系统'
        }
      },
      {
        path: '/user/knowledge',
        component: UserKnowledge,
        meta: {
          title: '分类知识 | 垃圾分类管理系统'
        }
      },
      {
        path: '/user/recyclingPoint',
        component: UserRecyclingPoint,
        meta: {
          title: '回收点 | 垃圾分类管理系统'
        }
      },
      {
        path: '/user/mailBox',
        component: UserMailBox,
        meta: {
          title: '信箱| 垃圾分类管理系统'
        }
      },

    ]
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//动态更改标题
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

export default router;
