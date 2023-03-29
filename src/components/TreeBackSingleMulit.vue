<template>
  <el-select
    ref="orgSelect"
    v-model="regionSelect"
    v-loading="pending"
    :multiple="mutiple"
    :clearable="clearable"
    :disabled="disableed"
    :collapse-tags="collapse"
    value-key="id"
    popper-class="org-select"
    placeholder="请选择机构"
    @clear="clearHandle"
    @visible-change="changeVisible($event, 'tree-select')"
    @remove-tag="removeOrgTag"
  >
    <div
      slot="empty"
      class="org-tree tree-select clear"
      :class="{ mutiple: mutiple }"
    >
      <el-tree
        :ref="name"
        :props="defaultProps"
        :load="loadNode"
        lazy
        node-key="id"
        show-checkbox
        check-strictly
        :expand-on-click-node="false"
        check-on-click-node
        @node-expand="nodeExpand"
        @check-change="singleSelectOrg"
      />

      <!-- <div v-permission="adminRole" class="org-clear" @click="clearSingleOrg">清空</div> -->
      <!-- <div  class="org-clear" @click="clearSingleOrg">清空</div> -->
      <div v-if="mutiple" class="org-clear">
        <el-button
          v-if="regionSelect && regionSelect.length"
          type="primary"
          size="mini"
          @click="confirmMulti"
        >确定</el-button>
        <el-button
          v-else
          type="primary"
          size="mini"
          @click="confirmMulti"
        >关闭</el-button>
      </div>
    </div>
  </el-select>
</template>

