<template>
  <div :class="{ 'has-logo': showLogo }">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <div v-if="showLogo">logo看看</div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- :default-active="activeMenu" -->
      <!-- :text-color="variables.menuText" -->
      <!-- :active-text-color="variables.menuActiveText" -->
        <!-- :background-color="variables.menuBg" -->
      <el-menu
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
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
</style>
