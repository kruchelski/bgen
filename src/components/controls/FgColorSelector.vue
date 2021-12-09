<template>
  <div class="glass-container-controls main-selectors-container">
    <span class="color-selector-title">Foreground color</span>
    <div class="selectors-container">
      <div
        v-show="foreground"
        class="selector"
      >
        <input
          id="color"
          type="color"
          class="input-color-selector"
          :style="shadowColor"
          name="color"
          v-model="color"
          @input="handleInputColorSelector('fgColor')"
        />
        <input
          id="color-text"
          type="text"
          class="color-name-input"
          name="color-text"
          v-model="colorText"
          @input="handleInputColorText('fgColor')"
        />
      </div>
    </div>
    <Button @button-click="toggleForeground()">
      <svg v-if="!foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg v-if="foreground" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ foreground ? 'Hide foreground' : 'Show foreground' }}</span>
    </Button>
  </div>
</template>

<script>
import Button from '@/components/common/Button'
import * as colorUtils from '@/utils/colorUtils'

export default {
  name: 'FgColorSelector',

  components: {
    Button
  },

  props: {
    fgColor: {
      type: String,
      default: '#ffffff'
    },

    showForeGround: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      color: this.fgColor,
      colorText: this.fgColor,
      foreground: this.showForeGround
    }
  },

  computed: {
    shadowColor () {
      return `box-shadow: 0 0 20px ${this.color}`
    }
  },

  methods: {
    toggleForeground () {
      this.foreground = !this.foreground
      const state = {
        entity: 'showForeGround',
        value: this.foreground
      }
      this.$emit('state-update', state)
    },

    handleChange (entity) {
      const state = {
        entity,
        value: this.color
      }
      this.$emit('state-update', state)
    },

    handleInputColorSelector (entity) {
      this.colorText = this.color
      this.handleChange(entity)
    },

    handleInputColorText (entity) {
      this.colorText = colorUtils.normalizeColor(this.colorText)
      const colorTemp = this.colorText
      if (!colorUtils.validateInputColor(colorTemp)) return
      this.color = colorTemp
      this.handleChange(entity)
    }
  }
}
</script>

<style scoped>
  .main-selectors-container {
    min-width: 13rem;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    color: #381838
  }

  .selectors-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
    margin-bottom: 0;
  }

  .selector {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 0.5rem;
  }

  .glass-container-controls {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .input-color-selector {
    border: transparent;
    height: 1.5rem;
    width: 1.8rem;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    background-color: transparent;
    cursor: pointer;
  }

  .color-selector-title {
    align-self: center;
  }

  .color-name-input {
    font-family: 'Fira Mono', monospace;
    border: 1px solid rgba(25, 19, 23, 0.5);
    height: 1.5rem;
    width: 4.5rem;
    border-radius: 0.25rem;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    color: #381838;
    font-size: 0.8rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    margin-top: 0.25rem;
  }
  
  @media only screen and (max-width: 710px) {
    .main-selectors-container {
      min-width: 100%;
    }

    .selectors-container {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

</style>