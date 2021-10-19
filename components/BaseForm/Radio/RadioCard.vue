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
			required: true
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
	display: inline-block;
	vertical-align: middle;
	width: auto;
	position: relative;
	margin: 0 0.5em 1em;
	padding: 1.5em 1em;
	font-size: 1em;
	border-radius: 0.8em;

	background-color: var(--color-background-secondary);
	box-shadow: var(--volumetric-shadow);
	transition: box-shadow var(--lazy-animation);
}

.radio-card ::v-deep .radio:focus + .check-mark {
	outline: none;
}

.radio-card ::v-deep .input-type-radio {
	font-size: 1.125em;
	vertical-align: text-bottom;
	margin-right: 0.5em;
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