<script>
import tree from '@/mixins/tree'
export default {
  name: 'RegionAll',
  mixins: [tree],
  props: {
    name: {
      type: String,
      default: 'tree'
    },
    fRegion: {
      type: [Array, Object, String],
      default: () => {
        return []
      }
    },
    // 回填类型
    defaultType: {
      /* 可取：
           0：待选中状态，就是 什么都不选
           1：默认选中最高区划
           2：回填选中传来区划
      */
      type: Number,
      default: 0
    },
    // 是否多选
    mutiple: {
      type: Boolean,
      default: false
    },
    // 是否展开选项
    collapse: {
      type: Boolean,
      default: true
    },
    // 选择器是否禁用
    disableed: {
      type: Boolean,
      default: false
    },
    // 禁止选择的区划级别小于该值的区划将是不能被选择的
    disabledLevel: {
      type: Number,
      default: 0
    },
    isCountry: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pending: false,
      maxRegion: [],
      // 手动展开节点标志
      isSetXG: false,
      // 路由回填Region id
      routeRegion: false,
      // 选择器的值参数
      regionSelect: undefined,
      adminRole: ['ROLE_ADMIN'],
      // 选中区划数据
      region: undefined
    }
  },
  watch: {
    fRegion: {
      handler (n, o) {
        console.log(n, o, this.name, this.defaultType)
        const refs = this.$refs[this.name]
        if (refs) {
          // 父节点处理
          this.handleParents(n)
        }
      },
      deep: true,
      immediate: true
    }
  },
  activated () {
    // const query = this.$route.query
    // if (query.regionId) {
    //   if (this.mutiple) {
    //     this.routeRegion = [
    //       {
    //         id: query.regionId
    //       }
    //     ]
    //   } else {
    //     this.routeRegion = {
    //       id: query.regionId
    //     }
    //   }
    //   // 父节点处理
    //   const refs = this.$refs.tree
    //   if (refs) {
    //     this.handleParents(this.routeRegion)
    //   }
    // }
  },
  methods: {
    clearHandle () {
      const refs = this.$refs[this.name]
      this.region = {}
      const checkedIds = refs.getCheckedKeys()
      this.$nextTick(() => {
        this.parentExpendMethod(checkedIds, [], {}, true)
      })
    },
    expendNode (regionId) {
      const refs = this.$refs[this.name]
      if (refs) {
        const node = refs.getNode(regionId)
        if (node) {
          this.$nextTick(() => {
            node.expand()
          })
        }
      }
    },
    nodeExpand (data, node, nodes) {
      // 重新计算下拉框的位置
      setTimeout(() => {
        const ref = this.$refs.orgSelect
        ref.broadcast('ElSelectDropdown', 'updatePopper')
      }, 1)
    },
    // 多选移除select tag
    removeOrgTag (e) {
      // 保证 区划名字是 不重复的
      this.region = this.region.filter(element => element.name !== e)
      const checkedKeys = this.region.map(i => i.id)
      this.$nextTick(() => {
        if (this.$refs[this.name]) {
          this.$refs[this.name].setCheckedKeys(checkedKeys)
        }
      })
    },
    // 确定  关闭 多选区划
    confirmMulti () {
      this.$refs.orgSelect.blur()
    },
    // 组织机构选择发生变化
    singleSelectOrg (data, checked, a, b, c, d) {
      const refs = this.$refs[this.name]
      this.expendNode(data.id)
      if (refs) {
        // 多选
        if (this.mutiple) {
          const nodes = refs.getCheckedNodes()
          this.region = nodes
          this.regionSelect = this.region?.map(item => item.name)
          this.$emit('change-org', this.region, 4)
        } else {
          // 单选
          if (checked) {
            this.region = data
            this.regionSelect = data.name
            refs.setCheckedKeys([data.id])
            this.$emit('change-org', this.region, 3)
          } else {
            // 当单选再次选择 当前选中节点的时候 相当于取消选择 但是 单选 不能没选的 所以再将其选回去
            if (this.region.id === data.id) {
              refs.setCheckedKeys([data.id])
              this.$emit('change-org', this.region, 6)
            }
          }
          this.$refs.orgSelect.blur()
        }
      }
    },
    // 清除机构
    clearSingleOrg () {
      this.org = {}
      if (this.$refs[this.name]) {
        this.$refs[this.name].setCheckedKeys([])
      }
      this.$refs.orgSelect.blur()
      this.$emit('change-org', this.org, 7)
    },
    // 懒加载区划数据
    loadNode (node, resolve) {
      let data = []
      // 节点等级：node.level
      if (node.level === 0) {
        this.getMaxOrg().then(res => {
          if (res) {
            data = res
            if (this.disabledLevel) {
              data.forEach(item => {
                if (item.level < this.disabledLevel) {
                  item.disabled = true
                }
              })
            }
            this.maxRegion = data?.length ? [data[0].id] : []
            this.rootResolve = resolve
            if (this.routeRegion) {
              this.handleParents(this.routeRegion)
            } else {
              this.initDefault(data)
            }
            resolve(data)
          }
        })
      } else if (node.data.isParent) {
        this.getChildren(node.data.id).then(res => {
          if (res) {
            data = res
            if (this.disabledLevel) {
              data.forEach(item => {
                if (item.level < this.disabledLevel) {
                  item.disabled = true
                }
              })
            }
            setTimeout(() => {
              const ref = this.$refs.orgSelect
              ref.broadcast('ElSelectDropdown', 'updatePopper')
            }, 1)
            resolve(data)
          }
        })
      } else {
        data = []
        resolve(data)
      }
    },
    // 初始化 回填数据
    initDefault (data) {
      this.$nextTick(() => {
        // 1：默认选中最高区划
        if (this.defaultType === 1) {
          if (data?.length) {
            if (this.mutiple) {
              this.region = data
            } else {
              this.region = data[0]
            }
            this.fillBackCheckedData(this.region)
            // this.$emit('change-org', this.region, 2)
          }
        } else if (this.defaultType === 2) {
          //  2：回填选中传来区划
          // 父节点处理
          this.handleParents(this.fRegion)
        }
      })
    },
    // 父节点获取 并数据处理
    handleParents (regions = [], isEmit = false) {
      this.pending = true
      const refs = this.$refs[this.name]
      // 父节点展开
      let arr = []
      const exsistRegion = []
      if (this.mutiple) {
        if (regions?.length) {
          if (refs) {
            // 如果回填区划 已经在区划树中 则不用获取其父节点，并将存在的区划数据更新树形结构里的区划数据
            arr = regions
              ?.map((item, index) => {
                const node = refs.getNode(item)
                if (!node) {
                  return item.id
                } else {
                  regions[index] = node.data
                  exsistRegion.push(node.data)
                }
              })
              .filter(item => item)
          } else {
            arr = regions?.map(item => item.id).filter(item => item)
          }
        }
      } else {
        if (regions?.id) {
          if (refs) {
            const node = refs.getNode(regions?.id)
            // 如果回填区划 已经在区划树中 则不用获取其父节点，并将存在的区划数据更新树形结构里的区划数据
            if (node) {
              regions = node.data
              exsistRegion.push(node.data)
            } else {
              arr = [regions?.id]
            }
          } else {
            arr = [regions?.id]
          }
        }
      }
      // 如果 回填数据中不在区划树型结构中区划 获取其父节点
      if (arr.length) {
        this.parentExpendMethod(arr, exsistRegion, regions, isEmit)
      } else {
        // 如果 回填数据都在区划树型结构中已经加载 则实现回填即可
        this.fillBackCheckedData(regions, isEmit)
      }
    },
    // 展开父节点
    expendParents (parents, regions, isEmit) {
      const refs = this.$refs[this.name]
      if (refs) {
        parents = parents
          .map(item => {
            const node = refs.getNode(item)
            if (node) {
              this.$nextTick(() => {
                node.loaded = false
                node.expand()
                return null
              })
            } else {
              return item
            }
          })
          .filter(item => item)
      }
      if (parents.length) {
        const timer = setTimeout(() => {
          this.expendParents(parents, regions)
          clearTimeout(timer)
        }, 500)
      } else {
        this.fillBackCheckedData(regions, isEmit)
      }
    },
    // 回填区划
    fillBackCheckedData (region, isEmit) {
      this.pending = false
      let checkedKeys = []
      this.region = {}
      if (this.mutiple) {
        if (region.length) {
          this.region = region
          checkedKeys = region.map(i => i.id)
          this.regionSelect = region.map(i => i.name)
        } else {
          this.regionSelect = []
        }
      } else {
        if (region?.id) {
          this.region = region
          checkedKeys = [region?.id]
          this.regionSelect = region?.name
        } else {
          this.regionSelect = ''
        }
      }
      this.$nextTick(() => {
        console.log(checkedKeys, 888, this.$refs[this.name])
        if (this.$refs[this.name]) {
          this.$refs[this.name].setCheckedKeys(checkedKeys)
        }
        if (isEmit) {
          this.$emit('change-org', this.region, 5)
        }
      })
    },
    // 处理父节点获取并展开，赋对应的值
    parentExpendMethod (arr = [], exsistRegion = [], regions, isEmit) {
      // 获取父节点
      this.getParents(arr)
        .then(res => {
          // 获取到 回填数据的父节点
          if (res?.length) {
            // 将父节点展平，并获取其id数组
            let fParentIds = res.flat().map(item => item.id)
            // 父节点id 去重
            fParentIds = Array.from(new Set(fParentIds))
            // 回填的数据
            let fillbackRegion = [
              ...exsistRegion,
              ...res.flat().filter(item => arr.some(it => it === item.id))
            ]
            // 单选的情况
            if (!this.mutiple) {
              fillbackRegion = fillbackRegion[0]
              if (!regions.id) {
                fillbackRegion = {}
              }
            }
            this.$nextTick(() => {
              this.expendParents(fParentIds, fillbackRegion, isEmit)
            })
          } else {
            // 如果回填数据 获取不到父节点 则说明 没权限 只回填 存在的 且有权限的区划
            if (this.mutiple) {
              regions = regions.filter(item => !arr.some(it => it === item.id))
            }
            this.fillBackCheckedData(regions, isEmit)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/tree.less';
// @import '~@/styles/orgTree.scss';
.mutiple {
  :deep(.el-checkbox__inner) {
    border-radius: 0% !important;
  }
}
:deep(.el-tag) {
  padding: 0 5px !important;
}
</style>
