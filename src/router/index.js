import { createRouter, createWebHistory } from 'vue-router'

/* Views loaded in here are always loaded no matter what */
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

/* 
  * Load routes from db
  * wait for it
  * append routes
  * initiate server
*/

export default router
