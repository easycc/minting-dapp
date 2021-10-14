<template>
	<DefaultBadge v-if="collection" class="assets-last-badge">
		{{ collection.totalSupply }} / {{ CONFIG.MAX_SUPPLY }}
		<span class="title">Items already minted</span>
	</DefaultBadge>
</template>

<script>
import DefaultBadge from './DefaultBadge';

import CONFIG from '~/contracts/config.json';

export default {
	components: {
		DefaultBadge
	},

	data () {
		return {
			CONFIG
		};
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
	font-weight: 500;
	background-color: transparent;
	color: var(--color-accent);
	margin-bottom: 1em;
	position: relative;
}

.assets-last-badge:after {
	background-color: var(--color-accent-secondary);
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: block;
	content: '';
	z-index: -1;
	border-radius: inherit;
	opacity: 0.3;
}
</style>