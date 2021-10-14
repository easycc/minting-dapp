<template>
	<Checkbox
		:class="['checkbox-card', { checked, focused }]"
		v-bind="$attrs"
		v-on="$listeners"
		@input="toggleCheckbox"
		@focus="handleFocus"
		@blur="handleBlur"
	>
		<slot />
	</Checkbox>
</template>

<script>
import Checkbox from './CheckboxWithNativeValidation';

export default {
	name: 'CheckboxCard',
	inheritAttrs: false,
	components: {
		Checkbox
	},

	data () {
		return {
			checked: false,
			focused: false
		};
	},

	methods: {
		toggleCheckbox (value) {
			this.checked = value;
		},

		handleFocus () {
			this.focused = true;
		},

		handleBlur () {
			this.focused = false;
		}
	}
};
</script>

<style scoped>
.checkbox-card {
	display: inline-block;
	vertical-align: middle;
	width: auto;
	position: relative;
	margin: 0 0.5em 1em;
	padding: 1.5em 2em;
	border-radius: 0.8em;

	background-color: var(--color-background-secondary);
	box-shadow: var(--volumetric-shadow);
	text-align: center;
	transition: box-shadow var(--lazy-animation);
}

.checkbox-card ::v-deep .checkbox:focus + .check-mark {
	outline: none;
}

.checkbox-card ::v-deep .input-type-checkbox {
	position: absolute;
	border-radius: 0.333em;
	font-size: 1.5em;
	top: 0.33em;
	left: 0.33em;
}

.checkbox-card.checked {
	box-shadow:
		0 0 0 2px var(--color-compliment-secondary),
		0 0 20px 0 rgba(0,0,0,0.05),
		0 0 1px 0 rgba(0,0,0,0.20);
}

.checkbox-card.focused {
	outline: 3px solid rgba(131,192,253,.5);
	outline-offset: 1px;
}

.checkbox-card.checked.focused {
	outline-offset: 3px;
	outline: 2px solid rgba(131,192,253,.5);
}

.checkbox-card:hover.focused {
	outline: none;
}
</style>