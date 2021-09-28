<template>
  <div>
    <div
      v-for="(toastr, index) of toastrs"
      :key=index
      :id="`toastr-${toastr.id}`"
      class="glass-container-toastr main-container-toastr"
      :style="getActualPosition(index)"
      v-tilt
    >
      <div
        class="toastr-type-container"
        :class="toastr.type === 'success' ? 'toastr-type-container-success' : 'toastr-type-container-fail'"
      >
        <svg
          v-if="toastr.type === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="toastr-type-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <svg
          v-if="toastr.type === 'fail'"
          xmlns="http://www.w3.org/2000/svg"
          class="toastr-type-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div
        class="container-toastr-text"
        :class="toastr.type === 'success' ? 'container-toastr-text-success' : 'container-toastr-text-fail'"
      >
        <div class="container-header">
          <h3 class="toastr-title">{{ toastr.title }}</h3>
          <button
            class="close-button-container"
            @click="removeToastr(toastr.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="close-icon-button"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p class="toastr-body">{{ toastr.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/utils/EventBus'

export default {
  name: 'Toastr',

  data () {
    return {
      toastrs: []
    }
  },

  created () {
    EventBus.$on('display-toastr', this.addToastr)
  },

  methods: {
    addToastr (toastr) {
      const id = new Date().valueOf()
      toastr.id = id
      this.toastrs.push(toastr)
      setTimeout(() => {
        this.removeToastr(id)
      }, 5000)
    },

    removeToastr (id) {
      this.toastrs = this.toastrs.filter(toastr => toastr.id !== id)
    },

    getActualPosition (index) {
      const rem = 4 + (index * 5.5) + (0.5 * index)
      return `top: ${rem}rem`
    }
  }
}
</script>

<style scoped>
  .glass-container-toastr {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .main-container-toastr { 
    position: fixed;
    right: 2rem;
    min-height: 5.5rem;
    max-height: 5.5rem;
    min-width: 24rem;
    max-width: 24rem;
    overflow:hidden;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    z-index: 5;
    animation: showToastr 200ms ease 0ms;
    transition: all 100ms;
  }

  @keyframes showToastr {
    from {
      opacity: 0;
      right: 0;
    }
    to {
      opacity: 1rem;
      right: 2rem;
    }
  }

  .toastr-type-container {
    position: relative;
    height: 100%;
    min-height: 100%;
    width: 5.5rem;
    min-width: 5.5rem;
    margin-left: 0.75rem;
    opacity: 1;
    position: relative;
    overflow: hidden;
  }

  .toastr-type-container-success {
    background-color: #1e7a4a;
    color: #165836;
  }

  .toastr-type-container-fail {
    background-color: #bf0404;
    color: #730202;
  }

  .toastr-type-icon {
    position: relative;
    top: -10px;
    left: -10px;
    opacity: 0.4;
  }

  .container-toastr-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 0.25rem 0.5rem;
    color: #481848;
  }

  .container-toastr-text-success {
    background-color: #1e7a4a55;
  }

  .container-toastr-text-fail {
    background-color: #bf040444;
  }

  .container-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .toastr-title {
    flex: 1;
    font-size: 1rem;
    font-weight: 400;
  }

  .close-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    padding: 0.25rem;
    cursor: pointer;
    color: #481848;
    transition: all 300ms;
  }

  .close-button-container:hover {
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    color: #592858;
  }

  .close-button-container:active {
    background: linear-gradient(to right bottom, rgba(230, 230, 230, 0.3), rgba(230, 230, 230, 0.1));
    color: #291828;
    transform: scale(0.95);
  }

  .close-icon-button {
    width: 1rem;
    height: 1rem;
  }

  .toastr-body {
    font-size: 0.9rem;
    font-weight: 300;
  }

  @media only screen and (max-width: 600px) {
    .main-container-toastr {
      position: fixed;
      top: 1rem;
      left: 2.5vw;
      min-width: 95vw;
      width: 95vw;
    }
  }

</style>