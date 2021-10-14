<template>
	<Button
		class="delete-button"
		iconName="trash"
		:collapsed="collapsed"
		iconPosition="after"
		:title="title"
		@click="onClick"
	/>
</template>

<script>
import Button from '../Button/Button';

export default {
	components: {
		Button
	},

	props: {
		collapsed: {
			type: Boolean,
			default: false
		},

		title: {
			type: String,
			default: 'Delete'
		}
	},

	methods: {
		onClick () {
			this.$emit('click');
		}
	}
};
</script>

<style scoped>
.delete-button {
	background: #484848;
}
</style>