<template>
	<ThemeContextConsumer v-slot="{ light }">
		<Button class="button-card" :class="{ light }" :title="title" @click="onClick">
			<slot />
			<Icon v-if="showArrow" name="arrow-right" class="arrow-icon" />
		</Button>
	</ThemeContextConsumer>
</template>

<script>
import { Icon } from '~/components/Icon';
import { Button } from '~/components/buttons';

export default {
	components: {
		Button,
		Icon
	},

	props: {
		showArrow: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: null
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
.button-card {
	display: inline-block;
	box-shadow: var(--volumetric-shadow);
	box-sizing: border-box;
	text-align: left;
	width: 100%;
  padding: 1em;
	border-radius: 1em;
	background-color: var(--color-background-secondary);
}

.button-card.light {
	background-color: var(--color-background-default);
}

.arrow-icon {
	transform: rotate(-45deg);
	position: absolute;
	top: 0.5em;
	right: 0.5em;
	opacity: 0.3;
	font-size: 1.25em;
}
</style>