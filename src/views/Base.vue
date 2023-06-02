<template>
  <component v-bind:is="type"></component>
</template>
<script>
import Horizontal from '@/components/base/layout/Horizontal'
import Vertical from '@/components/base/layout/Vertical'
export default {
  name: 'App',
  computed: {
    layout: function () {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  },
  components: { Horizontal, Vertical },
  data () {
    return {
      // type: 'Horizontal'
      type: 'Vertical'
    }
  }
}
</script>
<style lang='less' scoped>
#app {
  height: 100%;
  border: 1px solid red;
  /deep/ .el-header {
    border: 1px solid red;
  }
  .el-container {
  }
  /deep/ .el-main {
    border: 1px solid red;
  }
  /deep/ .el-aside {
    border: 1px solid red;
  }
}
</style>
