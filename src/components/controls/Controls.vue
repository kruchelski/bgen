<template>
  <div class="controls-container">
    <div class="control">
      <FgColorSelector
        :fgColor="fgColor"
        :showForeGround="showForeGround"
        @state-update="handleStateUpdate"
      />
    </div>
    <div class="control">
      <BgColorSelector
        :bgColor1="bgColor1"
        :bgColor2="bgColor2"
        :gradient="gradient"
        @state-update="handleStateUpdate"
      />
    </div>
    <div class="control">
      <SaveConfig
        :id="id"
        :name="name"
        :configs="configs"
        @config-save="handleConfigSave"
      />
    </div>
  </div>
</template>

<script>
import BgColorSelector from '@/components/controls/BgColorSelector'
import FgColorSelector from '@/components/controls/FgColorSelector'
import SaveConfig from '@/components/controls/SaveConfig'

export default {
  name: 'Controls',

  components: {
    BgColorSelector,
    FgColorSelector,
    SaveConfig
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
    },

    showForeGround: {
      type: Boolean,
      default: false
    },

    fgColor: {
      type: String,
      default: '#ffffff'
    },

    id: {
      type: Number,
      default: null,
    },

    name: {
      type: String,
      default: ''
    },

    configs: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleStateUpdate (state) {
      this.$emit('state-update', state)
    },

    handleConfigSave (config) {
      this.$emit('config-save', config)
    }
  }
}
</script>

<style scoped>
  .controls-container {
    min-width: 97vw;
    max-width: 97vw;
    min-height: 16vh;
    margin: 0 auto;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    box-sizing: border-box;
  }

  .control {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  @media only screen and (max-width: 710px) {
    .controls-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }

    .control:nth-child(2) {
      order: 0;
    }

    .control:nth-child(1) {
      order: 1;
    }

    .control:nth-child(3) {
      order: 1;
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