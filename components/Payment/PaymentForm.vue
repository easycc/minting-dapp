<template>
	<AccentSpot class="accent-spot" kind="secondary">
		<FormSubmit successMessage="Congratulations! Visit OpenSea to sea your asset." class="payment-form">
			<BaseForm @submit="mintNft">
				<AssetsLastBadge />

				<div class="right">
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
							:max="config.maxMintAmount"
							:min="0"
							:required="true"
							class="mint-amount-input"
						/>

						<Button
							:title="`Buy ${mintAmount + 1} NFT`"
							collapsed
							iconName="plus"
							class="input-button plus"
							:disabled="mintAmount >= config.maxMintAmount"
							@click="mintAmount++"
						/>
					</div>

					<span class="price">
						<CryptoPrice
							:name="network.currency.symbol"
							:network="network.name"
							:value="config.cost"
							:amount="mintAmount"
						/>
						+ gas
					</span>

					<Fade>
						<SubmitButton
							v-if="account"
							class="submit-button"
							kind="primary"
							title="Buy with ETH"
						/>
						<ConnectWalletButton v-else class="submit-button" />
					</Fade>
				</div>
			</BaseForm>
		</FormSubmit>
	</AccentSpot>
</template>

<script>
import ConnectWalletButton from './ConnectWalletButton';

import { Fade } from '~/components/animation';
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
import config from '~/collection/config.json';

export default {
	components: {
		ConnectWalletButton,
		Fade,
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
			config,
			mintAmount: 1
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
	padding: 0 1em;
	text-align: left;
	position: relative;
	display: flex;
	flex-direction: row;
}

.mint-amount-field {
	display: inline-block;
	vertical-align: middle;
	text-align: center;
}

.mint-amount-field {
	display: block;
}

::v-deep .accent-spot-content {
	padding-bottom: 1em;
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
	vertical-align: top;
	background: #555;
	font-size: 0.75em;
	margin-top: 0.75em;
}

.submit-button {
	display: inline-block;
	width: auto;
}

.right {
	text-align: center;
	margin-left: auto;
}

.price {
	display: block;
	padding-bottom: 0.5em;
	margin-right: 0;
}


@media screen and (max-width: 650px) {
	.payment-form {
		text-align: center;
		flex-direction: column;
	}

	.right {
		margin-right: auto;
		padding-top: 2em;
	}

	.mint-amount-field {
		margin-bottom: 0.25em;
	}

	::v-deep .accent-spot-content {
		padding-bottom: 2em;
	}
}
</style>