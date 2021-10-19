<template>
	<div class="message">
		<Icon name="warning" class="message-icon" />
		<span class="message-text">
			<slot />
		</span>
	</div>
</template>


<script>
import { Icon } from '~/components/Icon';

export default {
	components: {
		Icon
	}
};
</script>


<style scoped>
.message {
	--color-accent: var(--color-compliment-primary);

	display: inline-flex;
	align-items: flex-start;
	flex-direction: row;
	padding: 1em 1em 1em 0.75em;
	border-radius: 0.5em;
	color: var(--color-accent);
	position: relative;
	margin-bottom: 1.333em;
	text-align: left;
	line-height: 1.5;
}

.message:after {
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	background-color: currentColor;
	z-index: 0;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0.05;
	border-radius: inherit;
}

.message-icon {
	font-size: 1.25em;
	margin-top: 0.1em;
	border-radius: 50%;
	padding: 0.25em;
	background-color: var(--color-accent);
	color: #fff;
	margin-right: 0.5em;
	display: inline-block;
	vertical-align: text-top;
}

.message-text {
	color: var(--color-text-primary);
	display: inline-block;
	vertical-align: top;
	z-index: 1;
}
</style>