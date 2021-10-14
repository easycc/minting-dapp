<template>
	<div class="progress-steps">
		<ul
			class="step-list"
			:class="{ 'finish-devider': showFinishDivider }"
		>
			<li
				v-for="(stepLength, stepPosition) in steps"
				:key="stepPosition"
				class="step-item"
				:style="{ width: `${stepWidth(stepLength)}%` }"
			>
				<span class="visually-hidden">Step: {{ stepPosition + 1 }}</span>

				<span
					v-if="bulletNotLast(stepPosition)"
					class="step-bullet"
					:class="{ 'active': stepPassed(stepLength, stepPosition) }"
				/>
			</li>
		</ul>

		<ProgressBar
			:length="substepsLength"
			:value="substepGlobalIndex"
			class="progress-bar"
		/>
	</div>
</template>

<script>
import ProgressBar from '../ProgressBar/ProgressBar';

import percentage from '~/utils/percentage';

export default {
	components: {
		ProgressBar
	},

	props: {
		steps: {
			type: Array,
			default: () => []
		},

		stepIndex: {
			type: Number,
			default: 0
		},

		substepIndex: {
			type: Number,
			default: 0
		}
	},

	computed: {
		substepsLength () {
			return this.steps.reduce((left, right) => left + right, 0);
		},

		substepGlobalIndex () {
			let { stepIndex } = this;

			let previousQuestionsLength = this.steps.slice(0, stepIndex)
				.reduce((left, right) => left + right, 0);

			return previousQuestionsLength + this.substepIndex;
		},

		showFinishDivider () {
			return this.substepGlobalIndex === this.substepsLength;
		}
	},

	methods: {
		stepWidth (stepLength) {
			return percentage(stepLength, this.substepsLength);
		},

		stepPassed (stepLength, stepIndex) {
			let previousStepsLength = this.steps.slice(0, stepIndex)
				.reduce((left, right) => left + right, 0);

			let stepGlobalLength = previousStepsLength + stepLength;

			return this.substepGlobalIndex >= stepGlobalLength;
		},

		bulletNotLast (stepIndex) {
			return stepIndex !== this.steps.length - 1;
		}
	}
};
</script>

<style scoped>
.progress-steps {
	display: block;
	width: 100%;
	position: relative;

	--progress-bar-height: 0.375em;
	--devider-width: 1em;
	--bullet-color: #404040;
	--bullet-active-color: #d1f749;
	--progress-bar-background-color: var(--bullet-color);
}

.step-list {
	list-style: none;
	position: relative;
	padding: 0;
	margin: 0;
	width: 100%;
	display: block;
	white-space: nowrap;
	position: relative;
	z-index: 1;
}

.step-item {
	display: inline-block;
	vertical-align: middle;
	margin: 0;
	font-size: calc(var(--progress-bar-height) * 3);
}

.step-bullet {
  background: var(--bullet-color);
	border-radius: 50%;
	height: 1em;
	width: 1em;
	float: right;
	transform: translate(50%, 0);
}

.step-bullet.active {
	background-color: var(--bullet-active-color);
}

.progress-bar {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translate(0, -50%);
}

.step-list:before,
.step-list:after {
	font-size: var(--progress-bar-height);
	width: var(--devider-width);
	height: 4em;
	border-radius: 1em;
	display: inline-block;
	vertical-align: middle;
	content: '';
  background: var(--bullet-color);
}

.step-list.finish-devider:after {
	background-color: var(--bullet-active-color);
}

.step-list:before {
	background-color: var(--bullet-active-color);
}

.step-list:before {
	margin-right: calc(var(--devider-width) * -1);
}

.step-list:after {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translate(0, -50%);
}
</style>