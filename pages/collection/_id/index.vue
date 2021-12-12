<template>
	<Page>
		<template v-slot:header>
			<Header />
		</template>

		<PageContent class="collection-index-page">
			<Spotlight />

			<CollectionContextConsumer v-slot="{ registrationConfirmed }">
				<Fade v-if="registrationConfirmed !== null">
					<SuccessfulRegistrationMessage
						v-if="raffleIsNotStarted && registrationConfirmed"
						@start-raffle="fetchCollection"
					/>

					<DefaultCard
						v-else-if="raffleRegistrationIsActive && registrationConfirmed === false"
						class="action-card"
					>
						<h2 class="action-card-title">
							Raffle registration is started!
						</h2>
						<p class="action-card-subtitle">
							<InlineCountdown
								:eventDate="raffle.registration.endAt"
								@finish="fetchCollection"
							>
								Time left:
							</InlineCountdown>
						</p>
						<div>
							<Button
								:link="`/collection/${collectionId}/registration`"
								toLocalePath
								title="Register in raffle"
								kind="primary"
								class="action-button"
							/>
						</div>
					</DefaultCard>

					<InlineMessage v-else-if="raffleRegistrationIsEnded && registrationConfirmed === false && !raffleIsActive">
						We're sorry, but the registration period has ended
					</InlineMessage>

					<DefaultCard v-else-if="raffleIsActive && registrationConfirmed === true" class="action-card">
						<h2 class="action-card-title">
							Raffle is started!
						</h2>
						<p class="action-card-subtitle">
							Join the raffle and check if you won the opportunity to mint {{ collection.name }} NFT
						</p>
						<p class="action-card-subtitle">
							<InlineCountdown
								:eventDate="raffle.endAt"
								@finish="fetchCollection"
							>
								Time left:
							</InlineCountdown>
						</p>
						<div>
							<Button
								:link="`/collection/${collectionId}/raffle`"
								toLocalePath
								title="Join the raffle"
								kind="primary"
								class="action-button"
							/>
						</div>
					</DefaultCard>

					<CalendarCountdown
						v-else-if="registrationConfirmed === false && raffleRegistrationIsActive === false && !raffleIsActive"
						title="Raffle registration starts in:"
						:eventDate="raffle.registration.startAt"
						@finish="fetchCollection"
					/>

					<Button
						v-else-if="(raffleIsEnded || (raffleIsActive && raffleRegistrationIsActive === false)) && collection.socialLinks"
						:href="collection.socialLinks.openSea"
						title="View on OpenSea"
						kind="primary"
					/>
				</Fade>
			</CollectionContextConsumer>
		</PageContent>

		<template v-slot:footer>
			<Footer />
		</template>
	</Page>
</template>

<script>
import {
	Spotlight
} from '~/containers/collection/index/index';
import { Page, Header, Footer, PageContent } from '~/components/PageLayout';
import { Fade } from '~/components/animation';
import { DefaultCard } from '~/components/cards';
import { Button } from '~/components/buttons';
import { InlineMessage } from '~/components/InlineMessage';
import { CalendarCountdown, InlineCountdown } from '~/components/Date';
import CollectionContext from '~/containers/collection/context/CollectionContext';
import { SuccessfulRegistrationMessage } from '~/containers/collection/registration';

export default {
	layout: 'collection',

	components: {
		Page,
		PageContent,
		Header,
		Footer,
		DefaultCard,
		Spotlight,

		InlineMessage,
		InlineCountdown,
		CalendarCountdown,
		Fade,
		SuccessfulRegistrationMessage,
		CollectionContextConsumer: CollectionContext.Consumer,
		Button
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

		raffleRegistrationIsActive () {
			return this.raffle.registration.startAt < new Date() && this.raffle.registration.endAt > new Date();
		},

		raffleRegistrationIsEnded () {
			return this.raffle.registration.endAt < new Date();
		},


		raffleIsActive () {
			return this.raffle.startAt < new Date() && this.raffle.endAt > new Date();
		},

		raffle.startAt () {
			return this.collection.raffle.startAt;
		},

		raffle.endAt () {
			return this.collection.raffle.endAt;
		},

		raffleIsNotStarted () {
			return this.raffle.startAt > new Date();
		},

		raffleIsEnded () {
			return this.raffle.endAt < new Date();
		}
	},

	methods: {
		fetchCollection () {
			return this.$store.dispatch('ethereum/fetchCollection');
		}
	}
};
</script>

<style scoped>
.collection-index-page {
	text-align: center;
}

.action-card {
	display: inline-block;
	padding-top: 2em;
	padding-bottom: 0em;
	max-width: 32em;
}

.action-button {
	margin-bottom: 2em;
}

.action-card-title {
	font-size: 1.5em;
	margin-bottom: 0.5em;
}

.action-card-subtitle {
	max-width: 23em;
	display: block;
	width: 100%;
	margin: 0 auto 2em;
}
</style>