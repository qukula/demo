
import { handleApi } from '@/api/index.js'
import { resetRouter } from '@/router'
/**
 *
 * computed: {
 * localComputed () {
 *},
* // 使用对象展开运算符将此对象混入到外部对象中
*
...mapState({
  // ...
})
}
*
*
*/
/**
 * import { mapState } from 'vuex'
 * computed: {
 *      localComputed(){},
 *      ...mapState(['stateName']) //
 */

// 全局变量集对象
const state = {
  roles: [],
  info: {},
  userMaxRegion: {},
  hasLogin: false
}
// 唯一能改 state 里面的 变量
// store.commit('mutations 方法名', '参数对象')
// store.commit('SET_ROLES', 10)
const mutations = {
  SET_MaxRegion: (state, userMaxRegion) => {
    console.log(userMaxRegion)
    state.userMaxRegion = userMaxRegion
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_HAS_LOGIN: (state, hasLogin) => {
    state.hasLogin = hasLogin
    return true
  }
}
const actions = {
  handleLogin (context, params) {
    return handleApi(params, '/api/login', 'post').then(res => {
      if (res) {
        return handleUserInfo(context)
      }
    })
  },
  getUserInfo (context) {
    return handleUserInfo(context)
  },
  handleLogout (context) {
    resetRouter()
    return setUserInfo(context)
  }
}
function handleUserInfo (context) {
  return handleApi({}, '/api/user/getUserInfo').then(res => {
    return setUserInfo(context, res)
  })
}
function setUserInfo (context, res) {
  return new Promise(resolve => {
    context.commit('SET_INFO', res || {})
    context.commit('SET_ROLES', res?.roles || [])
    context.commit('SET_HAS_LOGIN', !!res)
    context.commit('SET_MaxRegion', res?.regions || [])
    resolve(res)
  })
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
