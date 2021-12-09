<template>
	<button
		class="btn-glass"
		@click.stop="buttonClick()"
	>
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'Button',

	methods: {
		buttonClick () {
			this.$emit('button-click');
		}
	}
}
</script>

<style scoped>
  .btn-glass {
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

  .btn-glass:hover {
    background-color: rgba(75, 29, 75, 0.5);
    box-shadow: 0 0 20px rgba(75, 29, 75, 0.1);
  }

  .btn-glass:active {
    background-color: rgba(10, 0, 10, 0.5);
    transform: translateY(1px);
    transform: scale(0.98);
  }

  .btn-glass span {
    margin-left: 0.25rem;
  }

  .btn-glass svg {
    width: 0.8rem;
  }
</style>