<template>
  <div>
    login
    <el-button type="primary" @click="handleLogin">登录</el-button>
    <el-button type="primary" @click="getUserInfo">信息</el-button>
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
      type: 'Horizontal'
      // type: 'Vertical'
    }
  },
  methods: {
    selectFormRegion (a, b, c) {
      console.log(a, b, c)
    },
    handleLogin () {
      this.$handleApi({ username: 'admin', password: 'shubiao1229' }, '/api/login', 'post').then(res => {
        console.log(res, '登录')
        if (res) {

        }
      })
    },
    getUserInfo () {
      this.$handleApi({}, '/api/user/getUserInf').then(res => {
        console.log(res, 'getUserInfo')
      })
    }
  }
}
</script>
