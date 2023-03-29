<template>
  <div>
    <template v-if="hasChildren(item.children)">
        <!-- :index="resolvePath(item.path)" -->
      <el-submenu
        ref="subMenu"
        popper-append-to-body
      >
        <template slot="title">
          <sidebar-title
            :icon="item.icon"
            :title="item.title"
          />
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          class="nest-menu"
        />
          <!-- :base-path="resolvePath(child.path)" -->
      </el-submenu>
    </template>
  </div>
</template>

<script>
import SidebarTitle from './SidebarTitle'
export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  mixins: [],
  components: { SidebarTitle },
  computed: {
    hasChildren () {
      return children => {
        return children?.length > 0
      }
    }
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>

<style lang='less' scoped>
</style>
