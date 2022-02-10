<template>
	<FormSubmit>
		<BaseForm class="table-wrapper">
			<Toolbar
				:title="title"
				:emojiIconName="emojiIconName"

				:filter.sync="filter"
				:fields="fields"

				:onBackClick="onBackClick"
				@apply-filter="applyFilter"
			/>

			<div class="overflow-wrapper">
				<Fade>
					<table v-if="!dataIsEmpty" class="table">
						<thead>
							<tr>
								<th
									v-for="field in fields"
									:key="field.name"
								>
									{{ field.title }}
								</th>

								<th>Действия</th>

								<th v-if="editedItems.length">
									Сохранить
								</th>
							</tr>
						</thead>

						<transition-group v-if="COLUMN_WIDTHS && editableData.length" tag="tbody" name="fade">
							<template v-for="rowData in editableData">
								<tr :key="rowData.id">
									<td
										v-for="field in fields"
										:key="field.id"

										:style="{ minWidth: COLUMN_WIDTHS[field.name] }"
									>
										<template
											v-if="[
												FIELD_TYPE.TEXT.NAME,
												FIELD_TYPE.TEL.NAME,
												FIELD_TYPE.EMAIL.NAME
											].includes(field.type)"
										>
											<Input
												v-if="field.editable"
												v-model="rowData[field.name]"
												:labelText="field.title"
												:type="field.type"
												:placeholder="field.title"
												:name="field.name"
												:maxLength="field.maxLength"
												:minLength="field.minLength"
												:required="field.required"
												class="input-label"
												hideLabelText
												invisible
											/>

											<template v-else>
												{{ rowData[field.name] }}
											</template>
										</template>

										<template
											v-if="FIELD_TYPE.NUMBER.NAME === field.type"
										>
											<Input
												v-if="field.editable"
												v-model.number="rowData[field.name]"
												:labelText="field.title"
												:type="field.type"
												:placeholder="field.title"
												:name="field.name"
												:max="field.max"
												:min="field.min"
												:required="field.required"
												class="input-label"
												hideLabelText
												invisible
											/>

											<template v-else>
												{{ rowData[field.name] }}
											</template>
										</template>

										<template v-if="FIELD_TYPE.SELECT.NAME === field.type">
											<Select
												v-if="field.editable"
												v-model="rowData[field.name]"
												class="select-label"
											>
												<Option
													v-for="option in field.options"
													:key="option.value"
													:value="option.value"
													:name="field.name"
												>
													<template v-if="option.emojiIconName">
														<EmojiIcon :name="option.emojiIconName" raw />
													</template>
													{{ option.text }}
												</Option>
											</Select>

											<template v-else>
												{{ field.options.find(option => option.value === rowData[field.name]).text }}
											</template>
										</template>

										<template v-if="FIELD_TYPE.DATETIME.NAME === field.type">
											<DateTimePicker
												v-if="field.editable"
												:labelText="field.title"
												:min="field.min"
												:max="field.max"
												class="datetime"
												:name="field.name"
												:value.sync="rowData[field.name]"
												@value="setDate"
											/>

											<CalendarDate v-else :date="rowData[field.name]" class="date-label" />
										</template>
									</td>

									<td class="actions">
										<ButtonsRow class="actions-row">
											<DeleteButton
												class="action"
												title="Удалить"
												collapsed
												@click="deleteItem(rowData)"
											/>

											<Fragment v-for="action in actions" :key="action.title">
												<Button
													v-if="action.type === ACTION_TYPE.LINK"
													:href="action.href(rowData)"
													iconName="arrow-top-right"
													iconPosition="after"
													rel="noopener noreferrer"
													target="_blank"
													class="action"
													:title="action.title"
												/>

												<Button
													v-if="action.type === ACTION_TYPE.ROUTER_LINK"
													:link="action.link(rowData)"
													iconName="arrow-top-right"
													iconPosition="after"
													class="action"
													:title="action.title"
												/>
											</Fragment>
										</ButtonsRow>
									</td>

									<Fade>
										<td v-if="editedItems.includes(rowData.id)" class="submit-cell">
											<SubmitButton
												class="submit-button"
												title="Сохранить"
												@click="editItem(rowData)"
											/>
										</td>
									</Fade>
								</tr>
							</template>
						</transition-group>

						<tfoot>
							<LoadingRow :state="dataLoading" />
							<VisibilityObserverRow v-if="!dataLoading" :callback="tableEndRiched" />
						</tfoot>
					</table>

					<Skeleton v-else class="preloader">
						<h4>No items found</h4>
					</Skeleton>
				</Fade>
			</div>
		</BaseForm>
	</FormSubmit>
</template>

<script>
import FIELD_TYPE from './field-type';
import ACTION_TYPE from './action-type';
import Toolbar from './Toolbar';
import LoadingRow from './LoadingRow';
import VisibilityObserverRow from './VisibilityObserverRow';

import { EmojiIcon } from '~/components/Icon';
import { Skeleton } from '~/components/Loading';
import { Fragment } from '~/components/ControlFlow';
import {
	Button,
	DeleteButton,
	ButtonsRow
} from '~/components/buttons';
import { CalendarDate } from '~/components/Date';
import {
	FormSubmit,
	Input,
	Select,
	Option,
	SubmitButton,
	BaseForm
} from '~/components/BaseForm';
import { Fade } from '~/components/animation';

