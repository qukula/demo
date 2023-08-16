<template>
  <el-container id="app">
    <el-aside>
      <saide-bar></saide-bar>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main> <router-view /></el-main>
    </el-container>
  </el-container>
</template>
<script>
import SaideBar from '@/components/base/sidebar/index'
export default {
  name: 'App',
  computed: {
    layout: function () {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  },
  components: { SaideBar },
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
