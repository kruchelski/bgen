<template>
  <div class="controls-container">
    <div class="main-controls">
      <div class="glass-container control">
        AiAi
      </div>
      <div class="control">
        <BgColorSelector
          :bgColor1="bgColor1"
          :bgColor2="bgColor2"
          @state-update="handleStateUpdate"
        />
      </div>
      <div class="glass-container control">
        Aiai
      </div>
    </div>
  </div>
</template>

<script>
import BgColorSelector from '@/components/BgColorSelector'

export default {
  name: 'Controls',

  components: {
    BgColorSelector
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

    showForeGround: {
      type: Boolean,
      default: false
    },

    fgColor: {
      type: String,
      defualt: '#ffffff'
    }
  },

  methods: {
    handleStateUpdate (state) {
      this.$emit('state-update', state)
    }
  }
}
</script>

<style scoped>
  .glass-container {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .controls-container {
    min-width: 97vw;
    max-width: 97vw;
    min-height: 13vh;
    margin: 0 auto;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    box-sizing: border-box;
  }

  .main-controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .control {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  @media only screen and (max-width: 710px) {
    .main-controls {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }

    .main-controls :nth-child(2) {
      order: -1;
    }

    .control {
      flex: 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin: 0.5rem 0;
    }
  }
</style>