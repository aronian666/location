import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import NewUser from '../views/users/New.vue'
import ShowUser from '../views/users/Show.vue'
//import { component } from 'vue/types/umd'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: '/users/new',
    name: 'NewUser',
    component: NewUser
  },
  {
    path: '/users/:id',
    name: 'ShowUser',
    component: ShowUser,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
