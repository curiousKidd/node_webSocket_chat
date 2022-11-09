import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _37cd3dee = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _3e95c94e = () => interopDefault(import('../pages/socket/io/index.vue' /* webpackChunkName: "pages/socket/io/index" */))
const _12354dce = () => interopDefault(import('../pages/socket/io_test/index.vue' /* webpackChunkName: "pages/socket/io_test/index" */))
const _c0021ce2 = () => interopDefault(import('../pages/socket/ws/index.vue' /* webpackChunkName: "pages/socket/ws/index" */))
const _9c413234 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _37cd3dee,
    name: "inspire"
  }, {
    path: "/socket/io",
    component: _3e95c94e,
    name: "socket-io"
  }, {
    path: "/socket/io_test",
    component: _12354dce,
    name: "socket-io_test"
  }, {
    path: "/socket/ws",
    component: _c0021ce2,
    name: "socket-ws"
  }, {
    path: "/",
    component: _9c413234,
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
