<template>
	<Fade>
		<slot v-if="featureIsEnabled" />
	</Fade>
</template>

<script>
import { Fade } from '~/components/animation';

export default {
	components: {
		Fade
	},

	props: {
		name: {
			type: String,
			required: true
		}
	},

	computed: {
		features () {
			return this.$store.getters.features;
		},

		featureIsEnabled () {
			return this.features[this.name] === true;
		}
	}
};
</script>