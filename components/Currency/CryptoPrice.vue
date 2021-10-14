<template>
	<span class="crypto-currency">
		{{ value * amount }} {{ name }}
	</span>
</template>

<script>
export default {
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