<template>
	<CollectionContextProvider
		:value="{
			registrationConfirmed,
			setRegistrationConfirmed,
			collectionId
		}"
	>
		<LightTheme v-if="collection.name && collection.contractAddress">
			<nuxt />
		</LightTheme>
		<LoadingScreen v-else class="loading-screen" />
	</CollectionContextProvider>
</template>

<script>

import LightTheme from './light-theme';

import CollectionContext from '~/containers/collection/context/CollectionContext';
import LocaleStorage from '~/services/locale-storage';
import { LoadingScreen } from '~/components/Loading';

export default {
	components: {
		LightTheme,
		LoadingScreen,
		CollectionContextProvider: CollectionContext.Provider
	},

	provide () {
		return {
			registrationConfirmed: this.registrationConfirmed,
			setRegistrationConfirmed: this.setRegistrationConfirmed,
			collectionId: this.collectionId
		};
	},

	data () {
		return {
			registrationConfirmed: null
		};
	},

	computed: {
		account () {
			return this.$store.getters['ethereum/account'];
		},

		collection () {
			return this.$store.getters['ethereum/collection'];
		},

		collectionId () {
			return this.$route.params.id;
		}
	},

	async mounted () {
		await this.fetchCollection();
		await this.connectWallet();
		await this.checkIfAlreadyParticipator();
	},

	methods: {
		async checkIfAlreadyParticipator () {
			try {
				let registrationDocSnap = await this.$fire.firestore
					.collection('collections')
					.doc(this.collectionId)
					.collection('participators')
					.doc(this.account)
					.get();

				this.registrationConfirmed = registrationDocSnap.exists;
			}
			catch (error) {
				console.log(error);
			}
		},

		async connectWallet () {
			const storedAccount = LocaleStorage.getItem('account');

			if (storedAccount) {
				await this.$store.dispatch('ethereum/connect');
			}
		},

		async fetchCollection () {
			return this.$store.dispatch('ethereum/fetchCollection');
		},

		setRegistrationConfirmed () {
			this.registrationConfirmed = true;
		}
	}
};
</script>

<style scoped>
.loading-screen {
	background: #f3f3f3;
}
</style>
