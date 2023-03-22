<template>
  <el-container id="app">
    <el-header>Header</el-header>
    <el-container>
      <el-aside>Aside</el-aside>
      <el-main> <router-view /></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'App',
  components: {}
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
