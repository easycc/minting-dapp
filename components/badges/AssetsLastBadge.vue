<template>
	<DefaultBadge v-if="collection" class="assets-last-badge">
		<ProgressBar
			:length="config.maxSupply"
			:value="collection.totalSupply"
			class="progress-bar"
		/>
		<span class="title">
			<FormatNumber :value="collection.totalSupply" />
			/
			<FormatNumber :value="config.maxSupply" /></span>

		<span class="subtitle">minted</span>
	</DefaultBadge>
</template>

<script>
import DefaultBadge from './DefaultBadge';

import config from '~/collection/config.json';
import { ProgressBar } from '~/components/progress';
import { FormatNumber } from '~/components/FormatNumber';

export default {
	components: {
		DefaultBadge,
		FormatNumber,
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
	padding: 0.375em 0 0;
	border-radius: 0;
	text-align: center;
	font-size: 1.125rem;
	color: var(--color-text-primary);
	position: relative;
	background: transparent;

	--progress-bar-background-color: var(--color-background-primary)
}

.progress-bar {
	max-width: 12em;
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