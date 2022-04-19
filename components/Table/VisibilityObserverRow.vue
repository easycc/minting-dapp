<template>
	<tr>
		<td class="visibility-observer-cell">
			<VisibilityObserver :callback="callback" />
		</td>
	</tr>
</template>

<script>

import { VisibilityObserver } from '~/components/EventListener';

export default {
	components: {
		VisibilityObserver
	},

	props: {
		callback: {
			type: Function,
			default: () => {}
		}
	}
};
</script>

<style scoped>

.visibility-observer-cell {
	position: sticky;
	left: 50%;
	transform: translate(-50%, 0);
	padding: 0;
}
</style>