<template>
	<div class="progress-circle-with-steps">
		<ProgressCircle
			:duration="duration"
			class="progress-circle"
			:run="run"
			:value="value"
			@change="setCurrentPercentage"
			@done="handleDone"
		/>
		<slot />
		<div class="steps-list">
			<Fade group>
				<h2
					v-for="step in steps"
					:key="step"
					class="step"
					:class="{ 'passed': stepIsPassed(step), 'active': step === activeStep }"
				>
					<div class="step-icon-wrapper">
						<Fade group mode="out-in" class="icon-animation">
							<Spinner
								v-if="step === activeStep"
								key="spinner"
								class="step-icon spinner"
							/>
							<img
								v-if="stepIsPassed(step)"
								key="check-mark"
								src="./images/check-mark.svg"
								alt="Check mark"
								class="step-icon"
							/>
						</Fade>
					</div>

					<span class="step-title">{{ step }}</span>
				</h2>
			</Fade>
		</div>
	</div>
</template>

<script>
import ProgressCircle from '../ProgressCircle/ProgressCircle';

import { Fade } from '~/components/animation';
import { Spinner } from '~/components/Loading';

export default {
	components: {
		ProgressCircle,
		Fade,
		Spinner
	},

	props: {
		run: {
			type: Boolean,
			default: false
		},

		steps: {
			type: Object,
			required: true
		},

		value: {
			type: Number,
			default: 100
		},

		duration: {
			type: Number,
			default: 2500
		}
	},

	data () {
		return {
			currentPercentage: 0
		};
	},

	computed: {
		activeStep () {
			let stepsSortedByPercentage = Object.entries(this.steps).sort((left, right) => left[0] - right[0]);
			let currentStep = stepsSortedByPercentage
				.find(step => step[0] >= this.currentPercentage);

			return currentStep ? currentStep[1] : null;
		},

		passedSteps () {
			let stepsSortedByPercentage = Object.entries(this.steps).sort((left, right) => right[0] - left[0]);
			let passedSteps = stepsSortedByPercentage.filter(step => step[0] <= this.currentPercentage);

			return passedSteps;
		}
	},

	methods: {
		setCurrentPercentage (value) {
			this.currentPercentage = value;
		},

		handleDone () {
			this.$emit('done');
		},

		stepIsPassed (step) {
			return this.passedSteps.find(passedStep => passedStep[1] === step);
		}
	}
};
</script>

<style scoped>
.progress-circle-with-steps {
	font-size: 1em;
	display: inline-block;
	vertical-align: middle;
	max-width: 12em;
	width: 100%;
	text-align: center;
}

.progress-circle {
	margin-bottom: 1em;
}

.steps-list {
	padding: 1em 0 0.5em 1em;
	text-align: left;
	background-color: #292929;
	border-radius: 0.5em;
}

.step {
	display: block;
	font-size: 1.125rem;
	font-weight: 400;
	margin: 0 0 0.66em;
	opacity: 0.4;
	transition: opacity var(--smooth-animation);
}

.step.passed {
	opacity: 1;
}

.step.active {
	opacity: 1;
}

.step-icon-wrapper {
	font-size: 1em;
	width: 1em;
	height: 1em;
	display: inline-block;
	vertical-align: top;
	margin-right: 0.25em;
}

.step-icon {
	font-size: inherit;
	display: block;
}

.step-title {
	display: inline-block;
	vertical-align: top;
	max-width: calc(100% - 1.75em);
}

.step-icon.spinner ~ .step-icon {
	display: none;
}

.icon-animation {
	transition: opacity 0.1s ease-out;
}
</style>