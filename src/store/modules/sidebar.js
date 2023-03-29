// 全局变量集对象
const state = {
  sidebarList: [],
  info: {},
  userMaxRegion: {},
  hasLogin: false
}
function listFilter (list = []) {
  return list.filter(item => item.meta?.sidebarVisible).map(item => {
    return {
      title: item.meta?.title,
      name: item.name,
      path: item.path,
      icon: item.meta?.icon,
      children: listFilter(item?.children || [])
    }
  })
}
// 唯一能改 state 里面的 变量
// store.commit('mutations 方法名', '参数对象')
// store.commit('SET_ROLES', 10)
const mutations = {
  SET_SidebarList: (state, sidebarList) => {
    state.sidebarList = listFilter(sidebarList)
  }
}
const actions = {
  sidebarAction (context) {
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
