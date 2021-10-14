<template>
	<DefaultModal class="filter-dropdown" title="Filter" @close="onClose">
		<ul
			v-for="(filterField, filterIndex) in editableFilter"
			:key="filterField.name + filterField.condition"
			class="filters-list"
		>
			<li class="filter-item">
				<Select
					v-model="filterField.name"
					class="filter-field"
				>
					<Option
						v-for="availableField in fields"
						:key="availableField.name"
						:value="availableField.name"
						:name="availableField.name"
					>
						{{ availableField.title }}
					</Option>
				</Select>

				<Select
					v-model="filterField.condition"
					class="filter-condition"
				>
					<Option
						v-for="field in availableFieldFilters(filterField.name)"
						:key="field.NAME"
						:value="field.NAME"
						:name="field.NAME"
					>
						{{ field.TITLE }}
					</Option>
				</Select>

				<Input
					v-if="[
						FIELD_TYPE.TEXT.NAME,
						FIELD_TYPE.TEL.NAME,
						FIELD_TYPE.EMAIL.NAME
					].includes(fieldDataByName(filterField.name).type)"

					v-model.trim="filterField.value"
					:type="fieldDataByName(filterField.name).type"
					:placeholder="fieldDataByName(filterField.name).title"
					:name="fieldDataByName(filterField.name).name"
					:max="fieldDataByName(filterField.name).max"
					:min="fieldDataByName(filterField.name).min"
					:maxLength="fieldDataByName(filterField.name).maxLength"
					:minLength="fieldDataByName(filterField.name).minLength"
					:required="true"
					class="filter-value"
				/>

				<DateTimePicker
					v-if="[
						FIELD_TYPE.DATETIME.NAME
					].includes(fieldDataByName(filterField.name).type)"

					:max="new Date()"
					:name="fieldDataByName(filterField.name).name"
					:value.sync="filterField.value"
					class="filter-value"
				/>

				<Select
					v-if="[
						FIELD_TYPE.SELECT.NAME
					].includes(fieldDataByName(filterField.name).type)"
					v-model="filterField.value"
					class="filter-value"
				>
					<Option
						v-for="field in availableFieldOptions(filterField.name)"
						:key="field.value"
						:value="field.value"
						:name="field.value"
					>
						<template v-if="field.emojiIconName">
							<EmojiIcon :name="field.emojiIconName" raw />
						</template>
						{{ field.text }}
					</Option>
				</Select>

				<DeleteButton
					class="delete-button"
					title="Delete"
					collapsed
					@click="deleteFilter(filterIndex)"
				/>
			</li>
		</ul>

		<Button title="Add filter" @click="addFilter" />
	</DefaultModal>
</template>

<script>
import FIELD_TYPE from './field-type';
import FIELD_FILTER from './field-filter';

import { EmojiIcon } from '~/components/Icon';
import { Button, DeleteButton } from '~/components/buttons';
import { DefaultModal } from '~/components/modals';
import {
	Select,
	Input,
	Option,
	DateTimePicker
} from '~/components/BaseForm';

export default {
	components: {
		Button,
		EmojiIcon,
		Input,
		Select,
		Option,
		DeleteButton,
		DefaultModal,
		DateTimePicker
	},

	props: {
		filter: {
			type: Array,
			required: true
		},

		fields: {
			type: Array,
			required: true
		}
	},

	data () {
		return {
			FIELD_TYPE,
			FIELD_FILTER
		};
	},

	computed: {
		editableFilter: {
			get () {
				return this.filter;
			},
			set (value) {
				this.$emit('update:filter', value);
			}
		}
	},

	methods: {
		onClose () {
			this.$emit('close');
		},

		fieldDataByName (fieldName) {
			return this.fields.find(field => fieldName === field.name);
		},

		availableFieldOptions (fieldName) {
			let FIELD = this.fields.find(field => fieldName === field.name);

			return FIELD.options;
		},

		availableFieldFilters (fieldName) {
			let FIELD = this.fields.find(field => fieldName === field.name);
			const FIELD_TYPE = FIELD.type;

			let availableFieldFilters = Object.values(this.FIELD_TYPE).find(fieldType => fieldType.NAME === FIELD_TYPE).FILTERS;

			return availableFieldFilters;
		},

		addFilter () {
			const DEFAULT_FIELD = {
				name: this.fields[0].name,
				condition: this.availableFieldFilters(this.fields[0].name)[0].NAME,
				value: null
			};

			this.editableFilter.push(DEFAULT_FIELD);
		},

		deleteFilter (index) {
			this.editableFilter.splice(index, 1);
		}
	}
};
</script>

<style scoped>
.filters-list {
	display: block;
	width: 100%;
	margin: 0;
}

.filter-item {
	margin-bottom: 1em;
	padding-bottom: 1em;
	width: 100%;
	font-size: 0.875em;
	border-bottom: 1px solid var(--color-background-secondary);
}

.filter-field, .filter-condition, .filter-value {
	font-size: 1em;
	margin-right: 0.5em;
	margin-bottom: 0.5em;
	display: inline-block;
	vertical-align: top;
	width: auto;
}

.filter-field {
	max-width: 6em;
	width: 100%;
}

.filter-condition {
	max-width: 6em;
	width: 100%;
}

.filter-value {
	max-width: 12em;
	width: 100%;
}

.delete-button {
	min-width: 2.75em;
	font-size: 1em;
	margin-left: auto;
	float: right;
}

@media screen and (max-width: 576px) {
	.filter-field, .filter-condition, .filter-value {
		display: block;
		width: 100%;
		max-width: initial;
	}

	.delete-button {
		float: initial;
	}
}
</style>