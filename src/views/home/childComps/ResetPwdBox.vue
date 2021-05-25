<template>
  <el-form size="medium" :hide-required-asterisk="true">
    <el-form-item>
      <label for="">学校：</label>
      <el-input v-model="SName"></el-input>
    </el-form-item>

    <el-form-item>
      <label for="">学号/工号：</label>
      <el-input v-model="idCode"></el-input>
    </el-form-item>

    <el-form-item>
      <label for="">绑定的邮箱：</label>
      <el-row>
        <el-col :span="15">
          <el-input v-model="email" type="email"></el-input>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-button @click="get_verifyCode($event)" v-if="!isGetted">
            <span>获取验证码</span>
          </el-button>
          <el-button v-if="isGetted" disabled>{{ count }} S</el-button>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-row>
        <el-col :span="6">
          <label for="">输入验证码：</label>
        </el-col>
        <el-col :span="17" :offset="1">
          <el-input v-model="verifyCode"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <label for="">新密码：</label>
      <el-row>
        <el-col :span="18">
          <el-input v-model="newPwd" :type="input_pwdType"></el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-button type="text">
            <i
              :class="[{ 'fa-eye-slash': isOpen, 'fa-eye': !isOpen }, 'fa']"
              @click="isOpen = !isOpen"
              style="font-size: 20px"
            ></i>
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>

    <el-button type="primary" @click="confirm">重置密码</el-button>
  </el-form>
</template>

<script>
import { getVerifyCode, resetPwd } from "network/home";

export default {
  name: "ResetPwdBox",
  props: {
    SName: {
      type: String,
      default: "",
    },
    idCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      email: "",
      verifyCode: "",
      newPwd: "",
      isOpen: true,
      isGetted: false,
      count: 0,
    };
  },
  computed: {
    input_pwdType() {
      return this.isOpen ? "password" : "text";
    },
  },
  methods: {
    get_verifyCode(event) {
      getVerifyCode(this.email)
        .then((res) => {
          console.log(event.target.innerHTML);
          alert(res.msg);
          if (res.err === 0) {
            this.isGetted = true;
            this.countDown(60); //触发倒计时
          }
        })
        .catch(() => alert("出现错误"));
    },
    countDown(time) {
      this.count = time;
      const interavl = setInterval(() => {
        if (this.count !== 0) this.count--;
        else {
          this.isGetted = false;
          clearInterval(interavl);
        };
      }, 1000);
    },
    confirm() {
      let formdata = new FormData();
      formdata.append("SName", this.SName);
      formdata.append("idCode", this.idCode);
      formdata.append("email", this.email);
      formdata.append("verifyCode", this.verifyCode);
      formdata.append("newPwd", this.newPwd);
      resetPwd(formdata).then(res => {
        alert(res.msg)
      });
    },
  },
};
</script>

<style scoped>
label {
  font-size: medium;
}
</style>
