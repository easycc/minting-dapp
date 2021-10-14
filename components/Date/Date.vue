<template>
	<time class="time">{{ formatedDate }}</time>
</template>

<script>
export default {
	props: {
		date: {
			type: [String, Date, Object],
			default: null
		}
	},

	computed: {
		formatedDate () {
			let date;

			if (this.date.toDate) {
				date = this.date.toDate();
			}
			else {
				date = this.date;
			}

			date = this.$moment(date);

			return `${date.local().format('DD MMM YYYY HH:MM')} ${String(date.local()._d).split(' ')[5]}`;
		}
	}
};
</script>