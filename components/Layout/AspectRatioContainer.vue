<template>
	<div class="aspect-ratio-wrapper" :style="{ paddingBottom: aspectRatio }">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		width: {
			type: Number,
			default: 1920
		},
		height: {
			type: Number,
			default: 1080
		}
	},
	computed: {
		aspectRatio () {
			const { width, height } = this;
			const TOTAL_PERCENTAGE = 100;

			return `${height / width * TOTAL_PERCENTAGE}%`;
		}
	}
};
</script>


<style scoped>
.aspect-ratio-wrapper {
	position: relative;
	padding-bottom: 60%;
	height: 0 !important;
}

.aspect-ratio-wrapper > * {
	position: absolute;
	display: block;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
}
</style>