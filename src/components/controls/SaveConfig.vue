<template>
  <div class="glass-container-controls main-input-container">
    <span class="save-config-title">Save config</span>
    <div class="input-container">
      <div
        class="input-box"
      >        
        <svg v-if="errorState" class="icon-error" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <input
          id="configName"
          type="text"
          class="input-text"
          :class="errorState ? 'input-text-error' : ''"
          name="configName"
          placeholder="Config name"
          v-model="configName"
          @keyup.enter="saveConfig(configName, configId)"
        />
      </div>
    </div>
      <button
        class="save-button"
        @click="saveConfig(configName, configId)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        <span>{{ configExists ? 'Update config' : 'Save config' }}</span>
      </button>
  </div>
</template>

<script>
import * as ToastrService from '@/services/ToastrService'

export default {
  name: 'SaveConfig',

  props: {
    id: {
      type: Number,
      default: null
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

  data () {
    return {
      configId: this.id,
      configName: this.name,
      hasError: false
    }
  },

  computed: {
    errorState () {
      if (this.hasError && !this.configName) {
        return true
      }
      return false
    },
  
    configExists () {
      if (this.configId) return true
      return false
    }
  },

  watch: {
    configName () {
      const config = this.configs.find(config => this.configName === config.name)
      if (config) {
        this.configId = config.id
      } else {
        this.configId = null
      }
    }
  },

  methods: {
    saveConfig (name, id) {
      if (this.configNameHasError(name)) {
        this.hasError = true
        ToastrService.displayToastr('Error saving: Config name cannot be empty', 'Error saving', 'fail')
        return
      }
      this.hasError = false
      const saveEvent = {
        name,
        id
      }
      this.$emit('config-save', saveEvent)
      this.configId = null
      this.configName = ''
      this.hasError = false
    },

    configNameHasError (name) {
      if (!name) return true
      return false
    }
  }
}
</script>

<style scoped>
  .main-input-container {
    min-width: 13rem;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 0.5rem 0.5rem;
    font-size: 0.8rem;
    color: #381838
  }

  .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
    margin-bottom: 0;
  }

  .input-box {
    display: flex;
    /* flex-direction: column; */
    justify-content: flex-start;
    align-items: center;
    margin: 0 0.5rem;
    width: 10.5rem;
    box-sizing: border-box;
  }

  .glass-container-controls {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .input-text {
    border: 1px solid rgba(25, 19, 23, 0.5);
    height: 1.5rem;
    width: 100%;

    border-radius: 0.25rem;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    color: #381838;
    font-size: 0.8rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
  }

  .input-text:focus {
    outline: 2px solid #783878;
  }

  .input-text-error {
    border: 1px solid #8b0000;
  }

  .input-text.input-text-error:focus {
    outline: 2px solid #8b0000;
  }

  .save-config-title {
    align-self: center;
  }

  .icon-error {
    width: 1.3rem;
    color: #8b0000;
    margin-right: 0.25rem;
  }
  
  .save-button {
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

  .save-button:hover {
    background-color: rgba(75, 29, 75, 0.5);
    box-shadow: 0 0 20px rgba(75, 29, 75, 0.1);
  }

  .save-button:active {
    background-color: rgba(10, 0, 10, 0.5);
    transform: translateY(1px);
    transform: scale(0.98);
  }

  .save-button span {
    margin-left: 0.25rem;
  }

  .save-button svg {
    width: 0.8rem;
  }

  @media only screen and (max-width: 710px) {
    .main-input-container {
      min-width: 100%;
    }

    .input-container {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

</style>