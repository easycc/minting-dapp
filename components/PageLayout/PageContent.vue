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
	--page-content-padding: 1.5em;

	display: block;
	max-width: 60rem;
	margin: 0 auto 6rem;
	padding: 0 var(--page-content-padding, 1.5em);
}


@media screen and (max-width: 576px) {
	.page-content {
		margin-bottom: 4rem;
	}
}
</style>