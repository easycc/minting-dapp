<template>
	<section class="countdown-section">
		<h2 v-if="title" class="title">
			{{ title }}
		</h2>

		<ul class="time-parts-list">
			<li v-if="days" class="time-part-item">
				<span class="time-part-value">{{ days }}</span>
				<span class="time-part-title">days</span>
			</li>
			<li class="time-part-item">
				<span class="time-part-value">{{ hours }}</span>
				<span class="time-part-title">hours</span>
			</li>
			<li class="time-part-item">
				<span class="time-part-value">{{ minutes }}</span>
				<span class="time-part-title">minutes</span>
			</li>
			<li v-if="!days" class="time-part-item">
				<span class="time-part-value">{{ seconds }}</span>
				<span class="time-part-title">seconds</span>
			</li>
		</ul>

		<span class="event-date">* <BaseDate :date="eventDate" /> </span>
	</section>
</template>

<script>
import BaseDate from './Date';

export default {
	components: {
		BaseDate
	},

	props: {
		eventDate: {
			type: Date,
			required: true
		},

		title: {
			type: String,
			default: null
		}
	},

	data () {
		return {
			interval: null,

			days: null,
			hours: null,
			minutes: null,
			seconds: null
		};
	},

	mounted () {
		let moment = this.$moment;
		let currentDate = moment(new Date());
		let eventDate = moment(this.eventDate);

		let diff = eventDate.diff(currentDate);
		let duration = moment.duration(diff);

		const REFRESH_INTERVAL = 1000;

		const EVENT_HAS_STARTED = currentDate > eventDate;

		if (EVENT_HAS_STARTED) {
			this.$emit('finish');
		}
		else {
			this.interval = setInterval(() => {
				duration = moment.duration(duration - REFRESH_INTERVAL, 'milliseconds');
				this.hours = duration.hours();
				this.minutes = duration.minutes();
				this.seconds = duration.seconds();
				this.days = duration.days();

				const TIME_IS_UP = this.hours === 0 && this.minutes === 0 && this.seconds === 0;

				if (TIME_IS_UP) {
					this.$emit('finish');
					clearInterval(this.interval);
				}
			}, REFRESH_INTERVAL);
		}
	}
};
</script>

<style scoped>
.countdown-section {
	display: block;
}

.title {
	text-transform: uppercase;
	font-size: 1em;
	color: var(--color-text-default);
	letter-spacing: 0.05em;
	margin-bottom: 1em;
}

.time-parts-list {
	list-style: none;
	margin: 0;
	text-align: center;
}

.time-part-item {
	display: inline-block;
	vertical-align: top;
	padding: 1.125em 0.75em;
	min-width: 6em;
	position: relative;
	border-radius: 1em;
	background-color: var(--color-background-default);
	box-shadow: var(--volumetric-shadow);
}

@media screen and (max-width: 576px) {
	.time-part-item {
		min-width: 5em;
	}
}

.time-part-item + .time-part-item {
	margin-left: 0.5em;
}

.time-part-value {
	font-size: calc(1.5em + 0.5vw);
	font-weight: 600;
	margin-bottom: 0.5rem;
	display: block;
	color: var(--color-text-primary);
}

.time-part-title {
	font-weight: 500;
	font-size: 1.125em;
	color: var(--color-text-default);
}

.event-date {
	padding: 0.25em;
	color: var(--color-text-default);
	font-size: 0.875em;
}
</style>