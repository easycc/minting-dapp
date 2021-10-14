<template>
	<Centered class="skeleton-block">
		<Spinner v-if="showSpinner" class="spinner" />
		<slot />
	</Centered>
</template>

<script>
import Spinner from './Spinner';

import { Centered } from '~/components/Layout';

export default {
	components: {
		Spinner,
		Centered
	},

	props: {
		showSpinner: {
			type: Boolean,
			default: false
		}
	}
};
</script>


<style scoped>
.skeleton-block {
	width: 100%;
	height: 3em;
	border-radius: 1em;
	margin-bottom: 0.33em;
	background-color: var(--color-background-secondary);
}

.spinner {
	font-size: 1.500em;
}
</style>