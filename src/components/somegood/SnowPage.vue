<template>
  <div class="snow-page"></div>
</template>

<script>
export default {
  name: 'SnowPage',
  mixins: [],
  components: {},
  data () {
    return {}
  },
  methods: {
    embRand (a, b) {
      return Math.floor(Math.random() * (b - a + 1)) + a
    },
    snowShow () {
      var snowCSS = '.snow{position: absolute;width: 10px;height: 10px;background: snow;border-radius: 50%;margin-top:-10px}'
      var snowContent = ''
      for (let i = 1; i < 200; i++) {
        snowContent += '<i class="snow"></i>'
        var rndX = (this.embRand(0, 1000000) * 0.0001)
        var rndO = this.embRand(-100000, 100000) * 0.0001
        var rndT = (this.embRand(3, 8) * 2).toFixed(2)
        var rndS = (this.embRand(0, 10000) * 0.0001).toFixed(2)

        snowCSS += '.snow:nth-child(' + i + '){' + 'opacity:' + (this.embRand(1, 10000) * 0.0001).toFixed(2) + ';' +
        'transform:translate(' + rndX.toFixed(2) + 'vw,-10px) scale(' + rndS + ');' + 'animation:fall-' + i + ' ' +
        this.embRand(2, 8) + 's -' + this.embRand(0, 9) + 's linear infinite' + '}' + '@keyframes fall-' + i + '{' + rndT + '%{' + 'transform:translate(' + (rndX + rndO).toFixed(2) + 'vw,' + rndT + 'vh) scale(' + rndS + ')' + '}' + 'to{' + 'transform:translate(' + (rndX + (rndO / 2)).toFixed(2) + 'vw, 105vh) scale(' + rndS + ')' + '}' + '}'
      }

      const snowCanvas = document.createElement('div')
      snowCanvas.id = 'snowCanvas'
      snowCanvas.innerHTML = '<style>#snowCanvas{position:fixed;left:0;top:0;bottom:0;width:100vw;height:100vh;overflow:hidden;z-index:9999999;pointer-events:none}' +
       snowCSS + '</style>' + snowContent
      console.log(snowCanvas)
      document.body.appendChild(snowCanvas)
      console.log(snowCanvas)
    }
  },
  mounted () {
    this.snowShow()
  }
}
</script>

<style lang='less' scoped>
.snow-page {
  height: 100%;
  background: #346177;
}
</style>
