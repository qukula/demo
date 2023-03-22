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
  userMaxRegion: {}
}
// 唯一能改 state 里面的 变量
// store.commit('mutations 方法名', '参数对象')
// store.commit('SET_ROLES', 10)
const mutations = {
  SET_MaxRegion: (state, userMaxRegion) => {
    state.userMaxRegion = userMaxRegion
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, info) => {
    state.info = info
  }
}
const actions = {}
const modules = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules
}
