import Vue from 'vue'
import VueRouter from 'vue-router'
import Permisos from '../views/Permisos.vue'
import addPermisos from '../views/addPermisos.vue'
import editPermisos from '../views/editPermisos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'permisos',
    component: Permisos
  },
  {
    path: '/addpermisos',
    name: 'addpermisos',
    component: addPermisos
  },
  {
    path: '/editpermisos/:id',
    name: 'editpermisos',
    component: editPermisos
  },




]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
