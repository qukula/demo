<template>
  <div>hello friend!</div>
</template>

<script>
// 此处可引入外部文件
// 界面逻辑对象
export default {
  // 界面名称
  name: 'NameExemple',
  //   混入 逻辑文件 ，在界面逻辑对象外面，
  //   script 标签内 引入一个 外部 .js 文件，
  //   可放在这里 共享逻辑
  mixins: [],
  //   外部 组件注册 模块
  components: {},
  //   界面 参数 监听模块
  watch: {},
  // 界面参数 定义模块 ，可通过 {{ }} 符号直接展示在 模板模块
  data () {
    return {}
  },
  //   界面 方法函数定义模块
  methods: {},
  //   缓存界面 每次都进入的 生命周期函数
  activated () {},
  //   模板模块加载完 后的 生命周期函数
  mounted () {}
}
</script>

<style lang='scss' scoped>
</style>
