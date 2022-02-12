<template>
	<component :is="tag" class="page-content">
		<slot />
	</component>
</template>

<script>
export default {
	props: {
		tag: {
			type: String,
			default: 'div'
		}
	}
};
</script>


<style scoped>
.page-content {
	--page-horizontal-padding: 1.5rem;
	--page-vertical-padding: 6rem;

	display: block;
	max-width: 70rem;
	margin: 0 auto;
	padding: var(--page-vertical-padding) var(--page-horizontal-padding, var(--page-vertical-padding));
}


@media screen and (max-width: 576px) {
	.page-content {
		--page-vertical-padding: 4rem;
	}
}
</style>