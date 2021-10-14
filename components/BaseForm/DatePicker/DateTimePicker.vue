<template>
	<Label
		:valid="valid"
		:labelText="labelText"
		:smallLabelText="smallLabelText"
		:hideLabelText="hideLabelText"
		:errors="errors"
		:class="{ 'invalid': invalid }"
		class="label"
	>
		<slot />
		<input
			:min="formatDate(min)"
			:value="formatDate(editedValue)"
			:name="name"
			v-bind="$attrs"
			type="datetime-local"
			class="datetime-input"
			v-on="$listeners"
			@input="handleInput($event.target.value)"
		/>
	</Label>
</template>

<script>
import { Label } from '../Label';

export default {
	inheritAttrs: false,

	components: {
		Label
	},

	props: {
		min: {
			type: Date,
			default: null
		},

		value: {
			type: Date,
			default: null
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

		hideLabelText: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		invalid () {
			return this.valid === false;
		},

		editedValue: {
			get () {
				return this.$moment(this.value).format('YYYY-MM-DDTHH:mm');
			},

			set (status) {
				this.$emit('update:value', status);
			}
		}
	},

	methods: {
		handleInput (value) {
			this.editedValue = new Date(value);
		},

		formatDate (date) {
			return this.$moment(date).format('YYYY-MM-DDTHH:mm');
		}
	}
};
</script>

<style scoped>
.label {
	font-size: 1rem;
	display: inline-block;
	vertical-align: middle;
}

input[type="datetime-local"], input[type="date"] {
	display: block;
	width: 100%;
	font-size: inherit;
	appearance: none;
	-webkit-appearance: none;
	font-family: inherit;
	width: 100%;
	padding: 0.625em 0.75em;
	color: var(--color-text-primary);
	background: var(--color-background-primary);
	box-shadow: none;
	border: none;
	box-sizing: border-box;
	border-radius: 0.5em;
}

</style>