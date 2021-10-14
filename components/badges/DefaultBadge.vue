<template>
	<component
		:is="tag"
		class="default-badge"
		:class="kind"
	>
		<Icon v-if="iconName" :name="iconName" class="icon" />
		<EmojiIcon v-if="emojiIconName" :name="emojiIconName" class="emoji" @click="handleEmojiClick" />

		<span v-if="title" class="title">
			{{ title }}
		</span>

		<template v-if="$slots.default">
			<slot />
		</template>
	</component>
</template>

<script>
import { Icon, EmojiIcon } from '~/components/Icon';

export default {
	components: {
		Icon, EmojiIcon
	},

	props: {
		kind: {
			default: null,
			validator: name => ['primary', 'secondary'].includes(name)
		},

		title: {
			type: String,
			default: null
		},

		iconName: {
			type: String,
			default: null
		},

		emojiIconName: {
			type: String,
			default: null
		},

		tag: {
			type: String,
			default: 'span'
		}
	},

	methods: {
		handleEmojiClick () {
			this.$emit('emoji-click');
		}
	}
};
</script>

<style scoped>
.default-badge {
	font-size: 1em;
	display: inline-block;
	vertical-align: baseline;
	background: var(--color-background-secondary);
	border-radius: 1em;
	text-align: left;
	padding: 0.5em 1em;
	font-size: 1rem;
	font-weight: 400;
	position: relative;
}

.secondary {
	background: var(--color-background-primary);
}

.default-badge > * {
	display: inline-block;
	vertical-align: middle;
}

.emoji {
	font-size: 1.25em;
	line-height: 1;
}

.icon {
	font-size: 1.25em;
	line-height: 1;
	color: inherit;
}
</style>