<template>
	<DefaultModal class="video-modal" @close="onClose">
		<!-- <Video /> -->
		<YoutubeVideo v-if="video" :src="video.src" :width="video.width" :height="video.height" />
	</DefaultModal>
</template>

<script>
import DefaultModal from '../DefaultModal/DefaultModal';

import { YoutubeVideo } from '~/components/Video';

export default {
	components: {
		DefaultModal,
		YoutubeVideo
	},

	props: {
		video: {
			type: Object,
			required: true
		}
	},

	methods: {
		onClose () {
			this.$emit('close');
		}
	}
};
</script>

<style scoped>
.video-modal ::v-deep .content-wrapper {
	padding-left: 0.75em;
	padding-right: 0.75em;
	padding-bottom: 2em;
}
</style>