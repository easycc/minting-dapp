<template>
	<Button class="clickable-badge" @click="onClick">
		<DefaultBadge v-bind="$attrs" :class="className" v-on="$listeners">
			<slot />
		</DefaultBadge>
	</Button>
</template>

<script>
import DefaultBadge from './DefaultBadge';

export default {
	inheritAttrs: false,

	components: {
		DefaultBadge
	},

	props: {
		className: {
			type: String,
			default: ''
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
.clickable-badge {
	padding: 0;
	background: transparent;
	border-radius: 0;
	box-shadow: none;
}
</style>