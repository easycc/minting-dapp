<template>
	<DefaultBadge v-if="collection" class="assets-last-badge">
		{{ collection.totalSupply }} / {{ collection.maxSupply }}
		<span class="title">minted</span>
	</DefaultBadge>
</template>

<script>
import DefaultBadge from './DefaultBadge';

export default {
	components: {
		DefaultBadge
	},

	computed: {
		collection () {
			return this.$store.getters['ethereum/collection'];
		}
	}
};
</script>

<style scoped>
.assets-last-badge {
	padding: 0.25em 0.5em 0.25em;
	border-radius: 0;
	text-align: center;
	font-size: 1.125rem;
	background-color: var(--color-background-primary);
	box-shadow: var(--pixel-shadow);
	color: var(--color-text-primary);
	position: relative;
}
</style>