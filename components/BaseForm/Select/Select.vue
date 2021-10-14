<template>
	<ThemeContextConsumer v-slot="{ light }">
		<Label
			:labelText="labelText"
			:smallLabelText="smallLabelText"
			class="label"
			:class="{ light }"
		>
			<select
				class="select"
				v-bind="$attrs"
				v-on="listeners"
			>
				<slot />
			</select>
			<slot name="after-select" />
		</Label>
	</ThemeContextConsumer>
</template>

<script>
import { Label } from '../Label';

export default {
	inheritAttrs: false,

	components: {
		Label
	},

	props: {
		labelText: {
			default: '',
			type: String
		},
		smallLabelText: {
			default: '',
			type: String
		}
	},

	computed: {
		listeners () {
			return {
				...this.$listeners,
				input: event => {
					this.$emit('input', event.target.value);
				},
				change: event => {
					this.$emit('change', event.target.value);
				}
			};
		}
	}
};
</script>


<style scoped>
.label {
	display: inline-block;
	vertical-align: middle;
	font-size: 1rem;
}

.select {
	width: inherit;
	display: inherit;
	font-size: inherit;
	border: 0;
	background: none;
	color: var(--color-text-primary);
	background-color: var(--color-background-primary);
	padding: 0.75em 1.5em 0.75em 0.75em;
	font-weight: 500;
	border-radius: 0.5em;
	line-height: inherit;

	box-sizing: border-box;
	box-shadow: none;
	-webkit-appearance: none;
	background-image: url("./images/select-arrow.svg?stroke=white");
	background-size: 0.75em auto;
	background-position: calc(100% - 0.5em) calc(50% + 0.1em);
	background-repeat: no-repeat;
	transition: opacity var(--smooth-animation), transform var(--smooth-animation), width var(--smooth-animation);
}

.light .select {
	background-image: url("./images/select-arrow.svg");
}

.select:hover {
  opacity: 0.8;
  transform: translateY(1px);
}

select::-ms-expand {
  display: none;
}

.select ::v-deep option {
	color: var(--color-text-primary);
}
</style>