<template>
	<div class="progress-bar">
		<span
			class="progress-line"
			:style="`width: ${progressBarWidth}%;`
				+ `background:${progressBarColor};`"
		/>
	</div>
</template>

<script>
import percentage from '~/utils/percentage';

export default {
	props: {
		value: {
			type: Number,
			default: 0
		},

		length: {
			type: Number,
			default: 0
		}
	},

	computed: {
		progressBarColor () {
			let progressBarColor;
			const BAR_FULL_WIDTH = 100;

			if (this.progressBarWidth === null) {
				progressBarColor = 'var(--color-neutral)';
			}
			else if (this.progressBarWidth < BAR_FULL_WIDTH) {
				progressBarColor = '#d1f749';
			}
			else {
				progressBarColor = '#d1f749';
			}
			return progressBarColor;
		},

		progressBarWidth () {
			return percentage(this.value, this.length);
		}
	}
};
</script>

<style scoped>
.progress-bar {
  height: var(--progress-bar-height, 0.875em);
  background-color: var(--progress-bar-background-color, var(--color-background-secondary));
  width: 100%;
  /* border-radius: 1em; */
  position: relative;
  overflow: hidden;
	transition: width 3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
	/* box-shadow: var(--pixel-shadow); */
	border: 4px solid #111;
}

.progress-bar .progress-line {
  height: inherit;
  border-radius: inherit;
  display: block;
  transition-duration: 300ms;
}
</style>