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
import LocaleStorage from '~/services/locale-storage';

export default {
	components: {
		Maintenance,
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