<template>
	<Radio
		:class="['radio-card', { checked, focused }]"
		v-bind="$attrs"
		:checked="checked"
		v-on="$listeners"
		@focus="handleFocus"
		@blur="handleBlur"
	>
		<slot />
	</Radio>
</template>

<script>
import Radio from './Radio';

export default {
	inheritAttrs: false,
	components: {
		Radio
	},

	props: {
		checked: {
			type: Boolean,
			default: false
		}
	},

	data () {
		return {
			focused: false
		};
	},

	methods: {
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
.radio-card {
	display: block;
	position: relative;
	margin: 0 0 1em;
	padding: 0.875em 2em;
	border-radius: 0.5em;
	line-height: 1.333;

	background-color: var(--color-background-default);
	box-shadow: var(--volumetric-shadow);
	transition: box-shadow var(--lazy-animation);
}

.radio-card ::v-deep .radio:focus + .check-mark {
	outline: none;
}

.radio-card ::v-deep .input-type-radio {
	position: absolute;
	border-radius: 50%;
	font-size: 1.25em;
	top: 0.33em;
	left: 0.33em;
}

.radio-card.checked {
	box-shadow:
		0 0 0 2px var(--color-compliment-secondary),
		0 0 20px 0 rgba(0,0,0,0.05),
		0 0 1px 0 rgba(0,0,0,0.20);
}

.radio-card.focused {
	outline: 3px solid rgba(131,192,253,.5);
	outline-offset: 1px;
}

.radio-card.checked.focused {
	outline-offset: 3px;
	outline: 2px solid rgba(131,192,253,.5);
}

.radio-card:hover.focused {
	outline: none;
}
</style>