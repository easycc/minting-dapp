<template>
	<FormStatusObserver v-slot="{ pending }">
		<Button
			:kind="kind"
			type="submit"
			:class="['submit-button', { pending }]"
			:showSpinner="pending"
			v-bind="$attrs"
			v-on="$listeners"
		>
			<slot />
		</Button>
	</FormStatusObserver>
</template>

<script>
import { FormStatusObserver } from './FormContext';

import { Button } from '~/components/buttons';

export default {
	name: 'SubmitButton',
	inheritAttrs: false,
	components: {
		Button,
		FormStatusObserver
	},
	props: {
		kind: {
			type: String,
			default: 'complimentary'
		}
	}
};
</script>

<style scoped>
.submit-button {
	display: block;
	width: 100%;
}

.submit-button.pending {
  cursor: progress;
}
</style>