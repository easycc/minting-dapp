<template>
	<IconImage
		v-if="src"
		:src="src"
		class="icon"
		@click="onClick"
	/>
</template>

<script>
import icons from './icons';

import { IconImage } from '~/components/IconImage';

let iconNames = Object.keys(icons);

export { icons };
export default {
	components: { IconImage },
	props: {
		name: {
			type: String,
			required: true,
			validator: name => iconNames.includes(name)
		}
	},
	computed: {
		src () {
			let { name } = this;
			let src = icons[name];

			return src;
		}
	},
	methods: {
		onClick () {
			this.$emit('click');
		}
	}
};
</script>

<style scoped>
.icon {
	font-size: 1rem;
	color: var(--color-text-primary);
}
</style>