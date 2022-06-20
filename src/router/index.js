import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: function(){
      return import('../views/Index.vue')
    }
  },
  {
    path: '/prueba',
    name: 'prueba',
    component: function(){
      return import('../views/prueba.vue')
    }
  },
  {
    path: '/registrate',
    name: 'registrate',
    component: function(){
      return import('../views/auth/registrate.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function(){
      return import('../views/auth/login.vue')
    }
  },
  //Rutas de familias
  {
    path: '/familia/:slug/articulos',
    name: 'Familia.slug',
    component: function(){
      return import('../views/familias/Articulos.vue')
    }
  },
  {
    path: '/nuestros-productos',
    component: function(){
      return import('../views/familias/ListarFamilias.vue')
    }
  },

  //Rutas de administracion
  {
    path: '/administracion',
    name: 'administracion',
    component: function(){
      return import('../views/Administracion/index.vue')
    }
  },
  {
    path: '/administracion/articulos/agrupar',
    name: 'agrupar',
    component: function(){
      return import('../views/Administracion/Articulos/agrupar.vue')
    }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
