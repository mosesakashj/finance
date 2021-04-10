import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }, {
    path: '/agents',
    name: 'agents',
    component: () => import('../views/Users/Agents.vue'),
    meta: { requiresAuth: true }
  }, {
    path: '/customer',
    name: 'customer',
    component: () => import('../views/Users/Customer.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
