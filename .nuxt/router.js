import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1ca90d92 = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _7b0a6fbd = () => interopDefault(import('../pages/admin_.vue' /* webpackChunkName: "pages/admin_" */))
const _1e4964b5 = () => interopDefault(import('../pages/informacoes.vue' /* webpackChunkName: "pages/informacoes" */))
const _f844be46 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _963d46a8 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _231d3bfc = () => interopDefault(import('../pages/login_admin.vue' /* webpackChunkName: "pages/login_admin" */))
const _6b8665d1 = () => interopDefault(import('../pages/pedidos.vue' /* webpackChunkName: "pages/pedidos" */))
const _b903c334 = () => interopDefault(import('../pages/pedidosBKP.vue' /* webpackChunkName: "pages/pedidosBKP" */))
const _675cfd40 = () => interopDefault(import('../pages/primeiroacesso.vue' /* webpackChunkName: "pages/primeiroacesso" */))
const _1a007b27 = () => interopDefault(import('../pages/produtos.vue' /* webpackChunkName: "pages/produtos" */))
const _16579fd4 = () => interopDefault(import('../pages/profissionais.vue' /* webpackChunkName: "pages/profissionais" */))
const _8f338c9a = () => interopDefault(import('../pages/resetsenha.vue' /* webpackChunkName: "pages/resetsenha" */))
const _54c0b012 = () => interopDefault(import('../pages/usuarios.vue' /* webpackChunkName: "pages/usuarios" */))
const _63a200e4 = () => interopDefault(import('../pages/vendas.vue' /* webpackChunkName: "pages/vendas" */))
const _02895ebe = () => interopDefault(import('../pages/vendas_item.vue' /* webpackChunkName: "pages/vendas_item" */))
const _7951653a = () => interopDefault(import('../pages/jmonte/login.vue' /* webpackChunkName: "pages/jmonte/login" */))
const _82bbe180 = () => interopDefault(import('../pages/jmonte/arquivo/home.vue' /* webpackChunkName: "pages/jmonte/arquivo/home" */))
const _298c8cd6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _1ca90d92,
    name: "admin"
  }, {
    path: "/admin_",
    component: _7b0a6fbd,
    name: "admin_"
  }, {
    path: "/informacoes",
    component: _1e4964b5,
    name: "informacoes"
  }, {
    path: "/inspire",
    component: _f844be46,
    name: "inspire"
  }, {
    path: "/login",
    component: _963d46a8,
    name: "login"
  }, {
    path: "/login_admin",
    component: _231d3bfc,
    name: "login_admin"
  }, {
    path: "/pedidos",
    component: _6b8665d1,
    name: "pedidos"
  }, {
    path: "/pedidosBKP",
    component: _b903c334,
    name: "pedidosBKP"
  }, {
    path: "/primeiroacesso",
    component: _675cfd40,
    name: "primeiroacesso"
  }, {
    path: "/produtos",
    component: _1a007b27,
    name: "produtos"
  }, {
    path: "/profissionais",
    component: _16579fd4,
    name: "profissionais"
  }, {
    path: "/resetsenha",
    component: _8f338c9a,
    name: "resetsenha"
  }, {
    path: "/usuarios",
    component: _54c0b012,
    name: "usuarios"
  }, {
    path: "/vendas",
    component: _63a200e4,
    name: "vendas"
  }, {
    path: "/vendas_item",
    component: _02895ebe,
    name: "vendas_item"
  }, {
    path: "/jmonte/login",
    component: _7951653a,
    name: "jmonte-login"
  }, {
    path: "/jmonte/arquivo/home",
    component: _82bbe180,
    name: "jmonte-arquivo-home"
  }, {
    path: "/",
    component: _298c8cd6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
