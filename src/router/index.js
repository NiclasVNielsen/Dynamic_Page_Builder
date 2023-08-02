import { createRouter, createWebHistory } from 'vue-router'
import MV from '../views/MoldableView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:admin?',
      name: 'home',
      component: MV
    },
    {
      path: '/about/:admin?',
      name: 'about',
      component: MV
    }
  ]
})

export default router
