<template>
  <el-row class="personalMain-pwd">
    <el-card shadow="always" :body-style="card_style">
      <div slot="header" class="card-header">
        <h2>修改密码</h2>
        <p>
          请牢记您的密码。如果您忘记密码，请前往登录页面点击“忘记密码”，通过邮箱找回密码。
        </p>
      </div>
      <el-form>
        <el-form-item label="旧密码:">
          <el-input v-model="oldPwd" type="password" required></el-input>
        </el-form-item>
        <el-form-item label="新密码:">
          <el-input v-model="newPwd" type="password" required></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:">
          <el-input v-model="confirmPwd" type="password" required></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit"
          >确认修改</el-button
        >
      </el-form>
    </el-card>
  </el-row>
</template>

<script>
import { changePwd } from "network/user";
export default {
  name: "UserChangePwd",
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
      card_style: {
        padding: "0 20px 12px 20px",
      },
    };
  },
  methods: {
    submit() {
      const formdata = new FormData();
      formdata.append("oldPwd", this.oldPwd);
      formdata.append("newPwd", this.newPwd);
      formdata.append("confirmPwd", this.confirmPwd);
      formdata.append("idCode", localStorage.getItem("idCode"));
      changePwd(formdata)
        .then((res) => {
          if (res.err) this.$message.error(res.msg);
          else this.$$message(res.msg);
        })
        .catch(() => this.$message.error("未知错误"));
    },
  },
};
</script>

<style lang="scss" scoped>
//此处样式部分被修改个人信息页面覆盖
.personalMain-pwd {
  width: 100%;
  height: 100%;
}
.el-card {
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-width: 518px;
  min-width: 400px;
  width: 60%;
  background-color: var(--light-gray);
  h2 {
    margin-bottom: 16px;
    color: var(--primary);
    text-align: center;
  }
  p {
    padding: 0 0 16px 0;
    border-bottom: 2px black solid;
    color: var(--gray);
  }
}
.el-form {
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-button {
    margin-top: 10px;
  }
}
</style>