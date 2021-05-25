<template>
  <el-card>
    <div slot="header" class="header-text">
      <h2>登录</h2>
      <p>欢迎登录垃圾分类管理系统！</p>
      <el-popover
        placement="top-start"
        title="温馨提示"
        width="200"
        trigger="hover"
        :content="hintText"
      >
        <el-button type="text" class="hint-text-btn" slot="reference">
          <i class="fa fa-question-circle"></i>
        </el-button>
      </el-popover>
    </div>
    <el-form label-position="left">
      <slot name="item-school"></slot>
      <slot name="item-idCode"></slot>
      <slot name="item-pwd"></slot>
      <slot name="item-identiy"></slot>
      <slot name="item-submit"></slot>
    </el-form>
    <slot name="other"></slot>
  </el-card>
</template>

<script>
export default {
  name: "LoginBox",
  data() {
    return {
      hintText: `
      （1） 所有学员的初始密码为00000或者111111。如果您是第一次登录，请在登录后修改密码，并绑定手机号，以便找回密码。
      （2） 您首次登录后，七天内可以直接访问主页面，无需重新登录。下次登录我们会尝试为您还原上一次除密码外的登录信息。
      （3） 用户测试账号：安徽三联学院/1801010001/zs1234/用户
      （4） 管理员测试账号：安徽三联学院/18001111/ls5678/管理员
      `,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.header-text {
  position: relative;
  h2 {
    color: var(--blue);
    margin-bottom: 10px;
  }
  .hint-text-btn {
    position: absolute;
    top: -10px;
    right: 0px;
    font-size: 24px;
  }
}

.el-form {
  label {
    font: {
      size: 17px;
    }
    i.fa {
      margin-right: 12px;
      color: var(--blue);
    }
  }
  .el-button {
    width: 100%;
  }
}
</style>