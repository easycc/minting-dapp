<template>
	<span>{{ formattedNumber }}</span>
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			default: undefined
		}
	},

	computed: {
		formattedNumber () {
			return new Intl.NumberFormat().format(this.value);
		}
	}
};
</script>