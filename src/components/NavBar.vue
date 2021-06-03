<template>
  <div class="navbar">
    <span name="title" class="navbar-title">{{ title }}</span>
    <a href="javascript:;" class="profile"><img :src="profile" alt="头像" /></a>
    <el-tree
      :data="data"
      @node-click="nodeClick"
      :default-expand-all="true"
      empty-text="数据加载失败！"
      :node-key="data.id"
      @current-change="currentChange"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="{'nav-current':currentId === data.id}">
          <i :class="data.icon" style="margin-right:8px;"></i>{{ data.label }}
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    profile: {
      type: String,
      default: "https://pic.imgdb.cn/item/60b8a0898355f7f7184dd677.jpg",
    },
    title: {
      type: String,
      default: "",
    },
    data: {
      default: [],
    },
  },
  data() {
      return {
          currentId: 1
      }
  },
  methods:{
      nodeClick(node) {
          console.log(node.id)
      },
      currentChange(node) {
          this.currentId=node.id;
      }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  text-align: center;
  flex-direction: column;
  .navbar-title {
    display: inline-block;
    width: 100%;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-weight: bolder;
    border-bottom: 4px solid #fff;
  }
}
.profile {
  display: inline-block;
  margin-top: 30px;
  img {
    width: 120px;
    border-radius: 50%;
  }
}

</style>