<template>
	<PageContent tag="section" class="spotlight-section">
		<div class="title-wrapper">
			<h1 class="page-title">
				Crypto Savanna
			</h1>
			<span>3% of every sale will go to charity!</span>
		</div>

		<Button
			v-if="raffleStartDate && raffleIsStarted"
			:link="`/collection/${collectionId}/registration`"
			toLocalePath
			title="Register in raffle"
			kind="primary"
		/>

		<Countdown
			v-else-if="raffleStartDate"
			title="Raffle registration starts in:"
			:eventDate="raffleStartDate"
			@finish="startRaffle"
		/>
	</PageContent>
</template>

<script>
import { PageContent } from '~/components/PageLayout';
import { Button } from '~/components/buttons';
import { Countdown } from '~/components/Date';

export default {
	components: {
		PageContent,
		Countdown,
		Button
	},

	computed: {
		collectionId () {
			return this.$route.params.id;
		},

		collection () {
			return this.$store.getters['ethereum/collection'];
		},

		raffleStartDate () {
			if (!this.collection.raffleStartDate) return null;
			return new Date(this.collection.raffleStartDate.toDate());
		},

		raffleIsStarted () {
			return this.raffleStartDate < new Date();
		}
	},

	methods: {
		async startRaffle () {
			await this.$store.dispatch('ethereum/fetchCollection');
		}
	}
};
</script>

<style scoped>
.spotlight-section {
	padding-top: 2em;
	text-align: center;
}

.title-wrapper {
	display: block;
	margin-bottom: 2em;
}
</style>