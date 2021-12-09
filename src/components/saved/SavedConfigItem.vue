<template>
  <GlassContainer v-tilt>
    <div
      class="saved-item-main-container"
      @mouseenter="showDeleteButton = true"
      @mouseleave="showDeleteButton = false"
      @click="selectConfig(config)"
    >
      <button
        v-if="showDeleteButton || isWindowSmall"
        class="delete-config-button"
        @click.stop="deleteConfig(config.id, config.name)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="delete-config-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      <div
        class="saved-config"
        :style="bgStyle"
      >
        <div
          v-if="config.showForeGround" 
          class="saved-config-foreground"
          :style="fgStyle"
        >
          <p class="saved-config-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio sapiente nostrum vitae atque vero optio, eligendi nisi, tenetur amet accusamus, expedita est nihil ipsa error excepturi aspernatur delectus praesentium veritatis.
          </p>
          <p class="saved-config-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio sapiente nostrum vitae atque vero optio, eligendi nisi, tenetur amet accusamus, expedita est nihil ipsa error excepturi aspernatur delectus praesentium veritatis.
          </p>
        </div>
      </div>
      <p class="saved-config-title">
        {{ config.name }}
      </p>
    </div>
  </GlassContainer>

</template>

<script>
import GlassContainer from '@/components/common/GlassContainer'

export default {
  name: 'SavedConfigItem',

  components: {
    GlassContainer
  },

  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      showDeleteButton: false,
      windowSize: window.innerWidth,
      isWindowSmall: window.innerWidth <= 600
    }
  },

  mounted () {
    window.addEventListener('resize', this.handleWindowResize)
  },

  beforeDestroy() { 
    window.removeEventListener('resize', this.handleWindowResize) 
  },

  computed: {
    bgStyle () {
      if (this.config.gradient) {
        return `background: linear-gradient(to right, ${this.config.bgColor1}, ${this.config.bgColor2})`
      } else {
        return `background-color: ${this.config.bgColor1}`
      }

    },

    fgStyle () {
      return `color: ${this.config.fgColor}`
    }
  },

  watch: {
    windowSize () {
      this.isWindowSmall = window.innerWidth <= 600
    }
  },

  methods: {
    selectConfig (config) {
      this.$emit('config-select', config)
    },

    deleteConfig (id, name) {
      const config = {
        id,
        name
      }
      this.$emit('config-delete', config)
    },

    handleWindowResize () {
      this.windowSize = window.innerWidth
    }
  }
}
</script>

<style>
  .saved-item-main-container {
    position: relative;
    box-sizing: border-box;
    width: 14rem;
    height: auto;
    min-height: 9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 1rem 0;
    cursor: pointer;
    margin: 0.5rem 0;
  }

  .saved-config {
    box-sizing: border-box;
    width: 12rem;
    height: 7rem;
    min-height: 7rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 10px #33333388;
    overflow: hidden;
  }

  .saved-config-foreground {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }

  .saved-config-text {
    font-size: 0.3rem;
    width: 100%;
  }

  .saved-config-title {
    font-size: 0.9rem;
    font-weight: 300;
    width: 100%;
    text-align: center;
  }

  .delete-config-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    padding: 0.25rem;
    backdrop-filter: blur(5px);
    border-radius: 50%;
    cursor: pointer;
    transition: all 100ms;
    z-index: 5;
  }

  .delete-config-button:hover {
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2));
    transform: scale(1.3);
    box-shadow: 0px 0px 10px #730202;
  }

  .delete-config-button:active {
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(0,0,0, 0.2));
    transform: scale(1.1);

  }

  .delete-config-icon {
    width: 1rem;
    color: #730202;
  }

  @media only screen and (max-width: 600px) {
    .saved-item-main-container {
      width: 100%;
    }

    .saved-config {
      width: 95%;
    }
  }
</style>