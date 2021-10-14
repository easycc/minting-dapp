<template>
	<tr v-if="state" class="laoding-row">
		<td class="loading-cell">
			<Skeleton class="skeleton" showSpinner />
		</td>
	</tr>
</template>

<script>

import { Skeleton } from '~/components/Loading';

export default {
	components: {
		Skeleton
	},

	props: {
		state: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped>
.loading-cell {
	position: sticky;
	left: 50%;
	transform: translate(-50%, 0);
	bottom: 0;
	padding: 0;
	padding-top: 0.5em;
}

.skeleton {
	width: 12em;
	max-width: 100%;
}
</style>