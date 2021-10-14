<template>
	<FormValidation :validation="validation" @change="onChange">
		<slot />
	</FormValidation>
</template>

<script>
import { extend } from 'vee-validate';

import { FormValidation } from '../FormContext';

extend('equal', {
	validate (value, { target }) {
		return value === target;
	},
	params: ['target', 'message'],
	message (field, values) {
		let { message } = values;

		if (message) {
			return message;
		}
		return 'Validation_Equal_Invalid', values;
	}
});

export default {
	name: 'EqualityValidation',
	components: { FormValidation },
	props: {
		name: String,
		message: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			validation: {},
			rule: 'equal'
		};
	},
	methods: {
		onChange (changes) {
			let { rule, name, message } = this;

			this.validation = Object.keys(changes)
				.filter(validationNname => validationNname !== name)
				.map(function (validationNname) {
					return { [validationNname]: `${rule}:@${name},${message}` };
				})
				.reduce(function (state, validation) {
					return Object.assign(state, validation);
				}, {});
		}
	}
};
</script>