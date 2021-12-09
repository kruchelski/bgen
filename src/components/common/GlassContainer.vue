<template>
	<div class="glass-container">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'GlassContainer'
}
</script>

<style scoped>
	.glass-container {
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
	}
</style>