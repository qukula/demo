<template>
  <div>hello friend!</div>
</template>

<script>
import firework from './Particle'
export default {
  name: 'Fireworks',
  mixins: [],
  components: {},
  data () {
    return {}
  },
  methods: {},
  mounted () {
    firework.show()
  }
}
</script>

<style lang='less' scoped>
</style>
