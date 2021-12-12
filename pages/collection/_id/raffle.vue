<template>
	<Page>
		<template v-slot:header>
			<Header />
		</template>

		<PageContent v-if="raffleIsActive">
			<Spotlight />
			<PaymentForm />
		</PageContent>

		<template v-slot:footer>
			<Footer />
		</template>
	</Page>
</template>

<script>
import {
	Spotlight
} from '~/containers/collection/raffle';
import { Page, Header, Footer, PageContent } from '~/components/PageLayout';
import { PaymentForm } from '~/components/Payment';

export default {
	layout: 'collection',

	components: {
		Page,
		Header,
		Footer,
		PageContent,
		PaymentForm,
		Spotlight
	},

	inject: ['collectionId'],

	computed: {
		collection () {
			return this.$store.getters['ethereum/collection'];
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

	watch: {
		raffle.startAt () {
			this.checkRaffleAvailability();
		}
	},

	mounted () {
		this.checkRaffleAvailability();
	},

	methods: {
		checkRaffleAvailability () {
			if (!this.raffleIsActive) {
				this.$router.push(this.localePath(`/collection/${this.collectionId}`));
			}
		}
	}
};
</script>