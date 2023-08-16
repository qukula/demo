<template>
  <div class="stars">
    <section class="section" id="section">
      <!-- <h2 class="section__title">稀土掘金新年快乐<br /><span>2023</span></h2> -->
    </section>
  </div>
</template>

<script>
export default {
  name: 'NameExemple',
  mixins: [],
  components: {},
  data () {
    return {}
  },
  methods: {
    setStars () {
      const count = 200
      //   const section = document.querySelector('.section')
      //   const section = this.$refs.section
      const section = document.getElementById('section')
      let i = 0
      while (i < count) {
        const star = document.createElement('i')
        const x = Math.floor(Math.random() * window.innerWidth)
        const y = Math.floor(Math.random() * window.innerHeight)

        const size = Math.random() * 4
        star.style.left = x + 'px'
        star.style.top = y + 'px'
        star.style.width = 1 + size + 'px'
        star.style.height = 1 + size + 'px'
        star.style.color = 'red'

        const duration = Math.random() * 2

        star.style.animationDuration = 2 + duration + 's'
        star.style.animationDelay = 2 + duration + 's'

        section.appendChild(star)
        i++
      }
    }
  },
  mounted () {
    this.setStars()
  }
}
</script>

<style lang='less' scoped>
.stars {
  height: 100%;

  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 100vh;
    background: linear-gradient(135deg, #111, #222, #111);
  }
  .section::before {
    content: '';
    position: absolute;
    width: 30vw;
    height: 30vw;
    border: 5vw solid #ff1062;
    border-radius: 50%;
    box-shadow: 0 0 0 1vw #222, 0 0 0 1.3vw #fff;
  }
  .section .section__title {
    position: absolute;
    transform: skewY(-7deg);
    z-index: 10;
    color: #fff;
    text-align: center;
    font-size: 9vw;
    line-height: 2em;
    text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #ccc, 3px 3px 0 #ccc, 4px 4px 0 #ccc,
      5px 5px 0 #ccc, 10px 10px 0 rgba(0, 0, 0, 0.2);
    animation: floating 5s ease-in-out infinite;
  }
  .section .section__title span {
    text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #ccc, 3px 3px 0 #ccc, 4px 4px 0 #ccc,
      5px 5px 0 #ccc, 6px 6px 0 #ccc, 7px 7px 0 #ccc, 8px 8px 0 #ccc,
      9px 9px 0 #ccc, 20px 20px 0 rgba(0, 0, 0, 0.2);
    font-weight: 700;
    font-size: 3em;
  }
  .section i {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #fff, 0 0 80px #fff;
    animation: animate linear infinite;
  }

  @keyframes floating {
    0%,
    100% {
      transform: skewY(-7deg) translate(0, -20px);
    }
    50% {
      transform: skewY(-7deg) translate(0, 20px);
    }
  }
  @keyframes animate {
    0% {
      opactiy: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
