import { createRouter, createWebHistory } from 'vue-router'

/* Views loaded in here are always loaded no matter what */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:admin?',
      name: 'home',
      component: () => import ('../views/MoldableView.vue')
    },
    {
      path: '/about/:admin?',
      name: 'about',
      component: () => import ('../views/MoldableView.vue')
    },



    /* Admin */
    {
      path: '/login',
      name: 'login',
      component: () => import ('../views/admin/login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import ('../views/admin/logout.vue')
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
