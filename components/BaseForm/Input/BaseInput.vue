<template>
	<Label
		:valid="valid"
		:labelText="labelText"
		:smallLabelText="smallLabelText"
		:errors="errors"
		:required="required"
		:hideLabelText="hideLabelText"
		:class="{ 'invalid': invalid }"
		class="label"
		:tip="tip"
	>
		<template v-slot:labelText>
			<slot />
		</template>

		<slot name="beforeInput" />

		<div class="input-wrapper">
			<Icon v-if="iconName" :name="iconName" class="input-icon" />

			<input
				ref="input"
				v-model="innerValue"
				:inputmode="inputmode"
				class="input"
				:size="size"
				:class="{ 'invisible': invisible, 'input-with-icon': iconName }"
				v-bind="$attrs"
				:disabled="disabled"
				:name="name"
				:placeholder="placeholder"
				:type="type"
				:autocomplete="autocomplete"
				@blur="onBlur"
				@focus="onFocus"
			/>
		</div>

		<slot name="afterInput" />
	</Label>
</template>

<script>
import { Label } from '../Label';

import { Icon } from '~/components/Icon';

export default {
	inheritAttrs: false,

	components: {
		Icon,
		Label
	},

	props: {
		iconName: {
			type: String,
			default: null
		},
		inputmode: {
			type: String,
			default: undefined
		},
		required: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: undefined
		},
		tip: {
			type: String,
			default: undefined
		},
		value: {
			type: null,
			default: undefined
		},
		labelText: {
			type: String,
			default: undefined
		},
		size: {
			type: Number,
			default: undefined
		},
		smallLabelText: {
			default: '',
			type: String
		},
		invisible: {
			type: Boolean,
			default: false
		},
		hideLabelText: {
			type: Boolean,
			default: false
		},
		autocomplete: {
			type: String,
			default: undefined
		},
		autofocus: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			required: true
		},
		valid: {
			type: Boolean,
			default: undefined
		},
		errors: {
			type: Array,
			default: () => []
		},
		disabled: {
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
		labelTextExist () {
			return this.$slots.default || this.labelText;
		},

		invalid () {
			return this.valid === false;
		}
	},

	watch: {
		innerValue (newValue) {
			this.$emit('input', newValue);
		},

		value (newValue) {
			this.innerValue = newValue;
		}
	},

	mounted () {
		if (this.autofocus) {
			const RENDER_DELAY = 500;

			setTimeout(() => {
				this.$refs.input.focus();
			}, RENDER_DELAY);
		}
	},

	methods: {
		onFocus () {
			this.$emit('focus');
		},
		onBlur (event) {
			this.$emit('blur', event.target.value);
		}
	}
};
</script>

<style scoped>
.label {
	color: var(--color-text-primary);
}

.input-wrapper {
	position: relative;
	display: block;
	width: 100%;
}

.input {
	display: block;
	width: 100%;
	height: auto;
	border-radius: 0.5em;
	padding: 0.75em 1.125em;
	box-sizing: border-box;
	font-family: inherit;
	text-align: inherit;
	font-size: 1em;
	background: var(--color-background-secondary);
	border: 1px solid var(--color-background-primary);
	box-shadow: none;
	color: inherit;
	font-weight: inherit;
	background-clip: padding-box;
	transition: border var(--smooth-animation);
	text-overflow: ellipsis;
	overflow: hidden;
}

.input-with-icon {
	padding-left: 2.5em;
}

.input-icon {
	position: absolute;
	left: 1em;
	top: 50%;
	font-size: 1em;
	transform: translate(0, -50%);
	color: inherit;
	opacity: 0.5;
}

.label.invalid .input {
	border: 1px solid var(--color-negative);
}

.input:focus {
	border-color: transparent;
	outline: none;
	box-shadow: 0 0 0 1px var(--focus-color);
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	color: var(--color-text-secondary);
	opacity: 1; /* Firefox */

}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
	color: var(--color-text-default);

}

::-ms-input-placeholder { /* Microsoft Edge */
	color: var(--color-text-default);

}

input::-moz-focus-inner {
	border: 0;
	padding: 0;
}

input:-webkit-autofill {
	-webkit-box-shadow: inset 0 0 0 50px var(--color-background-secondary) !important;
	-webkit-text-fill-color: var(--color-text-primary);
}

.input.invisible {
	padding: 0.25em 0;
	border: 0;
	background: none;
	border-radius: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>