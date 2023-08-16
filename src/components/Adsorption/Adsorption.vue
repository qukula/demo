<template>
  <div class="adsorption">
    <canvas id="canvas"></canvas>
    <div id="hint"></div>
  </div>
</template>

<script>
// https://code.juejin.cn/pen/7185741309234118712
// 有转换难度  先放着 回头研究
export default {
  name: 'Adsorption',
  mixins: [],
  components: {},
  data () {
    class Particle {
      constructor (x, y) {
        this.x = x
        this.y = y
        this.size = 3
        // base - origin
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 30) + 1
      }

      draw (context) {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fill()
        context.closePath()
      }

      update (mouse) {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const maxDistance = mouse.radius
        const force = (maxDistance - distance) / maxDistance
        const directionX = forceDirectionX * force * this.density
        const directionY = forceDirectionY * force * this.density
        if (distance < mouse.radius) {
          this.x -= directionX
          this.y -= directionY
        } else {
        // reset position
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 5
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 5
          }
        }
      }

      connect (particleArray, textCoordinates, connectDistance, context) {
        let opacityValue = 1
        for (let i = 0; i < particleArray.length; i += 1) {
          const dx = particleArray[i].x - this.x
          const dy = particleArray[i].y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const r = textCoordinates.data[i * 4]
          const g = textCoordinates.data[i * 4 + 1]
          const b = textCoordinates.data[i * 4 + 2]
          if (distance < connectDistance) {
            opacityValue = 1 - (distance / connectDistance)
            context.strokeStyle = `rgba(${r + 50}, ${g + 50}, ${b + 50}, ${opacityValue})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(this.x, this.y)
            context.lineTo(particleArray[i].x, particleArray[i].y)
            context.stroke()
          }
        }
      }
    }
    return {
      canvasDom: undefined,
      hintDom: undefined,
      context: undefined,
      gradient: undefined,
      textCoordinates: undefined,
      particleArray: [],
      mouse: {
        x: undefined,
        y: undefined,
        radius: 150
      },
      connectDistance: 50,
      textMaxWidth: 100,
      textMaxHeight: 34,
      textGap: 34,
      texts: ['HAPPY', 'NEW', 'YEAR 2023']
    }
  },
  methods: {
    initParams () {
      this.canvasDom = document.getElementById('canvas')
      this.hintDom = document.getElementById('hint')
      this.context = this.canvasDom.getContext('2d')
      this.hintDom.innerText = this.initHintText
      this.hintDom.addEventListener('mouseenter', () => {
        this.hintDom.innerText = 'Happy New Year To You - from Jimmy'
      })
      this.hintDom.addEventListener('mouseout', () => {
        this.hintDom.innerText = this.initHintText
      })
    },
    setCanvasVariables () {
      this.canvasDom.width = window.innerWidth
      this.canvasDom.height = window.innerHeight
      this.gradient = this.context.createLinearGradient(
        0,
        0,
        this.canvasDom.width,
        this.canvasDom.height
      )
      this.gradient.addColorStop(0.3, 'red')
      this.gradient.addColorStop(0.5, 'fuchsia')
      this.gradient.addColorStop(0.7, 'purple')
      this.context.fillStyle = this.gradient

      this.context.font = '14px serif'
      this.context.textAlign = 'center'

      this.texts.map((text, index) => {
        this.context.fillText(
          text,
          this.textMaxWidth / 2,
          10 * (index + 1) + index + this.textGap,
          this.textMaxWidth
        )
        this.context.strokeText(
          text,
          this.textMaxWidth / 2,
          10 * (index + 1) + index + this.textGap,
          this.textMaxWidth
        )
        if (index === this.texts.length - 1) {
          this.textMaxHeight = 10 * this.texts.length + index * this.textGap
        }
      })

      this.textCoordinates = this.context.getImageData(
        0,
        0,
        this.textMaxWidth,
        this.textMaxHeight
      )
    },
    animate () {
      this.clearCavans()
      for (let i = 0; i < this.particleArray.length; i += 1) {
        this.particleArray[i].draw()
        this.particleArray[i].update()
        this.particleArray[i].connect()
      }
      requestAnimationFrame(this.animate)
    },
    init () {
      this.particleArray = []
      for (let y = 0; y < this.textCoordinates.height; y += 1) {
        for (let x = 0; x < this.textCoordinates.width; x += 1) {
          if (this.textCoordinates.data[(y * 4 * this.textCoordinates.width) + (x * 4) + 3] > (256 / 3 * 2)) {
            const positionX = x
            const positionY = y
            this.particleArray.push(new Particle(positionX * (this.canvasDom.width / this.textMaxWidth), positionY * (this.canvasDom.height / this.textMaxHeight)))
          }
        }
      }
    }
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
.adsorption {
  height: 100%;
  background: #346177;
}
</style>
