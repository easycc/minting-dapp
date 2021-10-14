<template>
	<Maintenance>
		<nuxt />
	</Maintenance>
</template>

<script>
import { Maintenance } from '~/components/router';
import LocaleStorage from '~/services/locale-storage';

export default {
	components: {
		Maintenance
	},

	created () {
		this.$fireAuthStore.subscribe();
	},

	async mounted () {
		const storedAccount = LocaleStorage.getItem('account');

		if (storedAccount) {
			await this.$store.dispatch('ethereum/connect');
		}

		this.$store.dispatch('ethereum/fetchCollectionData');
	}
};
</script>