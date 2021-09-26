<template>
  <div
    class="text-container"
    :style="fgStyle"
  >
    <div class="text-content">
      <h2>Lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque id ea maiores libero. Dolore, minus perspiciatis. Commodi, sunt exercitationem, dolorum iure ad ab repellat corporis ea voluptatibus fugiat voluptas adipisci.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque id ea maiores libero. Dolore, minus perspiciatis. Commodi, sunt exercitationem, dolorum iure ad ab repellat corporis ea voluptatibus fugiat voluptas adipisci.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque id ea maiores libero. Dolore, minus perspiciatis.
      </p>
    </div>
    <div class="text-content">
      <h2>Lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>
      <div
        class="card"
        :style="borderStyle"
      >
        <div class="card-header">
          <h3>
            Lorem ipsum
          </h3>
        </div>
        <div class="card-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque id ea maiores libero. Dolore, minus perspiciatis. Commodi, sunt exercitationem, dolorum iure ad ab
          </p>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque id ea maiores libero
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaceholderContent',

  props: {
    fgColor: {
      type: String,
      default: '#FFFFFF'
    }
  },

  computed: {
    fgStyle () {
      return `color: ${this.fgColor}`
    },
    borderStyle () {
      return `border: 1px solid ${this.fgColor}`
    }
  }
}
</script>

<style scoped>
  .text-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 1rem;
    flex: 1;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 300;
  }

  .card {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: 16rem;
    min-height: 12rem;
    height: auto;
    border-radius: 1rem;
    margin: 1rem 0;
  }

  .card-header {
    align-self: center;
    text-align: center;
    padding: 0.5rem;
  }

  .card-content {
    padding: 0.5rem 0.8rem;
    text-align: center;
  }

  .card-content p {
    font-size: 0.85rem;
    font-weight: 300;
  }

  @media only screen and (max-width: 710px) {
    .text-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }

    .text-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      flex: 1;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.8rem
    }

    .card {
      width: 100%;
       min-height: 8rem;
    }
  }

</style>