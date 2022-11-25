import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import SignUpView from '@/views/SignUpView'
import PopularView from '@/views/PopularView'
import GenreSelectView from '@/views/GenreSelectView'
import NewestView from '@/views/NewestView'
import LogInView from '@/views/LogInView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },

  {
    path: '/popular/:page',
    name: 'PopularView',
    component: PopularView
  },

  {
    path: '/new/:page',
    name: 'NewestView',
    component: NewestView
  },

  {
    path: '/genre',
    name: 'GenreSelectView',
    component: GenreSelectView
  },

  {
    path: '/genre/:genre/:code/:page',
    name: 'GenreView',
    component: () => import('../views/GenreView.vue')
  },

  {
    path: '/profile/:username/:page',
    // 미인증 시 라우터가드로 로그인 페이지로 이동시킬 것.
    name: 'ProfileView',
    component: () => import('../views/ProfileView.vue'),
  },

  {
    path: '/moviedetail/:id',
    name: 'MovieDetailView',
    component: () => import('../views/MovieDetailView.vue')
  },

  {
    path: '/actor/:name/:id/:page',
    name: 'ActorView',
    component: () => import('../views/ActorView.vue')
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },

  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },

  {
    path: '/search/:keyword/:page',
    name: 'SearchView',
    component: () => import('../views/SearchView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {x:0, y:0}
  }
})

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = false
//   const allowAllPaged=['login']
//   const isAuthRequired = !allowAllPaged.includes(to.name)

//   if (isAuthRequired && !isLoggedIn) {
//     next({ name: 'login'})
//   } else {
//     next()
//   }
// })

export default router
