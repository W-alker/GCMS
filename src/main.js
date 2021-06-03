import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import 'assets/css/reset.scss'
// import Axios from 'axios'

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api' */


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
