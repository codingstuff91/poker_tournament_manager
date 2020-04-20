import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import createTournament from '../views/createTournament'
import tournaments from '../views/Tournaments'
import tournament from '../views/Tournament'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component : About
  },
  {
    path : '/signup',
    name : 'Signup',
    component : Register
  },
  {
    path : '/login',
    name : 'Login',
    component : Login
  },
  {
    path : '/newTournament',
    name : 'createTournament',
    component : createTournament
  },
  {
    path : '/tournaments',
    name : 'tournaments',
    component : tournaments
  },
  {
    path : '/tournament/:id',
    name : 'tournament',
    component : tournament
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
