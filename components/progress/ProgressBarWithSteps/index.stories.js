import { ProgressBarWithSteps as Component } from '~/components/progress';

export default {
	title: 'Bars',
	component: Component,
	argTypes: {
		steps: {
			control: 'array',
			defaultValue: [2, 2, 2]
		},
		stepIndex: {
			control: {
				type: 'select',
				options: [0, 1, 2]
			},
			defaultValue: 1
		},
		substepIndex: {
			control: {
				type: 'select',
				options: [0, 1, 2]
			},
			defaultValue: 1
		}
	}
};

export const ProgressBarWithSteps = (arg, { argTypes }) => ({
	components: { Component },
	props: Object.keys(argTypes),
	template: '<Component v-bind="$props" />'
});