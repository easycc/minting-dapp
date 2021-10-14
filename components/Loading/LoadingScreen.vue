<template>
	<Centered class="loading-screen">
		<Spinner v-bind="$attrs" class="spinner" />
	</Centered>
</template>

<script>
import Spinner from './Spinner';

import { Centered } from '~/components/Layout';

export default {
	inheritAttrs: false,
	components: {
		Spinner,
		Centered
	}
};
</script>


<style scoped>
.loading-screen {
	position: fixed;
	z-index: 2000;
	height: 100%;
	left: 0;
	top: 0;
	font-size: 1.75em;
	border-radius: 0;
	background-color: rgba(0, 0, 0, 0.3);
}

.spinner {
	font-size: 1.25em;
}
</style>