<template>
	<DefaultBadge v-if="collection" class="assets-last-badge">
		<ProgressBar
			:length="config.maxSupply"
			:value="collection.totalSupply"
		/>
		<span class="title">{{ collection.totalSupply }} / {{ config.maxSupply }}</span>
		<span class="subtitle">minted</span>
	</DefaultBadge>
</template>

<script>
import DefaultBadge from './DefaultBadge';

import config from '~/collection/config.json';
import { ProgressBar } from '~/components/progress';

export default {
	components: {
		DefaultBadge,
		ProgressBar
	},

	data () {
		return {
			config
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
	padding: 0.375em 0.5em 0;
	border-radius: 0;
	text-align: center;
	font-size: 1.125rem;
	color: var(--color-text-primary);
	position: relative;
	background: transparent;

	--progress-bar-background-color: var(--color-background-primary)
}

.title {
	display: block;
	font-size: 3em;
	margin-bottom: 0rem;
}

.subtitle {
	display: block;
	width: 100%;
}
</style>