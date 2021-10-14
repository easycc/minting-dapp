<template>
	<DefaultModal class="emoji-picker-modal" @close="onClose">
		<Picker
			:data="emojiIndex"
			theme="dark"
			set="apple"
			title="Pick your emoji…"
			class="emoji-picker"
			@select="onSelect"
		/>

		<Button
			v-if="emojiSelected"
			emojiIconName=":x:"
			title="Delete emoji"
			class="delete-emoji-button"
			@click="deleteEmoji"
		/>
	</DefaultModal>
</template>

<script>
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast';
import appleIcons from 'emoji-mart-vue-fast/data/apple.json';

import { Button } from '~/components/buttons';
import { DefaultModal } from '~/components/modals';
import 'emoji-mart-vue-fast/css/emoji-mart.css';

let emojiIndex = new EmojiIndex(appleIcons);

export default {
	components: {
		Picker,
		Button,
		DefaultModal
	},

	props: {
		emojiSelected: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			emojiIndex
		};
	},

	methods: {
		onClose () {
			this.$emit('close');
		},

		onSelect (emoji) {
			this.$emit('select', emoji.id);
			this.onClose();
		},

		deleteEmoji () {
			this.$emit('delete-emoji');
			this.onClose();
		}
	}
};
</script>

<style scoped>
.emoji-picker-modal ::v-deep .content-wrapper {
	max-width: 358px;
	width: auto;
	padding: 0;
	border-radius: 0;
	margin-top: 4em;
	display: inline-block;
	background: none;
	padding: 0.5em;
}

.emoji-picker-modal ::v-deep .close-button {
	top: -0.5em;
	transform: translate(0, -100%);
	right: 0.5em;
}

.emoji-picker {
	margin: 0 auto 1em;
	max-width: 100%;
}

.delete-emoji-button {
	display: block;
	width: 100%;
}
</style>