<template>
  <div class="container">
    <h2>
      <img
        src="https://lajifenleiapp.com/favicon.png"
        class="logo"
      />垃圾分类查询
    </h2>
    <el-row class="queryBox">
      <el-col :span="18">
        <el-input
          v-model="gbname"
          type="text"
          placeholder="请输入关键字"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="submit">
          <i class="fa fa-search"></i>立即查询
        </el-button>
      </el-col>
    </el-row>

    <el-row v-if="result.length > 0" class="queryResBox">
      <el-col>
        相关查询:
        <el-tag
          v-for="(item, index) in result"
          :key="index"
          size="small"
          @click="tagClick($event)"
        >
          {{ item.name }}
        </el-tag>
      </el-col>
      <el-col class="result">
        <span>{{ gbname }}</span>
        属于
        <span>{{ get_type }}</span>
      </el-col>
      <p><span>分类解释：</span>{{ result[0].explain }}</p>
      <p><span>包含类型：</span>{{ result[0].contain }}。</p>
      <p><span>投放提示：</span>{{ result[0].tip }}。</p>
    </el-row>

    <el-row class="recent queriesBox">
      <span>近期查询：</span>
      <el-tag
        type="info"
        v-for="(item, index) in recentQueries"
        :key="index"
        effect="plain"
        size="medium"
        @click="tagClick($event)">
        {{ item }}
      </el-tag>
    </el-row>

    <el-row class="popular queriesBox">
      <span>热门查询：</span>
      <el-tag
        type="info"
        v-for="(item, index) in popularQueries"
        :key="index"
        effect="plain"
        size="medium"
        @click="tagClick($event)"
        >{{ item }}</el-tag
      >
    </el-row>
    <div class="explain-img" v-if="result.length==0"><img src="https://pic.imgdb.cn/item/60bce7b58355f7f718af00f3.png" alt=""></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserKnowledge",
  created() {
    this.$notify({
      title: "关于接口",
      dangerouslyUseHTMLString: true,
      message: `感谢提供该免费查询接口的开发者。<br/>
      接口文档：<strong>https://api.66mz8.com/document/garbage.php</strong> 。`,
      type: "info",
      duration: 3000,
    });
  },
  data() {
    return {
      gbname: "",
      result: [],
      recentQueries: [
        "水果",
        "香蕉",
        "菠萝",
        "电动剃须刀",
        "姨妈巾",
        "洗面奶",
        "奥利奥包装盒",
        "一次性快递",
        "剩饭剩菜",
      ],
      popularQueries: [
        "水果",
        "香蕉",
        "菠萝",
        "电动剃须刀",
        "姨妈巾",
        "洗面奶",
        "奥利奥包装盒",
        "一次性快递",
        "剩饭剩菜",
      ],
    };
  },
  computed: {
    get_type() {
      const type = this.result[0].type;
      if (type === 4) return "其他垃圾（干垃圾）";
      if (type === 3) return "厨余垃圾（湿垃圾）";
      if (type === 2) return "有害垃圾";
      if (type === 1) return "可回收物";
      return "可回收垃圾";
    },
  },
  methods: {
    submit() {
      axios({
        url: `https://v1.alapi.cn/api/lajifenlei?name=${this.gbname}`,
      }).then((res) => {
        // console.log(res.data.data[0]);
        if (!res.data.data[0]) this.$message("没有查询到！");
        this.result = res.data.data;
      });
    },
    tagClick(ev) {
      this.gbname = ev.target.innerText;
      this.submit();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30px;
  text-align: center;
  h2 {
    .logo {
      width: 60px;
      height: 60px;
    }
  }
  .el-row {
    width: 80%;
    margin: 20px auto;
  }
}
.queryBox {
  .el-button {
    width: 100%;
    i {
      margin-right: 10px;
    }
  }
}
.queryResBox {
  padding: 20px 0;
  .el-tag {
    margin: 4px;
  }
  .result {
    margin: 20px 0;
    font-size: 26px;
    color: var(--white);
    span {
      &:first-of-type {
        color: var(--orange);
      }
      &:last-of-type {
        color: var(--teal);
      }
    }
  }
  p {
    text-align: start;
    line-height: 1.2em;
    margin: 0.6em 0;
    span {
      color: aqua;
    }
  }
}
.queriesBox {
  max-height: 100px;
  overflow: hidden;
  .el-tag {
    margin: 6px;
  }
}
.explain-img{
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>