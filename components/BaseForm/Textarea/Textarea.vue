<template>
	<Label
		:valid="valid"
		:labelText="labelText"
		:smallLabelText="smallLabelText"
		:hideLabelText="hideLabelText"
		:errors="errors"
		:class="{ invalid }"
	>
		<slot />

		<component :is="tag">
			<textarea
				v-model.trim="innerValue"
				class="textarea"
				rows="1"
				v-bind="$attrs"
				:disabled="disabled"
				:name="name"
				:placeholder="placeholder"
				:class="[{ invisible }]"
				@blur="onBlur"
				@focus="onFocus"
				@input="handleInput"
			/>
		</component>
	</Label>
</template>

<script>
import { Label } from '../Label';
import ResizeTextarea from './ResizeTextarea';

import { Fragment } from '~/components/ControlFlow';

export default {
	name: 'Textarea',
	inheritAttrs: false,
	components: {
		Label,
		ResizeTextarea,
		Fragment
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		labelText: {
			default: '',
			type: String
		},
		smallLabelText: {
			default: '',
			type: String
		},
		name: {
			type: String,
			default: ''
		},
		invisible: {
			type: Boolean,
			default: false
		},
		valid: {
			type: Boolean,
			default: undefined
		},
		hideLabelText: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: ''
		},
		errors: {
			type: Array,
			default: () => []
		},
		disabled: {
			type: Boolean,
			default: false
		},
		resizeOnContent: {
			type: Boolean,
			default: false
		}
	},

	data () {
		return {
			innerValue: this.value
		};
	},

	computed: {
		invalid () {
			return this.valid === false;
		},

		tag () {
			return this.resizeOnContent ? 'ResizeTextarea' : 'Fragment';
		}
	},

	watch: {
		// Handles internal model changes.
		innerValue (newValue) {
			this.$emit('input', newValue);
		},

		// Handles external model changes.
		value (newValue) {
			this.innerValue = newValue;
		}
	},

	methods: {
		onFocus () {
			this.$emit('focus');
		},

		onBlur (event) {
			this.$emit('blur', event.target.value);
		},

		handleInput (event) {
			this.$emit('input', event.target.value);
		}
	}
};
</script>

<style scoped>
.label {
	font-weight: 400;
	color: var(--color-text-primary);
}

.textarea {
	display: block;
	width: 100%;
	height: auto;
	border-radius: 0.5em;
	padding: 0.75em 1.125em;
	box-sizing: border-box;
	font-family: inherit;
	font-size: 1em;
	background: var(--color-background-secondary);
	border: 1px solid var(--color-background-primary);
	text-align: inherit;
	box-shadow: none;
	color: inherit;
	font-weight: inherit;
	background-clip: padding-box;
	line-height: inherit;
	resize: none;
	min-height: calc(0.813em * 2 + 2 * 1.25em + 2px); /* rows * line-height + padding-top + paddint-bottom + borders */
	overflow: auto;
}

.label.invalid .textarea {
	border: 1px solid var(--color-negative);
}

.textarea:focus {
	border-color: transparent;
	outline: none;
	box-shadow: 0 0 0 1px var(--focus-color);
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	color: var(--color-text-secondary);
	opacity: 1; /* Firefox */
	font-weight: 300;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
	color: var(--color-text-default);
	font-weight: 300;
}

::-ms-input-placeholder { /* Microsoft Edge */
	color: var(--color-text-default);
	font-weight: 300;
}

.textarea::-moz-focus-inner {
  border: 0;
  padding: 0;
}

.textarea.invisible {
	padding: 0.25em 0;
	border: 0;
	background: none;
	min-height: 1.2em;
	border-radius: 0;
}
</style>