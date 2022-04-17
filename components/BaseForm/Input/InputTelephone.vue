<template>
	<div class="tel-input-wrapper">
		<Input
			v-model="editableValue"
			v-bind="$attrs"
			type="text"
			name="telInput"
			placeholder="67 722 77 07"
			inputmode="tel"
			required
			autocomplete="off"
			class="tel-code-input"
			:labelText="labelText"
			:minLength="9"
			:maxLength="9"
			v-on="$listeners"
		/>

		<SelectWithSearch
			:value.sync="choosedTelCode"
			name="telCodeSelect"
			class="tel-code-select"
			placeholder="+380"
			:options="telCodes"
		/>
	</div>
</template>

<script>

import SelectWithSearch from '../Select/SelectWithSearch/SelectWithSearch';
import Input from './Input';

export default {
	inheritAttrs: false,

	components: {
		SelectWithSearch,
		Input
	},

	props: {
		labelText: {
			type: String,
			default: undefined
		},
		value: {
			type: String,
			required: true
		}
	},

	data () {
		return {
			telCodes: [
				{
					title: 'Україна +380',
					value: '+380'
				}
			],

			choosedTelCode: '+380'
		};
	},

	computed: {
		editableValue: {
			get () {
				return this.value.substring(this.choosedTelCode.length);
			},
			set (value) {
				let { choosedTelCode } = this;
				// let removeMask = value.replace(/\s/g, "");
				let addTelCode = `${choosedTelCode}${value}`;

				// this.$emit('update:value', value);
				this.$emit('update:value', addTelCode);
			}
		}
	}
};
</script>

<style scoped>
.tel-input-wrapper {
	position: relative;
}

.tel-code-select {
	width: auto;
	display: inline-block;
	position: absolute;
	left: 1px;
	top: 1.666em;
}

.tel-code-select ::v-deep .label {
	margin-bottom: 0;
}

.tel-code-input ::v-deep .input {
	padding-left: 7em;
}

.tel-code-select ::v-deep .button {
	border-radius: 0.425em;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	padding: 0.575em 0.75em;
}

.tel-code-select ::v-deep .button .icon {
	margin-left: 0.5em;
}

.tel-code-select ::v-deep .label-text {
	width: 100%;
	display: block;
}

/* .tel-label ::v-deep .input {
	border-bottom-left-radius: 0;
	border-top-left-radius: 0;
} */
</style>