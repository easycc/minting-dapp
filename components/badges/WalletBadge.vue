<template>
	<DefaultBadge
		class="wallet-badge"
	>
		{{ walletShorted }}
	</DefaultBadge>
</template>

<script>
import DefaultBadge from './DefaultBadge';

export default {
	components: {
		DefaultBadge
	},

	computed: {
		account () {
			return this.$store.getters['ethereum/account'];
		},

		walletShorted () {
			const LEFT_PART_LENGTH = 6;
			const RIGHT_PART_LENGTH = 4;
			const left = this.account.slice(0, LEFT_PART_LENGTH);
			const middle = '…';
			const right = this.account.slice(this.account.length - RIGHT_PART_LENGTH, this.account.length);

			return `${left}${middle}${right}`;
		}
	}
};
</script>

<style scoped>
.wallet-badge {
	padding: 0.5em;
	border-radius: 0.5em;
	font-weight: 500;
	background-color: transparent;
	background-color: var(--color-background-primary);
}
</style>