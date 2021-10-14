<template>
	<PasswordValidation>
		<InputPassword
			v-bind="$attrs"
			:minLength="minLength"
			:maxLength="maxLength"
			v-on="$listeners"
		>
			<slot />
		</InputPassword>
	</PasswordValidation>
</template>

<script>
import { PasswordValidation } from '../Validation';
import InputPassword from './InputPassword';

export default {
	name: 'CreatePassword',
	inheritAttrs: false,

	components: {
		PasswordValidation,
		InputPassword
	},

	props: {
		minLength: {
			type: [Number, String],
			default: 8
		},
		maxLength: {
			type: [Number, String],
			default: 25
		}
	}
};
</script>