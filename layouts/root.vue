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

	async mounted () {
		await this.$store.dispatch('ethereum/connect');
		this.$store.dispatch('ethereum/fetchCollectionData');
	}
};
</script>