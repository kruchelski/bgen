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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque id ea maiores libero. Dolore, minus perspiciatis. Commodi, sunt exercitationem, dolorum iure ad ab repellat corporis ea voluptatibus fugiat voluptas adipisci.
      </p>
    </div>
    <div class="text-content">
      <h2>Lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque id ea maiores libero. Dolore, minus perspiciatis. Commodi, sunt exercitationem, dolorum iure ad ab repellat corporis ea voluptatibus fugiat voluptas adipisci.
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

<style>
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
    padding: 0 2rem;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
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

</style>