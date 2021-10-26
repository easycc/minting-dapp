<template>
	<div>
		<Notifications />
		<Maintenance>
			<nuxt />
		</Maintenance>
	</div>
</template>

<script>
import { Maintenance } from '~/components/router';
import { Notifications } from '~/components/PageLayout';

export default {
	components: {
		Maintenance,
		Notifications
	},

	created () {
		this.$fireAuthStore.subscribe();
	}
};
</script>