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

			return this.$moment(date).calendar();
		}
	}
};
</script>
