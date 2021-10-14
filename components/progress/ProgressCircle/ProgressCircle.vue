<template>
	<div class="progress-circle" :style="{ transition }">
		<Centered class="inner-content">
			<slot>
				<span class="current-value">{{ currentValue }}%</span>
			</slot>
		</Centered>

		<svg
			width="38"
			height="38"
			viewBox="0 0 38 38"
			style="transform: rotate(-90deg);"
			class="circle"
		>
			<circle
				stroke="var(--blank-color)"
				fill="transparent"
				stroke-width="3"
				r="17.5"
				cx="19"
				cy="19"
				:style="{ strokeDashoffset: STROKE_DASHARRAY - strokeDashoffset }"
				class="blank-circle"
			/>
			<circle
				stroke="var(--fill-color)"
				fill="transparent"
				stroke-linecap="round"
				stroke-width="3"
				:stroke-dasharray="`${STROKE_DASHARRAY} ${STROKE_DASHARRAY}`"
				r="17.5"
				cx="19"
				cy="19"
				:style="{ strokeDashoffset }"
				class="fill-circle"
			/>
		</svg>
	</div>
</template>

<script>
import { Centered } from '~/components/Layout';

export default {
	components: {
		Centered
	},

	props: {
		run: {
			type: Boolean,
			default: false
		},

		value: {
			type: Number,
			default: 100
		},

		duration: {
			type: Number,
			default: 0,
			required: false
		}
	},

	data () {
		const STROKE_DASHARRAY = 109.95574287564276;

		return {
			currentValue: 0,
			STROKE_DASHARRAY
		};
	},

	computed: {
		stepInMilliseconds () {
			return this.duration / this.value;
		},

		strokeDashoffset () {
			const { currentValue } = this;

			return this.STROKE_DASHARRAY * (1 - (currentValue * 0.01));
		},

		transition () {
			return `stroke-dashoffset ${this.stepInMilliseconds}ms linear`;
		}
	},

	watch: {
		run () {
			if (this.run) {
				this.runAnimation();
			}
		}
	},

	mounted () {
		if (this.run) {
			this.runAnimation();
		}
	},

	methods: {
		runAnimation () {
			if (this.duration) {
				setTimeout(() => {
					this.currentValue++;
					this.$emit('change', this.currentValue);
					if (this.currentValue < this.value) {
						this.runAnimation();
					}
					else {
						this.handleDone();
					}
				}, this.stepInMilliseconds);
			}
			else {
				this.currentValue = this.value;
				this.$emit('change', this.currentValue);
			}
		},

		handleDone () {
			this.$emit('done');
		}
	}
};
</script>

<style scoped>
.progress-circle {
	font-size: 1em;
	width: 6em;
	height: 6em;
	display: inline-block;
	vertical-align: middle;
	position: relative;
	z-index: 1;
	user-select: none;
	box-sizing: border-box;

	--fill-color: #3B99FC;
	--blank-color: rgba(255, 255, 255, 0.12);
	--border-width: 0.5em;
}

.circle {
	position: absolute;
	left: 0;
	top: 0;
	width: inherit;
	height: inherit;
	z-index: 1;
	transition: inherit;
}

.inner-content {
	position: absolute;
	z-index: 2;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}

.blank-circle, .fill-circle {
	transition: inherit;
}

.current-value {
	font-size: 1.66em;
	font-weight: 400;
	color: var(--text-color);
}
</style>