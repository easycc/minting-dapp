<template>
	<span class="crypto-currency">
		{{ name }}
		<FormatNumber :value="value * amount" />
	</span>
</template>

<script>
import { FormatNumber } from '~/components/FormatNumber';

export default {
	components: {
		FormatNumber
	},

	props: {
		name: {
			required: true,
			type: String
		},
		value: {
			required: true,
			type: Number
		},
		amount: {
			type: Number,
			default: 1
		}
	}
};
</script>


<style scoped>
.crypto-currency {
  display: inline;
}
</style>