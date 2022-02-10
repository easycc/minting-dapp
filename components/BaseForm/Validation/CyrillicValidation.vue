<template>
	<FormValidation :validation="validation" @change="onChange">
		<slot />
	</FormValidation>
</template>

<script>
import { extend } from 'vee-validate';

import { FormValidation } from '../FormContext';

extend('cyrillic', {
	validate: value => {
		let regex = /^['_А-Щьюяёєіїґ‘-\s’]*$/i;

		return regex.test(value);
	},
	message: 'Введіть значення на українській чи російській мові'
});

export default {
	components: { FormValidation },
	data () {
		return {
			validation: {},
			rule: 'cyrillic'
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