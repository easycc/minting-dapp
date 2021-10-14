import { ProgressCircleWithSteps as Component } from '~/components/progress';

export default {
	title: 'Bars',
	component: Component,
	argTypes: {
		run: {
			control: 'boolean',
			defaultValue: true
		},
		steps: {
			control: 'object',
			defaultValue: {
				0: 'Analizing your goals',
				30: 'Selecting actionable advice',
				60: 'Picking the best insights',
				100: 'Done!'
			}
		},
		value: {
			control: 'number',
			defaultValue: 100
		},
		duration: {
			type: 'number',
			defaultValue: 5000
		}
	}
};

export const ProgressCircleWithSteps = (arg, { argTypes }) => ({
	components: { Component },
	props: Object.keys(argTypes),
	template: '<Component v-bind="$props" />'
});