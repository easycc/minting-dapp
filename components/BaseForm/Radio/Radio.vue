<template>
	<Label
		:labelText="labelText"
		:smallLabelText="smallLabelText"
		labelTextPosition="after"
		class="label"
		:class="{ disabled }"
	>
		<span class="input-type-radio">
			<input
				:class="className"
				:value="radioValue"
				:checked="checked"
				:name="name"
				:disabled="disabled"
				:required="required"
				type="radio"
				class="radio"
				v-on="listeners"
			/>
			<span class="check-mark" />
		</span>

		<EmojiIcon v-if="emojiIconName" :name="emojiIconName" class="radio-icon" />

		<slot />
	</Label>
</template>

<script>
import { Label } from '../Label';

import { EmojiIcon } from '~/components/Icon';

export default {
	inheritAttrs: false,
	components: {
		Label,
		EmojiIcon
	},

	props: {
		radioValue: {
			type: [String, Number],
			required: true
		},
		labelText: {
			default: '',
			type: String
		},
		checked: {
			default: false,
			type: Boolean
		},
		smallLabelText: {
			default: '',
			type: String
		},
		disabled: {
			default: false,
			type: Boolean
		},
		name: {
			type: String,
			required: true
		},
		required: {
			type: Boolean,
			default: undefined
		},
		className: {
			type: String,
			default: null
		},
		emojiIconName: {
			type: String,
			default: null
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
	display: block;
	width: 100%;
	margin-bottom: 0.33em;
}

.label.disabled {
	text-decoration: line-through;
	color: var(--color-text-secondary);
}

.label ::v-deep .label-text {
	display: inline-block;
	vertical-align: middle;
	margin-bottom: 0;
	color: var(--color-text-default);
}

.input-type-radio {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: text-bottom;
  width: 1em;
  height: 1em;
  font-size: 1.125em;
	margin-right: 0.1em;
  border-radius: 50%;

	--border-size: 0.0625em;
}

.radio {
  display: block;
  width: 100%;
  height: 100%;
  line-height: normal;
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

.check-mark {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
	transform: translate(-50%, -50%);
  display: block;
  width: calc(100% - 2 * var(--border-size));
  height: calc(100% - 2 * var(--border-size));
  z-index: 0;
	background-image: none, linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.28) 100%);
	background-repeat: no-repeat;
	background-position: center;
  background-size: 0.333em auto, 100%;
  border-radius: inherit;
	box-shadow: 0 0 0 var(--border-size) rgb(0, 0, 0, 0.1), 0 0.0625em 0.125em 0 rgb(0, 0, 0, 0.1);
}

.radio:checked + .check-mark {
	background-image:
		url(./images/icon_checked.svg),
		linear-gradient(180deg, var(--color-compliment-secondary) 0%, var(--color-compliment-primary) 100%);

	box-shadow: none;
	border: none;
  width: 100%;
  height: 100%;
}

.radio:focus + .check-mark {
  outline: 2px solid rgba(131,192,253,.5);
  outline-offset: 1px;
}

.radio:focus:hover + .check-mark {
  outline: transparent;
}

.radio[disabled] + .check-mark {
	opacity: 0.7;
}

.radio[disabled]:checked + .check-mark {
  background-image:
		url(./images/icon_checked-disabled.svg),
		linear-gradient(180deg, var(--color-compliment-secondary) 0%, var(--color-compliment-primary) 100%);
  background-size: 0.45em auto, 100%;
}

.radio-icon {
	font-size: 1.25em;
	display: inline-block;
	vertical-align: text-bottom;
}
</style>