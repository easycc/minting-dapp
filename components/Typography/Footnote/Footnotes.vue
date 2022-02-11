<template>
	<PortalTarget
		ref="footnotes-list"
		tag="ol"
		multiple
		name="footnote"
		class="footnotes-list"
	/>
</template>

<script>
import { PortalTarget } from 'portal-vue';

export default {
	components: {
		PortalTarget
	}
};
</script>

<style scoped>
.footnotes-list {
	list-style: initial;
	list-style-position: inside;
	width: 100%;
	padding: 0;
	margin: 0;
}
</style>