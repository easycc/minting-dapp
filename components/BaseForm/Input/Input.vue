<template>
	<WithNativeValidation
		v-bind="$attrs"
		:type="type"
		v-on="$listeners"
	>
		<InputComponent>
			<slot />

			<template v-slot:beforeInput>
				<slot name="beforeInput" />
			</template>

			<template v-slot:afterInput>
				<slot name="afterInput" />
			</template>
		</InputComponent>
	</WithNativeValidation>
</template>

<script>
import { WithNativeValidation } from '../FormContext';
import BaseInput from './BaseInput';

export default {
	inheritAttrs: false,
	components: {
		WithNativeValidation,
		InputComponent: BaseInput
	},
	props: {
		type: {
			type: String,
			default: 'text'
		}
	}
};
</script>