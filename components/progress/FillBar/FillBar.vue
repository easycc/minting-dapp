<template>
	<div class="fill-bar" :style="{ background: barBackground }">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		width: {
			type: Number,
			default: 0
		},

		secondaryColor: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		barColor () {
			let color = null;

			if (this.secondaryColor) {
				color = 'var(--color-positive)';
			}
			else {
				color = '#3880D1';
			}
			return color;
		},

		barBackground () {
			const { barColor, width } = this;

			return `linear-gradient(90deg, ${barColor} ${width}%, ${barColor} ${width}%, var(--color-background-secondary) calc(${width}% - 1px), var(--color-background-secondary) 100%)`;
		}
	}
};
</script>

<style scoped>
.fill-bar {
	display: block;
	width: 100%;
	border-radius: 0.33em;
}
</style>