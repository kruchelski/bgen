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
      <PlaceholderContent
        v-show="showForeGround"
        :fg-color="fgColor"
      />
    </div>
    <div class="info-container">
      <p class="info-text">
        {{ bgStyle }}
        <button
          title="Copy style to clipboard"
          @click="copyStyleToClipboard(bgStyle)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </p>
    </div>
    <Controls
      :bgColor1="bgColor1"
      :bgColor2="bgColor2"
      :showForeGround="showForeGround"
      :fgColor="fgColor"
      @state-update="handleStateUpdate"
    />
  </div>
</template>

<script>
import PlaceholderContent from '@/components/PlaceholderContent'
import Controls from '@/components/Controls'

export default {
  name: 'BackgroundMain',

  components: {
    PlaceholderContent,
    Controls
  },

  data () {
    return {
      gradient: true,
      bgColor1: '',
      bgColor2: '',
      fgColor: '#FFFFFF',
      showForeGround: true,
      savedName: ''
    }
  },

  created () {
    this.init()
  },

  computed: {
    bgStyle () {
      return this.generateBackgroundClass(this.gradient, this.bgColor1, this.bgColor2)
    }
  },

  methods: {
    init () {
      this.bgColor1 = this.generateColor()
      this.bgColor2 = this.generateColor()
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
    },

    copyStyleToClipboard (style) {
      navigator.clipboard.writeText(style)
    },

    handleStateUpdate (state) {
      const { entity = null, value = null } = state
      if (entity === null || value === null) return
      this[entity] = value
    }
  }
}
</script>

<style scoped>
  .main-container {
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding-bottom: 0.5rem;
  }

  .container {
    position: relative;
    min-height: 79vh;
    min-width: 85vw;
    max-width: 85vw;
    max-height: 79vh;
    overflow-y: auto;
    margin: 0 auto;
    padding: 1rem 2rem 2rem;
    box-sizing: border-box;
  }
  
  .info-container {
    position: relative;
    display: inline;
    align-self: center;
    min-height: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .info-text {
    position: relative;
    font-family: 'Fira Mono', monospace;
    word-break: break-all;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }

  .glass-container {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .title-background {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    align-self: flex-start;
    display: inline-block;
    padding: 1rem 3.5rem;
    margin-bottom: 2rem;
    z-index: 3;
  }

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(to right, #5F0A87, #A4508B);
    background-clip: text;
    color: transparent;
    word-break: break-all;
  }

  button {
    background: linear-gradient(to right bottom, transparent, transparent);
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    transition: all 500ms;
    padding: 0.25rem;
    border-radius: 50%;
    min-height: 2rem;
    min-width: 2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 4px;
    flex-wrap: nowrap;
  }

  button:hover {
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
    
  }

  button:active {
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1));
    color: rgba(180, 90, 200, 0.8);
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 1.2rem;
    position: relative;
  }

    @media only screen and (max-width: 710px) {
    .title-background {
      position: sticky;
      position: -webkit-sticky;
      top: 0;
      align-self: center;
      display: block;
      text-align: center;
      padding: 1rem 2rem;
      margin-bottom: 2rem;
      z-index: 3;
    }

    h1 {
      font-size: 1.8rem;
      background: linear-gradient(to right, #5F0A87, #A4508B);
      background-clip: text;
      color: transparent;
      word-break: break-all;
    }

    .info-container {
      position: relative;
      display: inline;
      align-self: center;
      min-height: 2vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .info-text {
      position: relative;
      font-family: 'Fira Mono', monospace;
      word-break: break-all;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.8rem;
    }
  }

</style>