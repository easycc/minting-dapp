<template>
	<div class="youtube-video">
		<AspectRatioContainer :width="width" :height="height">
			<iframe
				:width="width"
				:height="height"
				:src="src"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>
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
			default: 560
		},
		height: {
			type: Number,
			default: 320
		},
		src: {
			type: String,
			required: true
		}
	}
};
</script>

<style scoped>
.youtube-video {
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