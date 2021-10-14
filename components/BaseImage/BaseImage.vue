<template>
	<div class="image-wrapper">
		<img
			:src="src"
			:alt="alt"
			class="image"
			:style="{ objectFit }"
			:data-object-fit="objectFit"
			:data-object-position="objectPosition"
		/>
	</div>
</template>

<script>
import 'objectFitPolyfill';

export default {
	props: {
		src: {
			type: String,
			required: true
		},

		objectFit: {
			type: String,
			validator: name => ['contain', 'cover'].includes(name),
			default: 'contain'
		},

		objectPosition: {
			type: String,
			default: '50% 50%'
		},

		alt: {
			type: [Number, String],
			required: true
		}
	},
	mounted () {
		if (process.client) {
			window.objectFitPolyfill();
		}
	}
};
</script>

<style scoped>
/* Hot fix on production to prevent wrong css import and specify */
div {
	max-width: 100%;
	font-size: 1em;
	width: 14rem;
	height: 14rem;
}

.image {
	width: 100%;
	height: 100%;
	display: block;
}
</style>