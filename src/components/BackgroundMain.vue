<template>
  <div
    class="main-container"
    :style="bgStyle"
  >
    <div class="container">
      <div class="glass-container title-background">
        <h1>
          c.background.generator
        </h1>
      </div>
      <PlaceholderContent :fg-color="fgColor" />
    </div>
    <div class="info-container">
      <p class="info-text">
        {{ bgStyle }}
      </p>
    </div>
    <div class="test">
      Teste
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
      <div>
        Opa
      </div>
    </div>
  </div>
</template>

<script>
import PlaceholderContent from '@/components/PlaceholderContent'

export default {
  name: 'BackgroundMain',

  components: {
    PlaceholderContent
  },

  data () {
    return {
      gradient: true,
      bgColor1: '',
      bgColor2: '',
      bgStyle: '',
      fgColor: '#FFFFFF',
      showForeGround: false,
      savedName: ''
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.bgColor1 = this.generateColor()
      this.bgColor2 = this.generateColor()
      this.bgStyle = this.generateBackgroundClass (this.gradient, this.bgColor1, this.bgColor2)
      console.log('init')
      console.log('bgColor1: ', this.bgColor1)
      console.log('bgColor2: ', this.bgColor2)
      console.log('bgStyle: ', this.bgStyle)
    },
  
    generateColor () {
      const red = this.randomHexaDecimal(255.99)
      const green = this.randomHexaDecimal(255.99)
      const blue = this.randomHexaDecimal(255.99)
      return `#${red}${green}${blue}`
    },

    randomHexaDecimal (max) {
      return Math.floor(Math.random() * max).toString(16).padStart(2, '0')
    },

    generateBackgroundClass (gradient, bgColor1, bgColor2) {
      if (gradient) {
        return `background: linear-gradient(to right, ${bgColor1}, ${bgColor2})`
      } else {
        return `background-color: ${bgColor1}`
      }
    }
  }
}
</script>

<style>
  .main-container {
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
  }

  .container {
    position: relative;
    min-height: 72vh;
    min-width: 85vw;
    max-width: 85vw;
    max-height: 72vh;
    overflow-y: auto;
    margin: auto;
    padding: 2rem;
    padding-top: 4rem;
  }
  
  .info-container {
    position: relative;
    display: inline;
    align-self: center;
    min-height: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px !important;
    padding: 0.5rem 2rem;
  }

  .info-text {
    font-family: 'Fira Mono', monospace;
    word-break: break-all;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }

  .test {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;
  }

  .glass-container {
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .title-background {
    position: sticky;
    top: 0;
    align-self: flex-start;
    display: inline-block;
    padding: 1rem 4rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 3.5rem;
    background: linear-gradient(to right, #5F0A87, #A4508B);
    background-clip: text;
    color: transparent;
    word-break: break-all;
  }

</style>