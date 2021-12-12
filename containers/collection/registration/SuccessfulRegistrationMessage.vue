<template>
	<DefaultCard class="successful-registration-message">
		<div class="text-wrapper">
			<h2 class="registration-title">
				You are registered
			</h2>

			<p class="registration-subtitle">
				Check back later on
				<Date :date="raffle.startAt" class="raffle-start-date" />
				to see if you won the opportunity to mint an {{ collection.name }} NFT.
			</p>
		</div>
		<CalendarCountdown
			class="countdown"
			title="The event will start in"
			:eventDate="raffle.startAt"
			@finish="startRaffle"
		/>
	</DefaultCard>
</template>

<script>
import { DefaultCard } from '~/components/cards';
import { CalendarCountdown, Date } from '~/components/Date';

export default {
	components: {
		CalendarCountdown,
		Date,
		DefaultCard
	},

	computed: {
		collection () {
			return this.$store.getters['ethereum/collection'];
		},

		raffle.startAt () {
			return this.collection.raffle.startAt;
		}
	},

	methods: {
		startRaffle () {
			this.$emit('start-raffle');
		}
	}
};
</script>

<style scoped>
.successful-registration-message {
	padding: 3em 2em 3em;
	display: flex;
	justify-content: space-between;
	text-align: left;
}

.text-wrapper {
	display: inline-block;
	vertical-align: top;
	max-width: 24em;
	padding-top: 0.5em;
	padding-right: 1em;
}

.registration-title {
	display: block;
	margin-bottom: 0.5em;
}

.registration-subtitle {
	line-height: 1.75;
}

.raffle-start-date {
	color: var(--color-text-primary);
	font-weight: 500;
}

.countdown {
	display: inline-block;
	vertical-align: top;
	text-align: center;
}

@media screen and (max-width: 900px) {
	.successful-registration-message {
		padding: 2em 1.5em 2em;
		flex-direction: column;
	}

	.text-wrapper {
		padding-bottom: 2em;
	}

}
</style>