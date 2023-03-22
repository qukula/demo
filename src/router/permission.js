import router, {
  menus
} from './index'

router.beforeEach(async (to, from, next) => {
  // console.log(to.path, from.path)
  const whiteList = ['/login'] // no redirect whitelist

  if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
    next()
  } else {
    // other pages that do not have permission to access are redirected to the login page.
    const currentRoute = router.getMatchedComponents(to.path)
    // const getRoutes = router.getRoutes()
    // console.log(getRoutes, 88)
    if (currentRoute.length === 0) {
      if (from.path.includes('login')) {
        menus.forEach(item => {
          router.addRoute(item)
        })
        next({
          ...to,
          replace: true
        })
      } else {
        next(`/login?redirect=${to.path}`)
      }
    } else {
      next()
    }
  }
})
