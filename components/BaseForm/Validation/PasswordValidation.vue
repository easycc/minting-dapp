<template>
	<FormValidation :validation="validation" @change="onChange">
		<slot />
	</FormValidation>
</template>

<script>
import { extend } from 'vee-validate';

import { FormValidation } from '../FormContext';

extend('password', {
	validate: value => {
		let strongRegex = new RegExp(
			'(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}'
		);

		return strongRegex.test(value);
	},
	message: 'Validation_Password_Invalid'
});

export default {
	name: 'PasswordValidation',
	components: { FormValidation },
	data () {
		return {
			validation: {},
			rule: 'password'
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