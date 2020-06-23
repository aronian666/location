import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import NewUser from '../views/users/New.vue'
import ShowUser from '../views/users/Show.vue'
import Users from '../views/users/Index.vue'
import Home from '../views/Home.vue'





Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/search/:search',
    name: 'Users',
    component: Users
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