export default {
	components: {
		EmojiIcon,
		Toolbar,
		Button,
		VisibilityObserverRow,
		Fragment,
		LoadingRow,
		Skeleton,
		Fade,
		CalendarDate,
		DeleteButton,
		FormSubmit,
		Input,
		Select,
		Option,
		ButtonsRow,
		SubmitButton,
		BaseForm
	},

	props: {
		data: {
			type: Array,
			required: true
		},

		title: {
			type: String,
			default: null
		},

		emojiIconName: {
			type: String,
			default: null
		},

		onEdit: {
			type: Function,
			default: () => {}
		},

		onDelete: {
			type: Function,
			default: () => {}
		},

		onBackClick: {
			type: Function,
			default: null
		},

		onGetMoreItems: {
			type: Function,
			default: () => {}
		},

		fields: {
			type: Array,
			required: true
		},

		actions: {
			type: Array,
			default: () => []
		},

		filter: {
			type: Array,
			default: () => []
		},

		dataLoading: {
			type: Boolean,
			default: false
		}
	},

	data () {
		return {
			FIELD_TYPE,
			ACTION_TYPE,

			COLUMN_WIDTHS: null,
			editedItems: [],
			editableDataWatchers: []
		};
	},

	computed: {
		editableData: {
			get () {
				return this.data;
			},
			set (value) {
				this.$emit('update:data', value);
			}
		},

		editableDataLikeObject () {
			if (!this.editableData.length) return;

			return this.editableData.reduce((accumulator, cur) => {
				accumulator[cur.id] = cur;
				return accumulator;
			}, {});
		},

		dataIsEmpty () {
			return !this.dataLoading && !this.editableData.length;
		}
	},

	watch: {
		editableData (newVal, oldVal) {
			if (newVal.length && !oldVal.length) {
				this.initializeTable();
			}
			else {
				this.editedItems = [];
				for (let unwatch of this.editableDataWatchers) {
					unwatch();
				}
			}
		}
	},

	mounted () {
		this.initializeTable();
	},

	methods: {
		initializeTable () {
			if (this.editableData.length) {
				this.setColumnWidths();
				this.watchDataEdit();
			}
		},

		watchDataEdit () {
			for (let [itemIndex, item] of this.editableData.entries()) {
				this.editableDataWatchers[itemIndex] = this.$watch(`editableDataLikeObject.${item.id}`, this.showSubmitButton, { deep: true });
			}
		},

		setColumnWidths () {
			this.COLUMN_WIDTHS = {};

			for (let field of this.fields) {
				let editableData = [...this.editableData];
				let DATA_ITEM_WITH_LONGEST_FIELD_LENGTH = editableData.sort((left, right) =>
					String(right[field.name]).length - String(left[field.name]).length)[0];

				const FIELD_VALUE = DATA_ITEM_WITH_LONGEST_FIELD_LENGTH[field.name];

				const PRIMITIVE_TYPES = [
					FIELD_TYPE.TEXT.NAME,
					FIELD_TYPE.TEL.NAME,
					FIELD_TYPE.EMAIL.NAME,
					FIELD_TYPE.NUMBER.NAME,
					FIELD_TYPE.SELECT.NAME
				];

				if (PRIMITIVE_TYPES.includes(field.type) && FIELD_VALUE) {
					const FIELD_LENGTH = String(FIELD_VALUE).length;

					this.COLUMN_WIDTHS[field.name] = `${FIELD_LENGTH}em`;
				}
			}
		},

		editItem (rowData) {
			let editConfirmation = window.confirm('Are you sure you want to edit?');

			if (editConfirmation) {
				this.editedItems = this.editedItems.filter(item => item !== rowData.id);

				this.$notify({
					group: 'all',
					title: 'Item was edited',
					type: 'success'
				});
				return this.onEdit(rowData);
			}
		},

		deleteItem (rowData) {
			let deleteConfirmation = window.confirm('Are you sure you want to delete?');

			if (deleteConfirmation) {
				this.$notify({
					group: 'all',
					title: 'Item was deleted',
					type: 'success'
				});
				return this.onDelete(rowData);
			}
		},

		showSubmitButton (item) {
			const BUTTON_NOT_SHOWN = !this.editedItems.includes(item.id);

			if (item && BUTTON_NOT_SHOWN) {
				this.editedItems.push(item.id);
			}
		},

		tableEndRiched () {
			this.onGetMoreItems();
		},

		applyFilter () {
			this.$emit('on-apply-filter');
		}
	}
};
</script>

<style scoped>
.table-wrapper {
	display: block;
}

.overflow-wrapper {
	display: block;
	width: 100%;
	overflow: auto;
	max-height: 70vh;
}

.table {
	border-spacing: 0;
	border: 0;
	margin: 0;
	padding: 0;
	position: relative;
	background: none;
	cursor: default;
	height: 1px;
	font-size: 1em;
	border-collapse: collapse;
}

th, td {
	vertical-align: middle;
	font-size: 0.875em;
	padding: 0.75em 1em;
	white-space: nowrap;
	text-align: left;
	border: 1px solid var(--color-background-secondary);
	background: var(--color-background-default);
	word-wrap: break-word;
}

th {
	font-weight: inherit;
	color: var(--color-text-secondary);
	position: sticky;
	top: 0;
	z-index: 1;
}

th + th, td + td, td:first-child, th:first-child {
	border-left: 0;
	border-right: 0;
}

td:last-child, th:last-child {
	border-right: 0;
}

tr + tr td, tr:first-child td {
	border-top: 0;
}

.input-label, .select-label {
	margin-bottom: 0;
	width: auto;
}

.select-label ::v-deep select {
	padding-top: 0.25em;
	padding-bottom: 0.25em;
}

.actions-row {
	padding-top: 0;
	font-size: 0.875em;
}

.action {
	font-size: 1em;
}

.submit-cell {
	position: sticky;
	right: 0;
	background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, var(--color-background-default) 100%);
}

.preloader {
	min-height: 8em;
}

.fade-up-enter-active {
  animation: fade-up .5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>