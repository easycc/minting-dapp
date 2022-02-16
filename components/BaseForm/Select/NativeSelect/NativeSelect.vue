<template>
	<Label
		:labelText="labelText"
		:smallLabelText="smallLabelText"
		class="label"
	>
		<div class="select">
			<select
				class="native-select"
				v-bind="$attrs"
				:multiple="multiple"
				v-on="listeners"
			>
				<slot />
			</select>

			<Icon name="chevron-bottom" class="icon" />

		</div>
		<slot name="after-select" />
	</Label>
</template>

<script>

import { Label } from '../../Label';

import { Icon } from '~/components/Icon';

export default {
	inheritAttrs: false,

	components: {
		Label,
		Icon
	},

	props: {
		labelText: {
			default: '',
			type: String
		},
		multiple: {
			default: false,
			type: Boolean
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
					console.log(1);
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
	position: relative;
	display: inline-block;
	max-width: 100%;
}

.native-select {
	width: inherit;
	display: inherit;
	font-size: inherit;
	max-width: inherit;
	border: 0;
	background: none;
	color: var(--color-text-primary);
	background-color: var(--color-background-primary);
	padding: 0.75em 1.5em 0.75em 0.75em;
	font-weight: 400;
	border-radius: 0.5em;
	line-height: inherit;

	box-sizing: border-box;
	box-shadow: none;
	-webkit-appearance: none;

	transition:
		width var(--smooth-animation),
		opacity var(--smooth-animation),
		background-color var(--smooth-animation),
		transform var(--smooth-animation);
}

.icon {
	font-size: 0.875em;
	position: absolute;
	top: 50%;
	right: 0.5em;
	transform: translate(0, -50%);
	color: var(--color-text-default);
}

.native-select:hover {
	background-color: var(--color-background-secondary);
}

select::-ms-expand {
  display: none;
}

.select ::v-deep option {
	color: var(--color-text-primary);
}
</style>