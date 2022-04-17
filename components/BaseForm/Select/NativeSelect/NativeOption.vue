<template>
	<option :value="value">
		<slot>{{ title }}</slot>
	</option>
</template>

<script>
export default {
	props: {
		title: {
			type: [String, Number],
			default: undefined
		},
		value: {
			type: [String, Number],
			required: true
		}
	}
};
</script>