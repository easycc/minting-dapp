<template>
	<div class="video-container">
		<AspectRatioContainer :width="width" :height="height">
			<video
				class="video"
				:width="width"
				:height="height"
				autoplay
				loop
				:poster="poster"
				muted
				playsinline
			>
				<source :type="type" :src="src" />
			</video>
		</AspectRatioContainer>
	</div>
</template>

<script>
import { AspectRatioContainer } from '~/components/Layout';

export default {
	components: {
		AspectRatioContainer
	},

	props: {
		width: {
			type: Number,
			default: 1920
		},
		height: {
			type: Number,
			default: 1080
		},
		src: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: 'video/mp4'
		},
		poster: {
			type: String,
			default: ''
		}
	}
};
</script>

<style scoped>
.video-container {
	display: block;
	width: 100%;
	overflow: hidden;
	border-radius: 1rem;
	-moz-border-radius: 1rem;
	-webkit-border-radius: 1rem;

	/* https://stackoverflow.com/questions/49066011/overflow-hidden-with-border-radius-not-working-on-safari */
	position: relative;
	z-index: 1;
}
</style>