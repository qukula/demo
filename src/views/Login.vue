<template>
  <div>
    login
    <el-button type="primary" @click="handleLogin">登录</el-button>
    <el-button type="primary" @click="handleLogout">注销</el-button>
    <el-button type="primary" @click="handleLogout2">信息</el-button>
    <!-- <router-link to="/my">My</router-link> -->

    <!-- <region-select
      name="regionId"
      :clearable="true"
      :default-type="RegionDefault"
      :f-region="fillRegion"
      width="190"
      @change-org="(e, a) => selectFormRegion(e, 'regionId', a)"
    /> -->
  </div>
</template>
<script>
// import RegionSelect from '@/components/TreeBackSingleMulit'
export default {
  name: 'Login',
  computed: {},
  // components: { RegionSelect },
  data () {
    return {
      RegionDefault: 2,
      fillRegion: {},
      // type: 'Horizontal'
      type: 'Vertical'
    }
  },
  methods: {
    selectFormRegion (a, b, c) {
      console.log(a, b, c)
    },
    handleLogin () {
      this.$store
        .dispatch('user/handleLogin', {
          username: '13012455421',
          password: '123456'
        })
        .then(res => {
          if (res) {
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push('/my')
            }
          }
        })
    },
    handleLogout () {
      this.$store.dispatch('user/handleLogout').then(res => {
        if (res) {
          this.$router.push('/login')
        }
      })
    },
    handleLogout2 () {
      this.$router.push('/my')
    }
  }
}
</script>
