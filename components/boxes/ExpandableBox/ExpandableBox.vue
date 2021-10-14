<template>
	<ThemeContextConsumer v-slot="{ light }">
		<component
			:is="tag"
			class="expandable-box"
			:class="{ 'draggable': dragIcon, light }"
		>
			<div class="visual-part">
				<slot />
				<span v-if="title" class="box-title">{{ title }}</span>

				<DropdownButton v-if="showDropdownButton" collapsed class="expand-button" @click="toggleExpandablePart" />
				<Icon v-if="dragIcon" name="drag" class="drag-icon" />
			</div>

			<FadeUp>
				<div v-show="expanded && expandablePart" class="expandable-part">
					<slot name="expandable" />
				</div>
			</FadeUp>

			<div v-if="footer" class="box-footer">
				<slot name="footer" />
			</div>
		</component>
	</ThemeContextConsumer>
</template>

<script>
import { FadeUp } from '~/components/animation';
import { DropdownButton } from '~/components/buttons';
import { Icon } from '~/components/Icon';

export default {
	components: {
		FadeUp,
		Icon,
		DropdownButton
	},

	props: {
		tag: {
			type: String,
			default: 'div'
		},

		dragIcon: {
			type: Boolean,
			default: false
		},

		expandInitially: {
			type: Boolean,
			default: false
		},

		title: {
			type: String,
			default: null
		}
	},

	data () {
		return {
			expanded: false
		};
	},

	computed: {
		expandablePart () {
			return this.$slots.expandable;
		},
		showDropdownButton () {
			return this.expandablePart || this.$slots.default;
		},
		footer () {
			return this.$slots.footer;
		}
	},

	watch: {
		expanded () {
			this.$emit('change', this.expanded);
		}
	},

	mounted () {
		if (this.expandInitially) {
			this.toggleExpandablePart();
		}
	},

	methods: {
		toggleExpandablePart () {
			this.expanded = !this.expanded;
		}
	}
};
</script>

<style scoped>
.expandable-box {
	display: block;
	width: 100%;
	margin: 0;
	border-radius: 0.8em;
	margin: 0 auto 1em;
	background-color: var(--color-background-secondary);
}

.light {
	background-color: var(--color-background-default);
}

.visual-part {
	padding: 1em;
	background-color: var(--color-background-secondary);
	border-radius: inherit;
	min-height: 4em;
	position: relative;
}

.light .visual-part {
	background-color: var(--color-background-default);
}

.expandable-box.draggable .visual-part {
	padding-left: 1.66em;
}

.expandable-part {
	padding: 1em;
	border-bottom-right-radius: inherit;
	border-bottom-left-radius: inherit;
}

.expand-button {
	position: absolute;
	top: 1.25em;
	right: 1em;
	font-size: 0.85rem;
	background-color: var(--color-background-primary);
}

.drag-icon {
	position: absolute;
	left: 0.111em;
	font-size: 1em;
	top: 50%;
	transform: translate(0, -50%);
	opacity: 0.2;
}

.box-footer {
	padding: 1em;
}
</style>