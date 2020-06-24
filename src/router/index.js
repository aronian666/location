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
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    children: [
      {
        name: 'search/:search',
        path: ':search',
        component: Users
      }
    ]
  },
  {
    path: '/users/new',
    name: 'users/new',
    component: NewUser
  },
  {
    path: '/users/:id',
    name: 'users/:id',
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
