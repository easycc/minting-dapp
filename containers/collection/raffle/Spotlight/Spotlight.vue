<template>
	<section class="spotlight-section">
		<div class="heading">
			<h1 class="section-title">
				Congrats!
			</h1>
			<p class="section-subtitle">
				You have been selected to mint your {{ collection.name }} NFT!
			</p>
			<p class="section-subtitle">
				<InlineCountdown
					:eventDate="queueEndDate"
					@finish="queueIsEnded"
				>
					You have
				</InlineCountdown>
				to mint!
			</p>
		</div>
	</section>
</template>

<script>
import { InlineCountdown } from '~/components/Date';

export default {
	components: {
		InlineCountdown
	},

	computed: {
		collection () {
			return this.$store.getters['ethereum/collection'];
		},

		queueEndDate () {
			return this.$moment(new Date(this.collection.lastQueueCheckDate))
				.add(this.collection.queueIntervalInMinutes, 'minutes')
				.toDate();
		}
	},

	methods: {
		queueIsEnded () {
			alert('you are late!');
		}
	}
};
</script>

<style scoped>
.spotlight-section {
	padding-top: 2em;
}

.section-subtitle {
	line-height: 1.75;
}
</style>