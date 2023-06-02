import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import authToken from '@/utils/tokenClass'

// ////////////////////////////
// 本系统版本为 ^3.6.5   这将对push  方法的 路由守卫方法的 next({to:to}) 不兼容,所以 改写成 3.0.0 版本
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
// ///////////////////////////////////
Vue.use(VueRouter)
// 1：import 是解构过程并且是编译时执行
// 2：require 是赋值过程并且是运行时才执行，也就是异步加载
// 3：require的性能相对于import稍低，因为require是在运行时才引入模块并且还赋值给某个变量

// const getComponent = path => {
//   return resolve => require([`@/views/${path}`], resolve)
// }
const constantRoutes = [{
  path: '/',
  redirect: '/base'
},

{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
  meta: {
    title: '登录'
  }
}
]
export const menus = [{
  path: '/my',
  name: 'My',
  redirect: '/account',
  component: () => import('@/views/Base.vue'),
  meta: {
    sidebarVisible: true,
    title: '我的账户'
  },
  children: [{
    path: '/account',
    name: 'Account',
    meta: {
      sidebarVisible: true,
      title: '我的账户'
    },
    component: () => import('@/views/my/Account')
  }]
}, {
  path: '/system',
  name: 'System',
  redirect: '/region',
  component: () => import('@/views/Base.vue'),
  meta: {
    sidebarVisible: true,
    title: '系统管理'
  },
  children: [{
    path: '/region',
    name: 'Region',
    meta: {
      sidebarVisible: true,
      title: '区划管理'
    },
    component: () => import('@/views/system/Region')
  }]
},
{
  path: '/base',
  name: 'Home',
  component: () => import('@/views/Home.vue')
},
{
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
}
]

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// 路由懒加载的情况下，访问当前应用进行路由跳转时都是实时动态的从服务器上拉取相应模块的js文件，这时候我们改完代码打包上线，js文件名更换了，
// 路由跳转的时候由于页面并未刷新，所以还是访问的原来的文件名，这是就会出现找不到模块的错误。 路由异步加载组件报错，这个错误来源 webpack
// 进行 code spilt 之后某些 bundle 文件 lazy loading 失败。

// 当在渲染一个路由的过程中，需要尝试解析一个异步组件时发生错误。
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)

  if (isChunkLoadFailed) {
    location.reload()
  }
})
// 导航守卫
router.beforeEach(async (to, from, next) => {
  const whiteList = ['/login'] // no redirect whitelist
  // console.log(store.state.user, '看一下你')
  // 白名单列表
  if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
    next()
  } else {
    // other pages that do not have permission to access are redirected to the login page.
    const currentRoute = router.getMatchedComponents(to.path)
    // const getRoutes = router.getRoutes()
    // console.log(getRoutes, 88)
    // 判断当前路径的路由是否存在
    if (currentRoute.length === 0) {
      const hasLogin = authToken.getToken()
      if (hasLogin) {
        store.commit('sidebar/SET_SidebarList', menus)
        store.dispatch('user/getUserInfo')
        menus.forEach((item, index) => {
          router.addRoute(item)
          if (index === menus.length - 1) {
            next({
              ...to
            })
          }
        })
      } else {
        next(`/login?redirect=${to.path}`)
      }
    } else {
      next()
    }
  }
})
// 重置路由
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  authToken.removeToken()
  authToken.removeRefreshToken()
}
export default router
