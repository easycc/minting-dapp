<template>
	<Button
		class="back-button"
		iconName="chevron-left"
		iconPosition="before"
		title="Back"
		v-bind="$attrs"
		v-on="$listeners"
		@click="onClick"
	/>
</template>

<script>
import Button from '../Button/Button';

export default {
	inheritAttrs: false,

	components: {
		Button
	},

	methods: {
		onClick () {
			this.$emit('click');
		}
	}
};
</script>

<style scoped>
.back-button {
	background-color: transparent;
	box-shadow: none;
	font-weight: 400;
	color: var(--color-text-secondary);

	transform: translate(-0.25em, 0);
	padding: 0.333em;
}
</style>