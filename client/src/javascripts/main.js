import 'normalize.css';
import '../stylesheets/main.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { router } from "./routes";

Vue.use(VueRouter);

new Vue({
  router,
}).$mount('#app');

