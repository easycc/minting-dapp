<template>
	<div>
		<Notifications />
		<Maintenance>
			<nuxt />
		</Maintenance>
	</div>
</template>

<script>
import { Fragment } from '~/components/ControlFlow';
import { Maintenance } from '~/components/router';
import { Notifications } from '~/components/PageLayout';

export default {
	components: {
		Maintenance,
		Notifications,
		Fragment
	},

	created () {
		this.$fireAuthStore.subscribe();
	}
};
</script>