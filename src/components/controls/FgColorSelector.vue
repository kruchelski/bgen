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
          @input="handleChange('fgColor')"
        />
        <label class="color-name" for="color">{{ color }}</label>
      </div>
    </div>
      <button
        class="toggle-foreground-button"
        @click="toggleForeground()"
      >
        <svg v-if="!foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-if="foreground" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ foreground ? 'Hide foreground' : 'Show foreground' }}</span>
      </button>
  </div>
</template>

<script>
export default {
  name: 'FgColorSelector',

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

  .color-name {
    cursor: pointer;
    font-family: 'Fira Mono', monospace;
    margin-top: 0.125rem;
  }
  
  .toggle-foreground-button {
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

  .toggle-foreground-button:hover {
    background-color: rgba(75, 29, 75, 0.5);
    box-shadow: 0 0 20px rgba(75, 29, 75, 0.1);
  }

  .toggle-foreground-button:active {
    background-color: rgba(10, 0, 10, 0.5);
    transform: translateY(1px);
    transform: scale(0.98);
  }

  .toggle-foreground-button span {
    margin-left: 0.25rem;
  }

  .toggle-foreground-button svg {
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