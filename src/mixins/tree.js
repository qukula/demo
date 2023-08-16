import {
  Notification
} from 'element-ui'
import scroll from '@/utils/scroll'
import {
  // mapGetters,
  mapMutations
} from 'vuex'
export default {
  data () {
    return {
      isQHVisible: false,
      pereacId: null,
      pageRoles: [],
      // 根节点
      rootNode: undefined,
      // 根节点回调
      rootResolve: undefined,
      defaultProps: {
        label: 'name',
        children: 'children',
        // disabled: 'chkDisabled',
        isLeaf: 'leaf'
      }
    }
  },

  computed: {
    // ...mapGetters(['roles']),
    isAdminTree () {
      if (this.roles.some(item => item === 'ROLE_ADMIN')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations({
      setMaxRegion: 'user/SET_MaxRegion'
    }),

    // 清除机构
    clearOrg () {
      this.org = {}
      this.treeCheckedData = []
      this.$refs[this.name].setCheckedKeys([])
      this.$refs.orgSelect.blur()
    },
    handleLevel (level) {
      let str = ''
      const num = parseInt(level)
      switch (num) {
        case 1:
          str = '省'
          break
        case 2:
          str = '地州'
          break
        case 3:
          str = '区县'
          break
        case 4:
          str = '乡镇'
          break
        case 5:
          str = '村'
          break
      }

      return str
    },
    // 机构选择器滚动到已选机构
    changeVisible (e, className) {
      if (e) {
        this.$nextTick(() => {
          const wrap = document.querySelector(`.org-tree.${className}`)
          const checkedItem = wrap.querySelector('.el-checkbox.is-checked')
          scroll(wrap, checkedItem)
        })
      }
    },

    // 回填获取父级keys 二维码数组
    getParents (arr) {
      return this.$api
        .get('/region/getParentsByRegionId', {
          params: {
            authorized: true,
            regionId: arr.join(),
            jsonConfig: 'api',
            name: this.name
          }
        })
        .then(res => {
          if (res.data && res.data.data) {
            return res.data.data
          } else {
            Notification.error({
              title: '上级机构获取失败',
              message: res.data.message || '接口错误'
            })
            return []
          }
        })
        .catch(err => {
          Notification.error({
            title: '上级机构获取失败',
            message: err.status || ''
          })
        })
    },

    // 获取用户关联最大机构
    getMaxOrg (type) {
      console.log(type, '这里有嘛')
      const params = {
        selectedRole: 'ROLE_ADMIN',
        jsonConfig: 'api',
        id: 1,
        name: this.name
      }
      if (this.isCountry) {
        params.all = true
        params.onlyCountry = '全国'
      } else {
        params.authorized = true
      }
      return this.$api
        .get('/region/getRegions', {
          params: params
        })
        .then(res => {
          console.log(res, '你或者吗')
          if (res && res.data.success) {
            res.data.data.forEach(item => {
              item.leaf = !item.isParent
              // 便于实现懒加载展开
              if (type === 1 && item.isParent) {
                item.children = [{}]
              }
            })

            return res.data.data
          } else {
            Notification.error({
              title: '用户关联机构获取失败',
              message: res.data.message || '接口错误'
            })
            return []
          }
        })
        .catch(err => {
          Notification.error({
            title: '用户关联机构获取失败',
            message: err.status || ''
          })
        })
    },
    // 子机构查询
    getChildren (id, type) {
      return this.$api
        .get('/region/getRegions', {
          params: {
            authorized: true,
            id,
            name: this.name
          }
        })
        .then(res => {
          if (res.data && res.data.success) {
            res.data.data.forEach(item => {
              item.leaf = !item.isParent
              // 便于实现懒加载展开
              if (type === 1 && item.isParent) {
                item.children = [{}]
              }
            })
            return res.data.data
          } else {
            Notification.error({
              title: '机构获取失败',
              message: res.data.message || '接口错误'
            })
            return []
          }
        })
        .catch(err => {
          Notification.error({
            title: '机构获取失败',
            message: err.status || ''
          })
        })
    }
  },
  watch: {
    // $route: {
    //   handler(to, from) {
    //     this.pageRoles = to.meta.roles
    //     this.isQHVisible = to.meta.isQHVisible
    //     this.routeRegion = to.query?.regionId
    //     const routePageType = to.query?.type
    //     if (routePageType === '采集员') {
    //       this.pereacId = to.query?.id
    //     }
    //   },
    //   immediate: true
    // }
  }
}
