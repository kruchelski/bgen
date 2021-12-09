<template>
  <GlassContainer>
    <div class="main-selectors-container">
      <span class="color-selector-title">Background {{ isGradient ? 'colors' : 'color' }} </span>
      <div class="selectors-container">
        <div class="selector">
          <input
            id="bg-color-1"
            type="color"
            class="input-color-selector"
            :style="shadowColor1"
            name="bg-color-1"
            v-model="color1"
            @input="handleInputColorSelector('bgColor1')"
          />
          <input
            id="bg-color1-text"
            type="text"
            class="color-name-input"
            name="bg-color1-text"
            v-model="colorText1"
            @input="handleInputColorText('bgColor1')"
          />
        </div>
        <div v-if="isGradient" class="selector">
          <input
            id="bg-color-2"
            type="color"
            class="input-color-selector"
            :style="shadowColor2"
            name="bg-color-2"
            v-model="color2"
            @input="handleInputColorSelector('bgColor2')"
          />
          <input
            id="bg-color2-text"
            type="text"
            class="color-name-input"
            name="bg-color2-text"
            v-model="colorText2"
            @input="handleInputColorText('bgColor2')"
          />
        </div>
      </div>
      <Button @button-click="toggleGradient()">
        <svg v-if="!isGradient" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-if="isGradient" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ isGradient ? 'Disable gradient' : 'Enable gradient' }}</span>
      </Button>
    </div>
  </GlassContainer>
</template>

<script>
import Button from '@/components/common/Button'
import GlassContainer from '@/components/common/GlassContainer'
import * as colorUtils from '@/utils/colorUtils'

export default {
  name: 'BgColorSelector',

  components: {
    Button,
    GlassContainer
  },

  props: {
    bgColor1: {
      type: String,
      default: '#ffffff'
    },

    bgColor2: {
      type: String,
      default: '#141414'
    },

    gradient: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      color1: this.bgColor1,
      color2: this.bgColor2,
      colorText1: this.bgColor1,
      colorText2: this.bgColor2,
      isGradient: this.gradient
    }
  },

  computed: {
    shadowColor1 () {
      return `box-shadow: 0 0 20px ${this.color1}`
    },

    shadowColor2 () {
      return `box-shadow: 0 0 20px ${this.color2}`
    }
  },

  methods: {
    toggleGradient () {
      this.isGradient = !this.isGradient
      const state = {
        entity: 'gradient',
        value: this.isGradient
      }
      this.$emit('state-update', state)
    },

    handleChange (entity) {
      const values = {
        bgColor1: this.color1,
        bgColor2: this.color2
      }
      const state = {
        entity,
        value: values[entity]
      }
      this.$emit('state-update', state)
    },

    handleInputColorSelector (entity) {
      if (entity === 'bgColor1') {
        this.colorText1 = this.color1
      }
      if (entity === 'bgColor2') {
        this.colorText2 = this.color2
      }
      this.handleChange(entity)
    },

    handleInputColorText (entity) {
      let color = ''
      if (entity === 'bgColor1') {
        this.colorText1 = colorUtils.normalizeColor(this.colorText1)
        color = this.colorText1
      }
      if (entity === 'bgColor2') {
        this.colorText2 = colorUtils.normalizeColor(this.colorText2)
        color = this.colorText2
      }
      if (!colorUtils.validateInputColor(color)) return
      if (entity === 'bgColor1') {
        this.color1 = color
      } else {
        this.color2 = color
      }
      this.handleChange(entity)
    }
  }
}
</script>

<style scoped>
  .main-selectors-container {
    box-sizing: border-box;
    min-width: 15rem;
    max-width: 15rem;
    min-height: 16vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    color: #381838;
  }

  .selectors-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
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

  .color-name {
    cursor: pointer;
    font-family: 'Fira Mono', monospace;
    margin-top: 0.125rem;
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
      min-width: 97vw;
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