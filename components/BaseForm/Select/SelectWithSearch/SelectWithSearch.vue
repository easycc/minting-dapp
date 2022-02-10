<template>
	<Select
		:title="title"
		v-bind="$attrs"
		:name="name"
		v-on="$listeners"
	>
		<Input
			v-model.trim="editableSearchValue"
			:placeholder="placeholder ? placeholder : $t('components.form.selectWithSearch.fallbackTitle')"
			name="selectWithSerachInput"
			class="search-input"
			:maxLength="100"
			autocomplete="off"
			iconName="search"
			autofocus
		/>
	</Select>
</template>

<script>
import Select from '../Select/SelectWithNativeValidation';
import Input from '../../Input/Input';

export default {
	inheritAttrs: false,
	components: {
		Select,
		Input
	},

	props: {
		title: {
			type: String,
			default: ''
		},

		searchValue: {
			type: String,
			default: ''
		},

		name: {
			type: String,
			required: true
		},

		placeholder: {
			type: [String, Number],
			default: undefined
		}
	},

	computed: {
		editableSearchValue: {
			get () {
				return this.searchValue;
			},
			set (value) {
				this.$emit('update:searchValue', value);
			}
		}
	}
};
</script>

<style scoped>
.search-input {
	display: block;
	width: 100%;
	margin-bottom: 0.5em;
	padding-left: 0.5em;
	padding-right: 0.5em;
}
</style>