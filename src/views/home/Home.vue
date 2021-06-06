<template>
  <el-row class="home">
    <el-col :span="10" class="login_box">
      <login-box>
        <el-form-item class="item-school" slot="item-school">
          <label for=""> <i class="fa fa-graduation-cap"></i>学校： </label>
          <el-input v-model="SName" name="SName"></el-input>
          <el-button @click="openSchoolList">
            <i class="fa fa-chevron-right"></i>
          </el-button>
        </el-form-item>
        <el-form-item class="item-idCode" slot="item-idCode">
          <label for=""> <i class="fa fa-user-circle-o"></i>学号/工号： </label>
          <el-input
            v-model="idCode"
            placeholder="输入您的学号/工号"
            name="idCode"
          ></el-input>
        </el-form-item>
        <el-form-item class="item-pwd" slot="item-pwd">
          <label for=""> <i class="fa fa-key"></i>密码： </label>
          <el-input
            v-model="pwd"
            placeholder="输入密码"
            name="pwd"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="item-identiy" slot="item-identiy">
          <el-radio v-model="radio" label="1">用户</el-radio>
          <el-radio v-model="radio" label="2">管理员</el-radio>
        </el-form-item>
        <el-form-item slot="item-submit">
          <el-button type="primary" round @click="submit"> 登录 </el-button>
        </el-form-item>
        <div slot="other" class="otherSet">
          <a href="javascript:;" type="text" @click="autoLogin = !autoLogin"
            >自动登录
            <i
              :class="[
                'fa',
                { 'fa-circle-o': !autoLogin, 'fa-check-circle-o': autoLogin },
              ]"
              style="margin-left: 2px"
            ></i
          ></a>
          <a href="javascript:;" @click="openResetPwdBox">忘记密码？</a>
        </div>
      </login-box>

      <el-dialog
        title="重置密码"
        :visible.sync="dialogFormVisible"
        top="4vh"
        :width="dialogWidth"
      >
        <reset-pwd-box :SName="SName" :idCode="idCode" />
      </el-dialog>

      <el-dialog
        title="选择学校"
        :visible.sync="dialogTableVisible"
        top="4vh"
        :width="dialogWidth"
      >
        <el-input
          type="text"
          placeholder="查询学校"
          class="search-school-input"
          v-model="search_text"
        ></el-input>
        <select-school-box
          class="selectSchool-list"
          @item_selected="updateSName"
          ref="searchBox"
          :schoolName="schoolNameData"
          :sText="search_text"
        ></select-school-box>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import LoginBox from "./childComps/LoginBox";
import SelectSchoolBox from "./childComps/SelectSchoolBox";
import ResetPwdBox from "./childComps/ResetPwdBox";

import { login } from "network/login";
import { getSchoolName } from "network/home";

export default {
  name: "Home",
  components: {
    LoginBox,
    SelectSchoolBox,
    ResetPwdBox,
  },
  data() {
    return {
      radio: "1",
      SName: "安徽三联学院",
      idCode: "1801010388",
      pwd: "",
      schoolNameData: [],
      autoLogin: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogWidth: "500px",
      search_text: "",
    };
  },
  methods: {
    openSchoolList() {
      this.dialogTableVisible = true;
      getSchoolName()
        .then((data) => {
          this.schoolNameData = data;
        })
        .catch((err) => this.$message.error(err));
    },
    updateSName(sname) {
      this.SName = sname;
      this.dialogTableVisible = false;
    },
    openResetPwdBox() {
      this.dialogFormVisible = true;
    },
    submit() {
      let formdata = new FormData();
      formdata.append("SName", this.SName);
      formdata.append("idCode", this.idCode);
      formdata.append("pwd", this.pwd);
      this.radio === "1"
        ? formdata.append("identiy", "user")
        : formdata.append("identiy", "admin");
      login(formdata)
        .then((res) => {
          //保存信息
          localStorage.setItem("SName", this.SName);
          localStorage.setItem("idCode", this.idCode);
          this.$store.commit({
            type: "update_userInfo",
            SName: this.SName,
            idCode: this.idCode,
          });
          if (this.autoLogin) localStorage.setItem("autoLogin", true);
          res.err === 0 ? this.$router.push("/user") : this.$message.error(res.msg);
        })
        .catch((err) => this.$message.error(err));
    },
  },
  created() {
    //尝试自动登录
    if (localStorage.getItem("autoLogin")) this.$router.push("/user");
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: rgb(83, 221, 255);
}
.login_box {
  float: none;
  max-width: 480px;
  min-width: 300px;
  height: 586px;
  margin: calc((100vh - 586px) / 2) auto;
  overflow: hidden;
  .otherSet {
    a {
      display: inline-block;
      text-decoration: none;
      &:last-child {
        float: right;
      }
    }
  }
}
.item-school {
  position: relative;
  .el-input {
  }
  .el-button {
    position: absolute;
    top: 50%;
    left: 0;
    background-color: transparent;
    i {
      float: right;
    }
  }
}

.el-dialog__wrapper {
  overflow: hidden;
}
.search-school-input {
  margin-bottom: 20px;
}
.selectSchool-list {
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>


