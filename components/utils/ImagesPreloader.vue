<template>
	<div class="visually-hidden">
		<link
			v-for="image in images"
			:key="image"
			rel="preload"
			:href="image"
			as="image"
		/>
	</div>
</template>

<script>
export default {
	props: {
		images: {
			type: Array,
			default: () => []
		}
	}
};
</script>