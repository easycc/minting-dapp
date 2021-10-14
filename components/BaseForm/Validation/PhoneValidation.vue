<template>
	<FormValidation :validation="validation" @change="onChange">
		<slot />
	</FormValidation>
</template>

<script>
import { extend } from 'vee-validate';
import { digits } from 'vee-validate/dist/rules';

import { FormValidation } from '../FormContext';

extend('phone', {
	...digits,
	params: [{ name: 'length', default: 9 }],
	message: 'Validation_Phone_Invalid'
});

export default {
	name: 'PhoneValidation',
	components: { FormValidation },
	data () {
		return {
			validation: {},
			rule: 'phone'
		};
	},
	methods: {
		onChange (changes) {
			let { rule } = this;

			this.validation = Object.keys(changes)
				.map(function (name) {
					return { [name]: rule };
				})
				.reduce(function (state, validation) {
					return Object.assign(state, validation);
				}, {});
		}
	}
};
</script>