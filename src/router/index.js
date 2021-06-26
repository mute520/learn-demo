import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/student',
    name: 'student',
    // route level code-splitting
    // this generates a separate chunk (student.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "student" */ '@/views/Student')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/Editor')
  },
  {
    path: '/org-tree',
    name: 'org-tree',
    component: () => import('@/views/OrgTree')
  },
  {
    name: 'redirect',
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
