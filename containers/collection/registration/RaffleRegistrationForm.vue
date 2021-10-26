<template>
	<FormSubmit v-if="collection.maxMintAmount">
		<BaseForm class="raffle-registration-form" @submit="registerInRaffle">
			<BackButton class="back-button" toLocalePath :link="`/collection/${collectionId}`" />
			<h1 class="page-title">
				Registration
			</h1>

			<div class="page-subtitle">
				<p>
					Welcome to the registration page for {{ collection.name }}!
				</p>
				<p>
					Please select the amount of {{ collection.name }} NFT you would like to mint.
				</p>
			</div>

			<h2 class="form-title">
				How many {{ collection.name }} NFT you would like to mint?
			</h2>

			<RadioCard
				v-for="mintAmount in collection.maxMintAmount"
				:key="mintAmount"
				v-model.number="participator.amount"
				:radioValue="mintAmount"
				:checked="mintAmount === participator.amount"
				name="mintAmount"
				class="amount-radio"
			>
				<span class="amount">{{ mintAmount }} NFT</span>

				<span class="price">
					<CryptoPrice
						:name="network.currency.symbol"
						:network="network.name"
						:value="collection.cost"
						:amount="mintAmount"
					/>
					+ gas
				</span>
			</RadioCard>

			<MessageGroup>
				<InlineMessage class="note">
					You must have
					<CryptoPrice
						:name="network.currency.symbol"
						:network="network.name"
						:value="collection.cost"
						:amount="participator.amount"
					/>
					on your wallet to take participation
				</InlineMessage>
				<InlineMessage class="note">
					When you pick {{ participator.amount }}, you will be <b>required</b> to purchase
					{{ participator.amount }} {{ collection.name }} NFT.
					You are unable to obtain another amount if you picked {{ participator.amount }}.
				</InlineMessage>
			</MessageGroup>

			<SubmitButton title="Register" />
		</BaseForm>
	</FormSubmit>
</template>

<script>
import {
	FormSubmit,
	BaseForm,
	SubmitButton,
	RadioCard
} from '~/components/BaseForm';
import { CryptoPrice } from '~/components/Currency';
import { InlineMessage, MessageGroup } from '~/components/InlineMessage';
import { BackButton } from '~/components/buttons';

export default {
	components: {
		FormSubmit,
		RadioCard,
		BaseForm,
		InlineMessage,
		MessageGroup,
		CryptoPrice,
		BackButton,
		SubmitButton
	},

	inject: ['collectionId', 'setRegistrationConfirmed'],

	data () {
		return {
			participator: {
				amount: 1
			}
		};
	},

	computed: {
		account () {
			return this.$store.getters['ethereum/account'];
		},

		collection () {
			return this.$store.getters['ethereum/collection'];
		},

		network () {
			return this.$store.getters['ethereum/network'];
		}
	},

	methods: {
		async registerInRaffle () {
			const {
				collectionId,
				account
			} = this;

			let participator = {
				...this.participator,
				accountId: this.account
			};

			let takeParticipation = this.$fire.functions.httpsCallable('takeParticipation');

			return takeParticipation({ participator, collectionId, account })
				.then(() => {
					this.$notify({
						group: 'all',
						title: 'You are registered!',
						type: 'success'
					});
					return this.setRegistrationConfirmed();
				})
				.catch(error => {
					throw error;
				});
		}
	}
};
</script>

<style scoped>
.raffle-registration-form {
	max-width: 32em;
}

.form-title {
	font-size: 1.25em;
}

.page-subtitle {
	margin-bottom: 2em;
}

.page-subtitle p {
	line-height: 1.75;
	margin: 0;
}

.note {
	width: 100%;
}

.back-button {
	margin-bottom: 1em;
}

.amount-radio {
	margin: 0 auto 1em;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
}

.amount {
	font-weight: 600;
}

.price {
	margin-left: auto;
	font-weight: 500;
	color: var(--color-text-default);
}
</style>