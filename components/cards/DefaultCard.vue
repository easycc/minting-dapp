<template>
	<ThemeContextConsumer v-slot="{ light }">
		<component
			:is="tag"
			class="card"
			:class="[`card-${kind}`, { light }]"
		>
			<slot />

			<Icon v-if="showArrow" name="arrow-right" class="arrow-icon" />
		</component>
	</ThemeContextConsumer>
</template>

<script>
import { Icon } from '~/components/Icon';

export default {
	components: {
		Icon
	},

	props: {
		tag: {
			type: String,
			default: 'div'
		},

		kind: {
			default: 'secondary',
			validator: name => ['primary', 'secondary'].includes(name)
		},

		showArrow: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped>
.card {
	display: inline-block;
	vertical-align: middle;
	box-sizing: border-box;
	width: 100%;
  padding: 1em ;
	border-radius: 1em;
	background-color: var(--color-background-secondary);
	box-shadow: 0px 110px 80px -20px rgba(0, 10, 0, 0.05);
}

.card-primary {
	position: relative;
	overflow: hidden;
}

.card-primary:after {
	height: 0.5rem;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	content: '';
	background: var(--border-gradient,
		linear-gradient(55deg,var(--color-accent-primary) 0%,var(--color-accent-secondary) 100%));
}

.card.light {
	background-color: var(--color-background-default);
}

.arrow-icon {
	transform: rotate(-45deg);
	position: absolute;
	font-size: 1.25em;
	top: 0.5em;
	right: 0.5em;
	opacity: 0.3;
}
</style>