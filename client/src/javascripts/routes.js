import App from './components/App.vue'
import Board from './components/Board.vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/b/:id',
    component: Board,
  }
];

export const router = new VueRouter({
  routes
});