// 全局变量集对象
const state = {
  roles: [],
  info: {},
  userMaxRegion: {},
  hasLogin: false
}
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
  getUserInfo (context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(context)
        context.commit('SET_HAS_LOGIN', true)
        resolve(true)
      }, 1000)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
