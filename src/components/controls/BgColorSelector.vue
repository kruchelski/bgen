<template>
  <div class="glass-container-controls main-selectors-container">
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
          @input="handleChange('bgColor1')"
        />
        <label class="color-name" for="bg-color-1">{{ color1 }}</label>
      </div>
      <div v-if="isGradient" class="selector">
        <input
          id="bg-color-2"
          type="color"
          class="input-color-selector"
          :style="shadowColor2"
          name="bg-color-2"
          v-model="color2"
          @input="handleChange('bgColor2')"
        />
        <label
          class=color-name
          for="bg-color-2"
        >
          {{ color2 }}
        </label>
      </div>
    </div>
      <button
        class="gradient-button"
        @click="toggleGradient()"
      >
        <svg v-if="!isGradient" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-if="isGradient" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ isGradient ? 'Disable gradient' : 'Enable gradient' }}</span>
      </button>
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
    }
  }
}
</script>

<style scoped>
  .main-selectors-container {
    min-width: 13rem;
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

  .color-name {
    cursor: pointer;
    font-family: 'Fira Mono', monospace;
    margin-top: 0.125rem;
  }

  .gradient-button {
    position: relative;
    align-self: center;
    margin-top: 00.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(25, 19, 23, 0.5);
    color: rgba(255, 255, 255, 0.5);
    padding: 0.25rem 1rem;
    border-radius: 0.25rem;
    border: transparent;
    font-size: 0.8rem;
    font-weight: 300;
    cursor: pointer;
    transition: all 100ms;
  }

  .gradient-button:hover {
    background-color: rgba(75, 29, 75, 0.5);
    box-shadow: 0 0 20px rgba(75, 29, 75, 0.1);
  }

  .gradient-button:active {
    background-color: rgba(10, 0, 10, 0.5);
    transform: translateY(1px);
    transform: scale(0.98);
  }

  .gradient-button span {
    margin-left: 0.25rem;
  }

  .gradient-button svg {
    width: 0.8rem;
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