<template>
	<fieldset class="radio-buttons-fieldset">
		<legend v-if="title" class="title">
			{{ title }}
		</legend>

		<Props
			v-bind="$attrs"
			v-on="$listeners"
		>
			<slot />
		</Props>
	</fieldset>
</template>

<script>
import { Props } from '~/components/ControlFlow';

export default {
	inheritAttrs: false,
	components: {
		Props
	},
	props: {
		title: {
			type: String,
			default: null
		}
	}
};
</script>

<style scoped>
.radio-buttons-fieldset {
	display: block;
	width: 100%;
	padding: 0;
	margin: 0 0 1em;
	box-shadow: none;
	background: none;
	border: none;
}

.title {
	display: block;
	font-size: 1rem;
	font-weight: 500;
	line-height: 1.143;
	margin-bottom: 0.5em;
	letter-spacing: -0.005em;
	color: var(--color-text-primary);
}
</style>