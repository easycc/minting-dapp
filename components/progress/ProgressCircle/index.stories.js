import { ProgressCircle as Component } from '~/components/progress';

export default {
	title: 'Bars',
	component: Component,
	argTypes: {
		run: {
			control: 'boolean',
			defaultValue: true
		},
		value: {
			control: 'number',
			defaultValue: 50
		},
		duration: {
			type: 'number',
			defaultValue: 2000
		}
	}
};

export const ProgressCircle = (arg, { argTypes }) => ({
	components: { Component },
	props: Object.keys(argTypes),
	template: '<Component v-bind="$props" />'
});