import { createRouter, createWebHistory } from 'vue-router'
import { getNavigations } from '../database/main'

//? Views loaded up here are always loaded no matter what, thats why we load them on the route

const navs = await getNavigations()

const routes = [
  /* Utility */
  {
    path: '/update',
    name: 'update',
    component: () => import ('../views/Update.vue')
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


navs.forEach(nav => {
  for(let i = 0; i < nav.paths.length; i++){

    const path = `${nav.paths[i]}/:admin?`
    const title = `${nav.titles[i]}`

    const data = {
      path: path,
      name: title,
      component: () => import ('../views/MoldableView.vue')
    }

    routes.push(data)
  }
  
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

/* 
  * Load routes from db
  * wait for it
  * append routes
  * initiate server
*/

export default router
