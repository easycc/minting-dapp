<template>
	<DefaultBadge v-if="collection" class="assets-last-badge">
		{{ collection.totalSupply }} / {{ collection.maxSupply }}
		<span class="title">Items already minted</span>
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
	padding: 0.666em 1em 0.666em;
	border-radius: 0.5em;
	text-align: center;
	font-size: 1rem;
	background-color: var(--color-background-default);
	color: var(--color-text-primary);
	margin-bottom: 1em;
	position: relative;
}
</style>