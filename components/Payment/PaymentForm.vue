<template>
	<DefaultCard class="payment-card">
		<FormSubmit successMessage="Congratulations! Visit OpenSea to sea your asset." class="payment-form">
			<BaseForm @submit="submitOrder">
				<div class="price">
					<h2 class="price-title">
						Buy now price
					</h2>

					<CryptoPrice
						:name="CONFIG.NETWORK.SYMBOL"
						:value="CONFIG.DISPLAY_COST"
						:amount="amount"
						class="price-amount"
					/>
				</div>

				<div class="actions">
					<Select
						v-model.number="amount"
						name="amount"
						labelText="Amount"
						class="amount-select"
					>
						<Option
							v-for="amountOption in collection.maxMintAmount + 1"
							:key="amountOption"
							:value="amountOption"
							:title="amountOption"
							:amount="amountOption"
						/>
					</Select>

					<SubmitButton
						v-if="account"
						class="submit-button"
						kind="primary"
						title="Buy with ETH"
					/>
					<ConnectWalletButton v-else class="submit-button" />
				</div>
			</BaseForm>
		</FormSubmit>
	</DefaultCard>
</template>

<script>
import ConnectWalletButton from './ConnectWalletButton';

import {
	SubmitButton,
	BaseForm,
	FormSubmit,
	Select,
	Option
} from '~/components/BaseForm';
import CONFIG from '~/contracts/config.json';
import { CryptoPrice } from '~/components/Currency';
import { DefaultCard } from '~/components/cards';

export default {
	components: {
		ConnectWalletButton,
		CryptoPrice,
		DefaultCard,
		Select,
		Option,
		FormSubmit,
		BaseForm,
		SubmitButton
	},

	data () {
		return {
			CONFIG,
			amount: 1
		};
	},

	computed: {
		account () {
			return this.$store.getters['ethereum/account'];
		},
		collection () {
			return this.$store.getters['ethereum/collection'];
		}
	},

	methods: {
		async submitOrder () {
			await this.$store.dispatch('ethereum/claimNft', this.amount);
		}
	}
};
</script>

<style scoped>
.payment-card {
	margin: 0 auto;
	display: block;
	padding: 1.5em 1.5em 2em;
}

.payment-form {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.price {
	display: inline-block;
	vertical-align: top;
}

.price-title {
	font-size: 1em;
	color: var(--color-text-default);
	font-weight: 500;
	margin-bottom: 0.333em;
}

.price-amount {
	font-size: 1.25em;
	font-weight: 600;
}

.amount-select {
	margin-right: 0.5em;
	margin-bottom: 0;
	width: 6em;
	display: inline-block;
	vertical-align: bottom;
}

.submit-button {
	width: auto;
	display: inline-block;
	vertical-align: bottom;
}

@media screen and (max-width: 576px) {
	.payment-form {
		display: block;
	}

	.price {
		display: block;
		margin-bottom: 2em;
	}

	.amount-select {
		margin-bottom: 1em;
	}

	.amount-select, .submit-button {
		display: block;
		width: 100%;
	}
}
</style>