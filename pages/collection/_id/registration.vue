<template>
	<CollectionContextConsumer v-slot="{ registrationConfirmed }">
		<Page>
			<template v-slot:header>
				<Header />
			</template>

			<PageContent class="registration-page">
				<Fade>
					<RaffleRegistrationForm v-if="raffleRegistrationIsActive && registrationConfirmed === false" />
					<SuccessfulRegistrationScreen v-else-if="raffleRegistrationIsStarted && registrationConfirmed" />
				</Fade>
			</PageContent>

			<template v-slot:footer>
				<Footer />
			</template>
		</Page>
	</CollectionContextConsumer>
</template>

<script>
import { Fade } from '~/components/animation';
import { RaffleRegistrationForm, SuccessfulRegistrationScreen } from '~/containers/collection/registration';
import { Page, Header, Footer, PageContent } from '~/components/PageLayout';
import CollectionContext from '~/containers/collection/context/CollectionContext';

export default {
	layout: 'collection',

	components: {
		Fade,
		Page,
		Header,
		PageContent,
		RaffleRegistrationForm,
		SuccessfulRegistrationScreen,
		CollectionContextConsumer: CollectionContext.Consumer,
		Footer
	},
	inject: ['collectionId'],

	computed: {
		collection () {
			return this.$store.getters['ethereum/collection'];
		},

		raffleRegistrationStartDate () {
			return this.collection.raffleRegistrationStartDate;
		},

		raffleRegistrationEndDate () {
			return this.collection.raffleRegistrationEndDate;
		},

		raffleRegistrationIsStarted () {
			return this.raffleRegistrationStartDate < new Date();
		},

		raffleRegistrationIsActive () {
			return this.raffleRegistrationStartDate < new Date()
				&& this.raffleRegistrationEndDate > new Date();
		}
	},

	watch: {
		raffleRegistrationStartDate () {
			this.checkRegistrationAvailability();
		}
	},

	mounted () {
		this.checkRegistrationAvailability();
	},

	methods: {
		checkRegistrationAvailability () {
			if (!this.raffleRegistrationIsActive) {
				this.$router.push(this.localePath(`/collection/${this.collectionId}`));
			}
		}
	}
};
</script>

<style scoped>
.registration-page {
	padding-top: 2em;
}
</style>