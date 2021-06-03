<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
//侧边栏样式
.navbar {
  //当前选中
  .nav-current {
    color: var(--light-blue);
  }

  display: flex;
  .el-tree {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 30px;
    background-color: transparent;
    color: #d3d3d3;
    .el-tree-node {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .el-tree-node__content {
        flex-basis: 50px;
        font-size: 18px;
        &:hover {
          color: var(--blue);
        }
      }
      .el-tree-node__children {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .el-tree-node__content {
          flex-basis: 40px;
          font-size: 16px;
          &:hover {
            color: var(--blue);
          }
        }
      }
    }
  }
}
</style>
