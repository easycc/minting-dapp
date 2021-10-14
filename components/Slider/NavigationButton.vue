<template>
	<Button class="slide-button" collapsed :iconName="iconName" />
</template>

<script>
import { Button } from '~/components/buttons';

export default {

	components: {
		Button
	},

	props: {
		iconName: {
			type: String,
			default: 'chevron-left'
		}
	}
};
</script>

<style scoped>
.slide-button {
	position: absolute;
	z-index: 3;
	top: 50%;
	transform: translate(0, -50%);
	background: var(--color-background-primary);
	border: 0;
	font-size: 1em;
	min-width: initial;
	max-width: initial;
	color: var(--color-text-secondary);
	border-radius: 50%;
	width: 3em;
	height: 3em;
	box-shadow: none;
}

.slide-button:hover {
	background-color: var(--color-background-secondary);
	opacity: 1;
}

.slide-button:active {
	background-color: var(--color-background-secondary);
}

.slide-button.swiper-button-disabled {
	opacity: 0;
}
</style>