<template>
	<MoneyFormat
		:value="value"
		class="currency"
		:locale="locale"
		:currencyCode="name"
		:hideSubunits="false"
	/>
</template>

<script>
import MoneyFormat from 'vue-money-format';

export default {
	components: {
		MoneyFormat
	},

	props: {
		name: {
			required: true,
			type: String
		},
		value: {
			required: true,
			type: Number
		}
	},

	computed: {
		locale () {
			return this.$i18n.locale;
		}
	}
};
</script>


<style scoped>
.currency {
  display: inline;
}
</style>