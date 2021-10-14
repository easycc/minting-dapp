<template>
	<Fragment v-if="!raw">
		<div v-if="emojiIndex && emojiObject" class="emoji-wrapper" @click="onClick">
			<Emoji
				:native="true"
				:size="32"
				class="emoji-icon"
				:emoji="emojiObject"
				:aria-label="name"
				:data="emojiIndex"
				role="image"
			/>
		</div>
	</Fragment>
	<Fragment v-else>
		{{ emojiObject.native }}
	</Fragment>
</template>

<script>
import appleIcons from 'emoji-mart-vue-fast/data/apple.json';
import { Emoji, EmojiIndex } from 'emoji-mart-vue-fast';

import Fragment from '~/components/ControlFlow/Fragment';

let emojiIndex = new EmojiIndex(appleIcons);

export default {
	components: {
		Fragment,
		Emoji
	},

	props: {
		name: {
			type: String,
			required: true,
			validator: name => emojiIndex.findEmoji(name)
		},

		raw: {
			type: Boolean,
			default: false
		}
	},

	data () {
		return {
			emojiIndex
		};
	},
	computed: {
		emojiObject () {
			return emojiIndex.findEmoji(this.name);
		}
	},
	methods: {
		onClick () {
			this.$emit('click');
		}
	}
};
</script>

<style scoped>
.emoji-wrapper {
	display: inline-block;
	vertical-align: middle;
	font-size: 1rem;
	width: 1em;
	height: 1em;
}

.emoji-icon  {
	width: inherit;
	height: inherit;
	font-size: inherit;
	padding: 0 !important;
	display: block;
	position: relative;
}

.emoji-icon ::v-deep .emoji-type-native {
	display: block;
	text-align: center;
	width: 100% !important;
	height: 100% !important;
	font-size: 0.8005em !important; /* to make space for more wide emojies like Windows */
	line-height: 1.25;
	margin: 0 auto !important;

	font-family:
		"Segoe UI Emoji",
		"Segoe UI Symbol",
		"Segoe UI",
		"Apple Color Emoji",
		"Twemoji Mozilla",
		"Noto Color Emoji",
		"EmojiOne Color",
		"Android Emoji";

	word-break: keep-all;
}
</style>