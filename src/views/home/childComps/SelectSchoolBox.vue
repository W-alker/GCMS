<template>
  <div>
    <table v-for="item in schoolName" :key="item.name">
      <thead v-show="!sText">
        {{
          item.name
        }}
      </thead>
      <tr
        v-for="(datas, index) in item.data"
        :key="index"
        v-show="datas[0].match(sText)"
      >
        <td @click="selected($event)">{{ datas[0] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "SelectSchoolBox",
  props: {
    schoolName: {
      type: Array,
      default() {
        return [];
      },
    },
    sText: {
      type:String,
      default() {
        return ''
      }
    }
    
  },
  data() {
    return {
    };
  },
  methods: {
    selected($event) {
      this.$emit("item_selected", $event.target.textContent);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  line-height: 40px;
  width: 100%;
  thead {
    display: block;
    height: 40px;
    padding-left: 10px;
    color: var(--gray-dark);
    font-size: 18px;
    background-color: var(--light-gray);
  }
  tr {
    display: block;
    width: 100%;
    height: 40px;
    padding-left: 10px;
    border: {
      bottom: 1px solid var(--light-gray);
    }
    &:hover {
      background-color: var(--light-gray);
    }
  }
}
</style>
