<template>
	<WithNativeValidation
		v-bind="$attrs"
		type="password"
		required
		autocomplete="off"
		v-on="$listeners"
	>
		<InputComponent><slot /></InputComponent>
	</WithNativeValidation>
</template>

<script>
import { WithNativeValidation } from '../FormContext';
import Input from './Input';

export default {
	name: 'InputPassword',
	inheritAttrs: false,

	components: {
		WithNativeValidation,
		InputComponent: Input
	}
};
</script>