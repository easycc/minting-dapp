<template>
	<Button
		class="connect-wallet-button"
		title="Connect wallet"
		kind="primary"
		@click="connectWallet"
	/>
</template>

<script>
import { Button } from '~/components/buttons';

export default {

	components: {
		Button
	},

	methods: {
		connectWallet () {
			return this.$store.dispatch('ethereum/connect');
		}
	}
};
</script>

<style scoped>
.connect-wallet-button {
	display: block;
	color: inherit;
	background-color: inherit;
}
</style>