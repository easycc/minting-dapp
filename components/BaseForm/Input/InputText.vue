<template>
	<WithNativeValidation
		v-bind="$attrs"
		:type="type"
		:maxLength="maxLength"
		v-on="$listeners"
	>
		<InputComponent><slot /></InputComponent>
	</WithNativeValidation>
</template>

<script>
import { WithNativeValidation } from '../FormContext';
import Input from './Input';

export default {
	name: 'InputText',
	inheritAttrs: false,
	components: {
		WithNativeValidation,
		InputComponent: Input
	},
	props: {
		maxLength: {
			type: [Number, String],
			default: 256
		},
		type: {
			type: String,
			default: 'text'
		}
	}
};
</script>