<template>
	<AccentSpot class="accent-spot" kind="secondary">
		<FormSubmit successMessage="Congratulations! Visit OpenSea to sea your asset." class="payment-form">
			<BaseForm @submit="mintNft(999)">
				<div class="mint-amount-field">
					<Button
						:title="`Buy ${mintAmount - 1} NFT`"
						collapsed
						iconName="minus"
						class="input-button minus"
						:disabled="mintAmount <= 1"
						@click="mintAmount--"
					/>

					<Input
						v-model="mintAmount"

						type="number"
						placeholder="1"
						name="mintAmount"
						:max="maxMintAmount"
						:min="0"
						:required="true"
						class="mint-amount-input"
					/>

					<Button
						:title="`Buy ${mintAmount + 1} NFT`"
						collapsed
						iconName="plus"
						class="input-button plus"
						:disabled="mintAmount >= maxMintAmount"
						@click="mintAmount++"
					/>
				</div>

				<div class="button-wrapper">
					<span class="price">
						<CryptoPrice
							:name="network.currency.symbol"
							:network="network.name"
							:value="collection.cost"
							:amount="mintAmount"
						/>
						+ gas
					</span>

					<template v-if="account">
						<SubmitButton
							class="submit-button"
							kind="primary"
							title="Buy with ETH"
						/>
					</template>
					<ConnectWalletButton v-else class="submit-button" />
				</div>
			<!-- <AssetsLastBadge /> -->
			</BaseForm>
		</FormSubmit>
	</AccentSpot>
</template>

<script>
import ConnectWalletButton from './ConnectWalletButton';

import {
	SubmitButton,
	BaseForm,
	Input,
	FormSubmit
} from '~/components/BaseForm';
import { CryptoPrice } from '~/components/Currency';
import { Button } from '~/components/buttons';
import NETWORKS from '~/constants/networks';
import { AssetsLastBadge } from '~/components/badges';
import AccentSpot from '~/components/AccentSpot/AccentSpot';

export default {
	components: {
		ConnectWalletButton,
		CryptoPrice,
		Button,
		FormSubmit,
		BaseForm,
		Input,
		SubmitButton,
		AccentSpot,
		AssetsLastBadge
	},

	data () {
		return {
			NETWORKS,
			mintAmount: 1,

			maxMintAmount: 5
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
		async mintNft () {
			let { mintAmount } = this;

			return this.$store.dispatch('ethereum/mintNft', { mintAmount });
		}
	}
};
</script>

<style scoped>
.accent-spot {
	max-width: 40rem;
	display: block;
	margin: 0 auto 2em;
}

.payment-form {
	width: 100%;
	padding: 0 0.5em;
	text-align: left;
	position: relative;
}

.mint-amount-field {
	display: inline-block;
	vertical-align: middle;
	text-align: center;
}

.mint-amount-field ::v-deep .input {
	padding: 0;
	font-size: 3em;
	background: transparent;
}

.price {
	margin-right: 0.5em;
}

.mint-amount-input {
	display: inline-block;
	vertical-align: middle;
	margin-bottom: 0;
	width: auto;
	max-width: 5em;
}


.input-button {
	display: inline-block;
	vertical-align: middle;
	font-size: 0.75em;
}

.submit-button {
	display: inline-block;
	width: auto;
	/* background-color: #fb6400 !important; */
}

.button-wrapper {
	float: right;
	padding-top: 0.5em;
}


@media screen and (max-width: 650px) {
	.payment-form {
		text-align: center;
	}

	.button-wrapper {
		float: initial;
		padding-top: 0;
	}

	.mint-amount-field {
		margin-bottom: 1em;
	}

	.price {
		display: block;
		padding-bottom: 0.5em;
		margin-right: 0;
	}
}
</style>