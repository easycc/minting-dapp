<template>
	<aside class="toolbar">
		<nav class="top-navigation">
			<BackButton
				v-if="onBackClick"
				class="back-button"
				@click="onButtonClick"
			/>

			<div class="title-wrapper">
				<EmojiIcon :name="emojiIconName" class="table-emoji-icon" />
				<h2 v-if="title" class="table-title">
					{{ title }}
				</h2>
			</div>
		</nav>

		<ButtonsRow class="buttons-row">
			<Button
				title="Reload"
				iconName="arrow-rounded"
				collapsed
				@click="applyFilter"
			/>

			<Button
				class="settings-button"
				iconName="filter"
				collapsed
				@click="toggleToolbarDropdown"
			/>
		</ButtonsRow>

		<FilterDropdown
			v-if="showToolbarDropdown"
			:filter.sync="editableFilter"
			:fields="fields"
			@close="toggleToolbarDropdown"
		/>
	</aside>
</template>

<script>
import FilterDropdown from './FilterDropdown';

import { EmojiIcon } from '~/components/Icon';
import { ButtonsRow, BackButton, Button } from '~/components/buttons';

export default {
	components: {
		Button,
		BackButton,
		EmojiIcon,
		ButtonsRow,
		FilterDropdown
	},

	props: {
		filter: {
			type: Array,
			required: true
		},

		emojiIconName: {
			type: String,
			default: null
		},

		title: {
			type: String,
			default: null
		},

		fields: {
			type: Array,
			required: true
		},

		onBackClick: {
			type: Function,
			required: true
		}
	},

	data () {
		return {
			searchTimeout: null,
			showToolbarDropdown: false
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

	watch: {
		showToolbarDropdown () {
			if (!this.showToolbarDropdown) {
				this.applyFilter();
			}
		}
	},

	methods: {
		applyFilter () {
			this.$emit('apply-filter');
		},

		onButtonClick () {
			if (this.onBackClick) {
				this.onBackClick();
			}
		},

		toggleToolbarDropdown () {
			this.showToolbarDropdown = !this.showToolbarDropdown;
		}
	}
};
</script>

<style scoped>
.toolbar {
	width: 100%;
	padding-bottom: 1em;
	padding-top: 0.25em;
}

.top-navigation {
	display: block;
	width: 100%;
	margin-right: 1em;
}

.buttons-row {
	padding: 0;
	font-size: 1em;
	width: auto;
	display: inline-block;
	vertical-align: bottom;
	margin-left: auto;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	flex-wrap: wrap;
}

.back-button {
	margin-bottom: 0.5em;
}

.title-wrapper {
	display: flex;
	margin-bottom: 1.5em;
}

.table-title {
	font-size: 1.25em;
	font-weight: 400;
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.table-emoji-icon {
	font-size: 1.5em;
	margin-right: 0.25em;
	vertical-align: text-bottom;
	display: inline-block;
}
</style>