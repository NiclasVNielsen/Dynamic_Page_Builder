import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:admin?',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about/:admin?',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
