<template>
	<Button
		showSpinner
		title="Load more"
		class="visibility-observer"
		:class="{ 'visually-hidden': hidden }"
		v-observe-visibility="{
			callback,
			once
		}"
		@click="callback"
	/>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility';

import { Button } from '~/components/buttons';

export default {
	components: {
		Button
	},

	directives: {
		'observe-visibility': ObserveVisibility
	},

	props: {
		hidden: {
			type: Boolean,
			default: true
		},

		callback: {
			type: Function,
			default: () => {}
		},

		once: {
			type: Boolean,
			defualt: false
		}
	}
};
</script>

<style scoped>
.visibility-observer {
	display: none;
	margin-bottom: 0;
}
</style>