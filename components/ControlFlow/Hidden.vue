<template>
	<Fragment v-if="visible">
		<slot />
	</Fragment>
</template>

<script>
import Fragment from './Fragment';

export default {
	components: {
		Fragment
	},

	props: {
		if: {
			type: Boolean,
			required: true
		}
	},

	computed: {
		visible () {
			return !this.if;
		}
	}
};
</script>