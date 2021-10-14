<template>
	<Label
		:valid="valid"
		:errors="errors"
		:labelText="labelText"
		labelTextPosition="after"
		class="label"
	>
		<span class="input-type-checkbox">
			<input
				v-model="innerValue"
				:disabled="disabled"
				:name="name"
				type="checkbox"
				class="checkbox"
				@focus="handleFocus"
				@blur="handleBlur"
			/>

			<span class="check-mark" />
		</span>
		<slot />
	</label>
</template>

<script>
import { Label } from '../Label';

export default {
	name: 'Checkbox',
	inheritAttrs: false,
	components: {
		Label
	},
	props: {
		name: {
			type: String,
			default: ''
		},
		labelText: {
			type: String,
			default: undefined
		},
		value: {
			type: Boolean,
			default: false
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

	watch: {
		innerValue (newValue) {
			this.$emit('input', newValue);
		},

		value (newValue) {
			this.innerValue = newValue;
		}
	},

	methods: {
		handleFocus () {
			this.$emit('focus');
		},

		handleBlur () {
			this.$emit('blur');
		}
	}
};
</script>

<style scoped>
.label ::v-deep .label-text {
	display: inline-block;
	vertical-align: middle;
	margin-bottom: 0;
	color: var(--color-text-default);
}

.input-type-checkbox {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  width: 1em;
  height: 1em;
  font-size: 1.125em;
	margin-right: 0.1em;
  border-radius: 0.222em;
}

.checkbox {
  display: block;
  width: 100%;
  height: 100%;
  line-height: normal;
  font-size: 1em;
  font-size: 1em;
  border-radius: 0;
  padding: 0;
  margin: 0;
  border: none;
  box-shadow: none;
  background: none;
  position: relative;
  -webkit-appearance: none;
  opacity: 0;
  z-index: 1;
}

.input-type-checkbox > .check-mark {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 0;
	background-image: none, linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.28) 100%);
	background-repeat: no-repeat;
	background-position: center;
  background-size: 0.55em auto, auto;
  border-radius: inherit;
	box-shadow:
		0 0 1px 0 rgba(0,0,0,0.40),
		0 0 1px 0 rgba(0,0,0,0.20),
		inset 0 1px 0 0 rgba(255,255,255,0.25),
		inset 0 2px 0 0 rgba(255,255,255,0.06);
}

.checkbox:checked + .check-mark {
  background-image:
		url(./images/icon_checked.svg),
		linear-gradient(180deg, var(--color-compliment-secondary) 0%, var(--color-compliment-primary) 100%);
}

.checkbox:focus + .check-mark {
  outline: 2px solid rgba(131,192,253,.5);
  outline-offset: 1px;
}

.checkbox:focus:hover + .check-mark {
  outline: transparent;
}

.checkbox[disabled] + .check-mark {
  opacity: 0.7;
}

.checkbox[disabled]:checked + .check-mark {
  background-image:
		url(./images/icon_checked-disabled.svg),
		linear-gradient(180deg, var(--color-compliment-secondary) 0%, var(--color-compliment-primary) 100%);
  background-size: 0.45em auto, 100%;
}
</style>