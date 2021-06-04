<template>
  <el-container class="user">
    <el-header height="var(--head-height)">
      <head-bar></head-bar>
    </el-header>

    <el-aside :width="navbar_width">
      <nav-bar
        :title="'用户管理界面'"
        :profile="userInfo.profile"
        :data="navbar_menu"
      >
      </nav-bar>
    </el-aside>

    <el-main>
       <router-view></router-view>  
    </el-main>
  </el-container>
</template>
<script>
import HeadBar from "components/HeadBar";
import NavBar from "components/NavBar";

import { checkToken, initInfo } from "network/user";

export default {
  components: { HeadBar, NavBar },
  name: "User",
  data() {
    return {
      userInfo: {
        name: "",
        profile: "",
        email: "",
        phone: "",
      },
      navbar_width: "200px",
      navbar_menu: [
        {
          id: 1,
          router: '/user/home',
          label: `首页`,
          icon: "fa fa-home",
          children: [],
        },
        {
          id: 2,
          label: "个人中心",
          icon: "fa fa-user-circle",
          children: [
            {
              id: 3,
              router: '/user/changePwd',
              label: "修改密码",
              icon: "fa fa-key",
            },
            {
              id: 4,
              router: '/user/changeInfo',
              label: "修改个人信息",
              icon: "fa fa-vcard",
            },
          ],
        },
        {
          id: 5,
          label: "垃圾分类管理",
          icon: "fa fa-trash",
          children: [
            {
              id: 6,
              router: '/user/',
              label: "垃圾分类情况",
              icon: "fa fa-table",
            },
            {
              id: 7,
              router: '/user/',
              label: "分类知识查询",
              icon: "fa fa-search",
            },
            {
              id: 8,
              router: '/user/',
              label: "垃圾回收点查询",
              icon: "fa fa-map-marker",
            },
          ],
        },
        {
          id: 9,
          router: '/user/mailbox',
          label: "个人信箱",
          icon: "fa fa-envelope",
          children: [],
        },
      ],
    };
  },
  created() {
    checkToken()
      .then((res) => {
        console.log(res.msg);
        initInfo().then((data) => {
          this.userInfo = data;
        });
      })
      .catch((err) => {
        console.log(err);
        alert("登录已过期，请重新登录");
        localStorage.removeItem("autoLogin");
        this.$router.push("/");
      });
  },
};
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
}
.el-aside {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  background-color: var(--gray-dark);
}
.el-main {
  position: fixed;
  left: 200px;
  top: var(--head-height);
  width: calc(100% - 200px);
  height: calc(100% - var(--head-height));
  background-color: var(--gray);
}
</style>
