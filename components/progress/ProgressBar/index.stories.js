import { ProgressBar as Component } from '~/components/progress';

export default {
	title: 'Bars',
	component: Component,
	argTypes: {
		length: {
			control: 'number',
			defaultValue: 3
		},
		value: {
			control: 'number',
			defaultValue: 1
		}
	}
};

export const ProgressBar = (arg, { argTypes }) => ({
	components: { Component },
	props: Object.keys(argTypes),
	template: '<Component v-bind="$props" />'
});


export const ProgressBarDisabled = (arg, { argTypes }) => ({
	components: { Component },
	props: Object.keys(argTypes),
	template: '<Component v-bind="$props" />'
});

ProgressBarDisabled.args = {
	disabled: true
}