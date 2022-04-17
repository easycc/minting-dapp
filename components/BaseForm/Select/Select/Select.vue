<template>
	<Props class="select">
		<Tooltip
			ref="tooltip"
			:title="title"
		>
			<template v-slot:trigger>
				<Label
					class="label"
					:labelText="labelText"
					:smallLabelText="smallLabelText"
					:valid="valid"
					:errors="errors"
					@click="handleLabelClick"
				>
					<Button
						iconName="chevron-bottom"
						class="select-button"
						:class="{ invalid }"
						iconPosition="after"
						:title="triggerTitle"
					/>
				</Label>
			</template>

			<slot v-if="$slots.default" />

			<Fade>
				<Skeleton v-if="loading" showSpinner />

				<ul v-else class="options-list">
					<li v-for="option in options" :key="option.value" class="option-item">
						<Button
							:class="['option-button', { 'option-button-selected': selected(option.value) }]"
							:emojiIconName="option.emojiIconName"
							:iconName="selected(option.value) ? 'check-mark-rounded' : option.iconName"
							:link="option.link"
							@click="handleSelect(option)"
						>
							{{ option.title }}
							<small
								v-if="option.subtitle"
								class="option-subtitle"
							>{{ option.subtitle }}</small>
						</Button>
					</li>
				</ul>
			</Fade>
		</Tooltip>
	</Props>
</template>

<script>
import { Label } from '../../Label';

import { Props } from '~/components/ControlFlow';
import { Button } from '~/components/buttons';
import { Tooltip } from '~/components/Flyout';
import { Skeleton } from '~/components/Loading';
import { Fade } from '~/components/animation';
import noop from '~/utils/noop';

export default {
	inheritAttrs: false,

	components: {
		Props,
		Label,
		Button,
		Fade,
		Skeleton,
		Tooltip
	},

	props: {
		value: {
			type: [String, Number, Array],
			default: undefined
		},

		multiple: {
			type: Boolean,
			default: false
		},

		title: {
			default: '',
			type: String
		},

		valid: {
			type: Boolean,
			default: undefined
		},

		hideOnSelect: {
			type: Boolean,
			default: true
		},

		errors: {
			type: Array,
			default: () => []
		},

		name: {
			type: String,
			required: true
		},

		onOptionSelect: {
			type: Function,
			default: noop
		},

		labelText: {
			default: '',
			type: String
		},

		smallLabelText: {
			default: '',
			type: String
		},

		loading: {
			default: false,
			type: Boolean
		},

		options: {
			type: Array,
			default: () => []
		}
	},

	data () {
		return {
			noop
		};
	},

	computed: {
		editableValue: {
			get () {
				return this.value;
			},
			set (value) {
				this.$emit('update:value', value);
			}
		},

		invalid () {
			return this.valid === false;
		},

		triggerTitle () {
			let { value, title, multiple } = this;

			if (multiple && value && value.length) {
				return value.join(', ');
			}

			if (!multiple && value) {
				return value;
			}

			if (title) {
				return title;
			}

			return 'Search';
		}
	},

	watch: {
		value (newVal) {
			this.$emit('input', newVal);
		}
	},

	methods: {
		handleSelect (option) {
			let { editableValue, multiple } = this;

			if (multiple) {
				let alreadyExist = editableValue.includes(option.value);

				if (alreadyExist) {
					this.editableValue = editableValue.filter(existOption => existOption !== option.value);
				}
				else {
					editableValue.push(option.value);
				}
			}
			else {
				this.editableValue = option.value;
			}

			// legacy fix
			this.onOptionSelect(option);

			if (this.hideOnSelect) {
				this.$refs.tooltip.$children[0].hide();
			}
		},

		selected (optionValue) {
			let { editableValue, multiple } = this;

			return multiple ? editableValue.includes(optionValue) : editableValue === optionValue;
		},

		handleLabelClick (event) {
			event.preventDefault();
		}
	}
};
</script>

<style scoped>
.select {
	width: auto;
}

.select-button {
	display: block;
	text-align: inherit;
	width: 100%;
	color: var(--color-text-default);
	padding-top: 0.666em;
	padding-bottom: 0.666em;
}

.select-button.invalid {
	border: 1px solid var(--color-negative);
}

.select-button ::v-deep .button-content {
	justify-content: space-between;
	display: flex;
	align-items: center;
}

.options-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.option-item {
	display: block;
	width: 100%;
	padding: 0;
	margin: 0 auto;
}

.option-item:last-child {
	border-bottom: 0;
}

.option-button {
	display: block;
	width: 100%;
	text-align: left;
	background-color: transparent;
	box-shadow: none;
	padding-top: 0.5em;
	padding-bottom: 0.5em;
	border-radius: 0;
}

@media screen and (max-width: 576px) {
	.option-button {
		padding-top: 0.75em;
		padding-bottom: 0.75em;
	}
}

.option-button-selected {
	color: var(--color-compliment-secondary);
}

.option-button:hover {
	background-color: var(--color-background-primary);
}

.option-subtitle {
	display: block;
	width: 100%;
	color: var(--color-text-secondary);
	padding: 0.25em 0 0;
	font-size: 1em;
	font-weight: 400;
}
</style>