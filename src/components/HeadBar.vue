<template>
  <div class="headbar">
    <slot></slot>
    <el-button type="text" @click="logout">
      <i class="fa fa-sign-out"></i>
      退出登录
    </el-button>
  </div>
</template>

<script>
import {logout} from "network/login"

export default {
  name: "HeadBar",
  props: {},
  data() {
    return {};
  },
  methods: {
    logout() {
    if(confirm('确定退出登录？'))
      logout().then(()=>{
        this.$router.push('/')
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.headbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  background-color: #ccc;
  .el-button {
    float: right;
    margin: 0 30px;
    height: inherit;
    color: #789;
    &:hover {
      color: var(--gray);
    }
  }
}
</style>