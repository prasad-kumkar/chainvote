import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/app',
    name: 'App',
    component: Dashboard
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Home.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new',
    name: 'New Ballot',
    component: () => import(/* webpackChunkName: "settings" */ '../views/NewBallot.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/booth/:id',
    name: 'Booth',
    component: () => import('../views/Booth.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/booth/:id/details',
    name: 'Details',
    component: () => import('../views/Details.vue'),
    meta: {
      requiresAuth: true
    }
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
