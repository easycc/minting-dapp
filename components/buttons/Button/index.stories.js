import { action } from '@storybook/addon-actions';

import { Button as Component } from '~/components/buttons';

export default {
	title: 'Buttons',
	component: Component,
	argTypes: {
		title: {
			control: 'text',
			defaultValue: 'Button title'
		},
		className: {
			control: 'text'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false
		},
		showSpinner: {
			control: 'boolean',
			defaultValue: false
		},
		iconName: {
			control: {
				type: 'select',
				options: ['chevron-left', 'arrow-bottom']
			}
		},
		emojiIconName: {
			control: {
				type: 'select',
				options: [':gear:', ':bulb:']
			}
		},
		type: {
			control: {
				type: 'select',
				options: ['button', 'submit']
			},
			defaultValue: 'button'
		}
	}
};

export const Button = (arg, { argTypes }) => ({
	components: { Component },
	methods: {
		click: action('click')
	},
	props: Object.keys(argTypes),
	template: '<Component v-bind="$props" @click="click" />'
});