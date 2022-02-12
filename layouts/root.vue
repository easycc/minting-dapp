<template>
	<div>
		<Notifications />
		<Maintenance>
			<nuxt />
		</Maintenance>

		<ClientOnly>
			<PortalTarget multiple name="flyout" />
		</ClientOnly>
	</div>
</template>

<script>
import { PortalTarget } from 'portal-vue';

import { Maintenance } from '~/components/router';
import { Notifications } from '~/components/PageLayout';
import LocaleStorage from '~/services/locale-storage';

export default {
	components: {
		Maintenance,
		PortalTarget,
		Notifications
	},

	async mounted () {
		await this.connectWallet();
	},

	methods: {


		async connectWallet () {
			const storedAccount = LocaleStorage.getItem('account');

			if (storedAccount) {
				await this.$store.dispatch('ethereum/connect');
			}
		}
	}
};
</script>