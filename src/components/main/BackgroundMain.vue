<template>
  <div
    class="main-container"
    :style="bgStyle"
  >
    <div class="container">
      <div v-tilt class="glass-container title-background">
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
        {{ randomName }}
      </p>
      <p class="info-text">
        {{ bgStyle }}
        <button
          class="copy-button"
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
      :key="controlsKey.toString()"
      :bgColor1="bgColor1"
      :bgColor2="bgColor2"
      :gradient="gradient"
      :showForeGround="showForeGround"
      :fgColor="fgColor"
      :id="id"
      :name="name"
      :configs="configs"
      @state-update="handleStateUpdate"
      @config-save="handleConfigSave"
    />
    <button
      class="change-color-button button-left"
      title="Previous random config"
      @click="changeRandomConfig('prev')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="change-color-button button-right"
      :title="actualIndex !== randomConfigs.length - 1 ? 'Next random config' : 'Generate new random config'"
      @click="actualIndex !== randomConfigs.length - 1 ? changeRandomConfig('next') : randomNewColor()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script>
import PlaceholderContent from '@/components/main/PlaceholderContent'
import Controls from '@/components/controls/Controls'
import * as ToastrService from '@/services/ToastrService'

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
      showForeGround: false,
      name: '',
      randomName: '',
      id: null,
      configs: [],
      randomConfigs: [],
      actualIndex: -1,
      controlsKey: 0
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

  watch: {
    actualIndex () {
      this.controlsKey++
    }
  },

  methods: {
    init () {
      this.randomNewColor()
    },

    randomNewColor () {
      this.bgColor1 = this.generateColor()
      this.bgColor2 = this.generateColor()
      this.randomName = new Date().valueOf().toString()
      this.addNewRandomConfig(this.bgColor1, this.bgColor2, this.randomName)
      this.actualIndex++
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
      if (typeof navigator.clipboard !== 'undefined') {
        navigator.clipboard.writeText(style)
        ToastrService.displayToastr('Style copied to the clipboard', 'Style copied', 'success')
        return
      }
      const textArea = document.createElement('textarea')
      textArea.value = style
      textArea.style.position = 'fixed'
      document.body.append(textArea)
      textArea.focus()
      textArea.select()
      try {
        const copySuccess = document.execCommand('copy')
        if (copySuccess) {
          ToastrService.displayToastr('Style copied to the clipboard', 'Style copied', 'success')
        } else {
          ToastrService.displayToastr('Style not copied to the clipboard due to unexpected error', 'Style not copied', 'error')
        }
      } catch (error) {
        const errorMsg = error.message || 'Unexpected error'
        ToastrService.displayToastr(`Style not copied: ${errorMsg}` , 'Style not copied', 'error')
      } finally {
        document.body.removeChild(textArea)
      }
    },

    handleStateUpdate (state) {
      const { entity = null, value = null } = state
      if (entity === null || value === null) return
      this[entity] = value
    },

    handleConfigSave (config) {
      // TODO: Implement function
      ToastrService.displayToastr(`Config ${config.name.substring(0, 100)} saved (function not implemented)`, 'Config saved', 'success')
    },

    addNewRandomConfig (bgColor1, bgColor2, randomName) {
      this.randomConfigs.push({
        bgColor1,
        bgColor2,
        randomName
      })
    },

    changeRandomConfig (action) {
      let tempIndex = 0
      if (action === 'prev') {
        if (this.actualIndex === 0) {
          tempIndex = this.randomConfigs.length - 1
          this.bgColor1 = this.randomConfigs[tempIndex].bgColor1
          this.bgColor2 = this.randomConfigs[tempIndex].bgColor2
          this.randomName = this.randomConfigs[tempIndex].randomName
          this.actualIndex = tempIndex
        } else {
          tempIndex = this.actualIndex - 1
          this.bgColor1 = this.randomConfigs[tempIndex].bgColor1
          this.bgColor2 = this.randomConfigs[tempIndex].bgColor2
          this.randomName = this.randomConfigs[tempIndex].randomName
          this.actualIndex = tempIndex
        }
      } else {
        tempIndex = this.actualIndex + 1
        this.bgColor1 = this.randomConfigs[tempIndex].bgColor1
        this.bgColor2 = this.randomConfigs[tempIndex].bgColor2
        this.randomName = this.randomConfigs[tempIndex].randomName
        this.actualIndex = tempIndex
      }
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
  }

  .container {
    position: relative;
    min-height: 77vh;
    min-width: 85vw;
    max-width: 85vw;
    max-height: 77vh;
    overflow-y: auto;
    margin: 0 auto;
    padding: 1rem 2rem 2rem;
    box-sizing: border-box;
  }
  
  .info-container {
    position: relative;
    align-self: center;
    min-height: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
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

  .copy-button {
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

  .copy-button:hover {
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
    
  }

  .copy-button:active {
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1));
    color: rgba(180, 90, 200, 0.8);
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
  }

  .copy-button svg {
    width: 1.2rem;
    position: relative;
  }

  .change-color-button {
    display: inline-flex;
    color: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 50vh;
    justify-content: center;
    align-items: center;
    height: 5rem;
    width: 2rem;
    border: none;
    background: linear-gradient(to right bottom, rgba(200, 200, 200, 0.3), rgba(200, 200, 200, 0.1));
    transition: all 300ms;
    box-shadow: 0px 0px 10px rgba(100, 100, 100, 0.2);
    cursor: pointer;
  }

  .change-color-button:hover {
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    color: rgba(255, 255, 255, 0.9);
  }

  .change-color-button:active {
    background: linear-gradient(to right bottom, rgba(180, 180, 180, 0.3), rgba(180, 180, 180, 0.1));
    color: rgba(255, 255, 255, 0.9);
  }

  .button-left {
    left: 0px;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .button-right {
    right: 0px;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  .change-color-button svg {
    height: 1.2rem;
    transition: all 50ms;
  }

  .change-color-button:hover svg {
    transform: scale(1.5);
  }

  .change-color-button:active svg {
    transform: scale(1.2)
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