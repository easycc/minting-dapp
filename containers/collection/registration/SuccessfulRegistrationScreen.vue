<template>
	<section>
		<BackButton class="back-button" toLocalePath :link="`/collection/${collectionId}`" />
		<h1 class="page-title">
			You are registered!
		</h1>
		<div class="page-subtitle">
			<p>
				Check back later on
				<Date :date="collection.raffle.startAt" class="raffle-start-date" />
				to see if you won the opportunity to mint {{ collection.name }} NFT.
			</p>
		</div>
		<p>
			The raffle starts in
			<InlineCountdown
				:eventDate="raffle.startAt"
				@finish="startRaffle"
			/>
		</p>

		<p>Stay up to date on our social media:</p>
		<SocialLinks class="social-links" />
	</section>
</template>

<script>
import SocialLinks from '~/containers/collection/SocialLinks/SocialLinks';
import { Date, InlineCountdown } from '~/components/Date';
import { BackButton } from '~/components/buttons';

export default {
	components: {
		SocialLinks,
		BackButton,
		InlineCountdown,
		Date
	},

	inject: ['collectionId'],

	computed: {
		account () {
			return this.$store.getters['ethereum/account'];
		},

		collection () {
			return this.$store.getters['ethereum/collection'];
		},

		network () {
			return this.$store.getters['ethereum/network'];
		},

		raffle.startAt () {
			return this.collection.raffle.startAt;
		}
	},

	methods: {
		startRaffle () {
			this.$router.push(this.localePath(`/collection/${this.collectionId}`));
		}
	}
};
</script>

<style scoped>
.back-button {
	margin-bottom: 1em;
}

.raffle-start-date {
	color: var(--color-text-primary);
	font-weight: 500;
}

.page-subtitle {
	display: block;
	max-width: 32em;
	margin-bottom: 2em;
}

p {
	margin-bottom: 0.25em;
}

.page-subtitle p {
	font-size: 1.25em;
	color: var(--color-text-primary);
	margin-bottom: 1em;
	line-height: 1.75;
}

.social-links {
	padding-top: 1em;
}
</style>