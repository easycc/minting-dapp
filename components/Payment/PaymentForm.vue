<template>
	<FormSubmit successMessage="Congratulations! Visit OpenSea to sea your asset." class="payment-form">
		<!-- <CollectionContextConsumer v-slot="{ mintAmount: 1 }"> -->
		<BaseForm @submit="mintNft(999)">
			<template v-if="account">
				<SubmitButton
					class="submit-button"
					kind="primary"
				>
					Mint my {{ 999 }} NFT -
					<span class="text-secondary">
						<CryptoPrice
							:name="network.currency.symbol"
							:network="network.name"
							:value="collection.cost"
							:amount="999"
						/>
						+ gas
					</span>
				</SubmitButton>
				<div>
					<AssetsLastBadge />
				</div>
			</template>

			<ConnectWalletButton v-else class="submit-button" />
		</BaseForm>
		<!-- </CollectionContextConsumer> -->
	</FormSubmit>
</template>

<script>
import ConnectWalletButton from './ConnectWalletButton';

import {
	SubmitButton,
	BaseForm,
	FormSubmit
} from '~/components/BaseForm';
import { CryptoPrice } from '~/components/Currency';
import NETWORKS from '~/constants/networks';
import { AssetsLastBadge } from '~/components/badges';

export default {
	components: {
		ConnectWalletButton,
		CryptoPrice,
		FormSubmit,
		BaseForm,
		SubmitButton,
		AssetsLastBadge
	},

	data () {
		return {
			NETWORKS
		};
	},

	computed: {
		account () {
			return this.$store.getters['ethereum/account'];
		},
		network () {
			return this.$store.getters['ethereum/network'];
		},
		collection () {
			return this.$store.getters['ethereum/collection'];
		}
	},

	methods: {
		async mintNft (mintAmount) {
			return this.$store.dispatch('ethereum/mintNft', { mintAmount });
		}
	}
};
</script>

<style scoped>
.payment-form {
	width: 100%;
}

.submit-button {
	width: auto;
	display: inline-block;
	vertical-align: bottom;
	margin-bottom: 1em;
}

.submit-button .text-secondary {
	opacity: 0.8;
	font-weight: 400;
}

@media screen and (max-width: 576px) {
	.payment-form {
		display: block;
	}

	.submit-button {
		display: block;
		width: 100%;
	}
}
</style>