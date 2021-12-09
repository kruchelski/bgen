<template>
  <div class="saved-main-container">
    <h2 class="saved-title">
      Saved configs
    </h2>
    <div
      v-if="configs[0]"
      class="saved-items-container"
    >
      <div
        v-for="(config, index) of configs"
        :key="index"
      >
        <SavedConfigItem
          :config="config"
          @config-select="handleConfigSelect"
          @config-delete="handleConfigDelete"
        />
      </div>
    </div>
    
    <GlassContainer v-if="!configs[0]">
      <div
        class="empty-saved-container"
      >
        <p class="empty-saved-text">
          No saved configs to show
        </p>
      </div>
    </GlassContainer>

  </div>
</template>

<script>
import GlassContainer from '@/components/common/GlassContainer'
import SavedConfigItem from '@/components/saved/SavedConfigItem'
export default {
  name: 'SavedConfigslist',

  components: {
    SavedConfigItem,
    GlassContainer
  },

  props: {
    configs: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleConfigSelect (config) {
      this.$emit('config-select', config)
    },

    handleConfigDelete (config) {
      this.$emit('config-delete', config)
    }
  }
}
</script>

<style>
  .saved-main-container {
    width: 97vw;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    color: #481848;
  }
  
  .saved-items-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 10px;
  }

  .saved-title {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 400;
  }

  .empty-saved-container {
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .empty-saved-text {
    font-size: 1rem;
    font-style: italic;
    color: #48184888;
  }

  @media only screen and (max-width: 600px) {
    .saved-items-container {
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      padding: 0 1rem;
    }
  }
</style>