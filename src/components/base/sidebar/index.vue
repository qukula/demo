<template>
  <div class="side-menu-wrapper">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <!-- <div v-if="showLogo">logo看看</div> -->
    <el-scrollbar wrap-class="scrollbar-wrapper ">
      <!-- :default-active="activeMenu" -->
      <!-- :text-color="variables.menuText" -->
      <!-- :active-text-color="variables.menuActiveText" -->
      <!-- :background-color="variables.menuBg" -->
      <el-menu :collapse="isCollapse" :unique-opened="true" mode="vertical">
        <sidebar-item
          v-for="route in sidebarList"
          :key="route.name"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  name: 'Sidebar',
  mixins: [],
  components: { SidebarItem },
  computed: {
    showLogo () {
      console.log(this.$router.options, 700)
      return false
    },
    ...mapGetters(['sidebarList'])
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {},
  mounted () {}
}
</script>

<style lang='less' scoped>
.scroll-bar {
  &::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
    border-left: 1px solid rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 6px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    background-clip: padding-box;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    min-height: 28px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
}
.side-menu-wrapper {
  /* el-scrollbar引用自定义滑动 父类必设高度 */
  .el-scrollbar {
    height: 100vh;
    /* el-scrollbar的wrap-class类 */
    .scrollbar {
      height: 100%;
      overflow-x: hidden;
      /* 一级菜单样式 */
      .el-menu {
        border-right: none;
        .side-menu-item {
          .el-submenu__title {
            height: 52px;
            line-height: 52px;
            * {
              vertical-align: top;
            }
          }
          /* 菜单项高度重置 */
          .el-menu-item {
            height: 52px;
            line-height: 52px;
          }
          /* 图标样式 */
          i {
            font-size: 14px;
            color: #e20d0d;
          }
          .icon {
            margin-right: 8px;
          }
          /* 二级菜单颜色 */
          .el-submenu {
            .side-menu-item .el-submenu__title,
            .el-menu-item {
              background: #0790cf !important;
            }
            /* 三级菜单颜色 */
            .el-submenu {
              .el-menu-item {
                background: #1d272b !important;
              }
            }
            /* 三级菜单hover样式-较特殊 */
            .el-menu-item,
            .el-submenu__title {
              &:hover {
                background: #2f3e45 !important;
              }
            }
          }
          /* 菜单项hover样式 */
          .el-menu-item,
          .el-submenu__title {
            &:hover,
            &.is-active {
              .icon,
              span {
                color: #409eff;
              }
            }
            &:hover {
              background: #2f3e45 !important;
            }
          }
          /* 菜单项active样式 */
          .is-active {
            .icon,
            > .el-submenu__title {
              color: #409eff !important;
            }
          }
        }
      }
      /* 折叠菜单样式 */
      .el-menu--collapse {
        .side-menu-item {
          transition: font-size 0.5s;
          i {
            font-size: 20px;
          }
          span,
          .el-menu--inline,
          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }
    }
  }
}
</style>
