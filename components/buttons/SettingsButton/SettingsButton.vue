<template>
	<Button
		class="settings-button"
		iconName="gear"
		title="Settings"
		:collapsed="collapsed"
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
		}
	},

	methods: {
		onClick () {
			this.$emit('click');
		}
	}
};
</script>