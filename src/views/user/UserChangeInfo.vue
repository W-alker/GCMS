<template>
  <el-row class="personalMain">
    <el-card shadow="always">
      <div slot="header" class="card-header" :body-style="card_style">
        <h2 class="header-text">修改个人信息</h2>
      </div>
      <el-form>
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8100/user/uploadAvatar"
          name="avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="{ idCode }"
          :on-error="handleAvatarError"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="fa fa-user-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="修改/绑定邮箱：">
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="修改/绑定手机号：">
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="所在学校：">
          <el-input v-model="SName" disabled></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit"
          >保存修改</el-button
        >
      </el-form>
    </el-card>
  </el-row>
</template>
<script>
import { changeInfo } from 'network/user';

export default {
  name: "UserChangeInfo",
  //初始化信息
  created() {
      this.email = this.$store.state.userInfo.email;
      this.phone = this.$store.state.userInfo.phone;
      this.SName = localStorage.getItem("SName");
      this.idCode = localStorage.getItem("idCode");
  },
  data() {
    return {
      imageUrl: "",
      card_style: {
        padding: "0 20px 12px 20px",
      },
      email: "",
      phone: "",
      SName: "",
      idCode: ''
    };
  },
  computed: {
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.err) return this.$message.error(res.msg);
      this.$message.success("头像上传成功！");
      //使用vuex保存更改后的头像信息，头像链接来自后台返回
      this.$store.commit("update_avatar", res.link);
      this.imageUrl = this.$store.state.userInfo.profile;
    },
    handleAvatarError() {
      this.$message.error("未知错误");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或者 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit() {
        const formdata = new FormData();
        formdata.append('idCode',this.idCode);
        formdata.append('email',this.email);
        formdata.append('phone',this.phone);
        changeInfo(formdata).then(res => {
            if(res.err) return this.$message.error(res.msg)
            this.$message.success(res.msg)
        }).catch(()=>this.$message.error('未知错误'))
    },
  },
};
</script>
<style lang="scss" >
.personalMain {
  width: 100%;
  height: 100%;
}
.personalMain .el-card {
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-width: 518px;
  min-width: 400px;
  width: 60%;
  text-align: center;
  background-color: var(--light-gray);
  .header-text {
    margin-bottom: 16px;
    color: var(--primary);
    padding: 0 0 16px 0;
    border-bottom: 2px black solid;
  }
}
.avatar-uploader {
  margin-top: -30px;
  .el-upload {
    position: relative;
    overflow: hidden;
    width: 128px;
    height: 128px;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    background-color: #fff;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 128px;
  }
  img {
      width: 100%;
      height: 100%;
  }
}
</style>