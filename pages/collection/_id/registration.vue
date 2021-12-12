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

		raffle.registration.startAt () {
			return this.collection.raffle.registration.startAt;
		},

		raffle.registration.endAt () {
			return this.collection.raffle.registration.endAt;
		},

		raffleRegistrationIsStarted () {
			return this.raffle.registration.startAt < new Date();
		},

		raffleRegistrationIsActive () {
			return this.raffle.registration.startAt < new Date()
				&& this.raffle.registration.endAt > new Date();
		}
	},

	watch: {
		raffle.registration.startAt () {
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