<template>
  <div>
    login
    <router-link to="/my">My</router-link>

    <region-select
      name="regionId"
      :clearable="true"
      :default-type="RegionDefault"
      :f-region="fillRegion"
      width="190"
      @change-org="(e, a) => selectFormRegion(e, 'regionId', a)"
    />
  </div>
</template>
<script>
import RegionSelect from '@/components/TreeBackSingleMulit'
export default {
  name: 'Login',
  computed: {},
  components: { RegionSelect },
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
    }
  }
}
</script>
