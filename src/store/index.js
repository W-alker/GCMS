import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    SName: '',
    idCode: '',
    userInfo: {}
  },
  mutations: {
    update_loginInfo(state, data) {
      state.SName = data.SName;
      state.idCode = data.idCode;
    },
    update_userInfo(state,data){
      state.userInfo = data;
    },
    update_avatar(state, link) {
      state.userInfo.profile = link;
    }
  },
  actions: {},
  modules: {},
});
