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
			return this.raffleStartDate < new Date() && this.raffleEndDate > new Date();
		},

		raffleStartDate () {
			return this.collection.raffleStartDate;
		},

		raffleEndDate () {
			return this.collection.raffleEndDate;
		},

		raffleIsNotStarted () {
			return this.raffleStartDate > new Date();
		},

		raffleIsEnded () {
			return this.raffleEndDate < new Date();
		}
	},

	watch: {
		raffleStartDate () {
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