<template>
  <div class="glass-container-controls main-selectors-container">
    <span class="color-selector-title">Background {{ isGradient ? 'colors' : 'color' }} </span>
    <div class="selectors-container">
      <div class="selector">
        <input
          type="color"
          class="input-color-selector"
          id="bg-color-1"
          name="bg-color-1"
          v-model="color1"
          @input="handleChange('bgColor1')"
        />
        <label class="color-name" for="bg-color-1">{{ color1 }}</label>
      </div>
      <div class="selector">
        <input
          type="color"
          class="input-color-selector"
          id="bg-color-2"
          name="bg-color-2"
          :disabled="!isGradient"
          v-model="color2"
          @input="handleChange('bgColor2')"
        />
        <label class=color-name for="bg-color-2">{{ color2 }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BgColorSelector',

  props: {
    bgColor1: {
      type: String,
      default: '#ffffff'
    },
    bgColor2: {
      type: String,
      default: '#141414'
    }
  },

  data () {
    return {
      color1: this.bgColor1,
      color2: this.bgColor2,
      isGradient: true
    }
  },

  methods: {
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
    }
  }
}
</script>

<style scoped>
  .main-selectors-container {
    min-width: 13rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 0.25rem 1rem;
    font-size: 0.8rem;
    /* color: rgba(210, 200, 200, 0.5) */
    color: #564556
  }

  .selectors-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 2px;
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

  input:disabled {
    opacity: 30%;
  }

  .color-name {
    cursor: pointer;
    font-family: 'Fira Mono', monospace;
    margin-top: 0.125rem;
  }

</style>