<template>
	<span class="inline-countdown">
		<slot />
		<span v-if="days" class="time-part-item">{{ days }} days</span>
		<span class="time-part-item">{{ hours }} hours</span>
		<span class="time-part-item">{{ minutes }} minutes</span>
		<span v-if="!days" class="time-part-item">{{ seconds }} seconds</span>
	</span>
</template>

<script>
export default {
	props: {
		eventDate: {
			type: Date,
			required: true
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
.time-part-item {
	display: inline;
	font-weight: 500;
	color: var(--color-text-primary);
}

.time-part-item:before {
	content: ', ';
	margin-left: -0.25em;
}

.time-part-item:first-child:before {
	display: none;
}

.time-part-item + .time-part-item:last-child:after {
	display: none;
}

.time-part-item:last-child:before {
	content: 'and ';
	margin-left: 0;
}
</style>