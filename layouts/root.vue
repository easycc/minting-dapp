<template>
	<Maintenance>
		<nuxt />
	</Maintenance>
</template>

<script>
import { Maintenance } from '~/components/router';

export default {
	components: {
		Maintenance
	},

	created () {
		this.$fireAuthStore.subscribe();
	},

	mounted () {
		this.$store.dispatch('getProducts');
		this.$store.dispatch('getConfig');
	}
};
</script>