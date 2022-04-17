<template>
	<component :is="tag" :to="localePath(to)" :class="['logo', { collapsed }]">
		<IconImage
			:src="src"
			:scale="true"
			:width="118"
			:height="35"
			class="logo-image"
		/>
		<span class="visually-hidden">MyLife logo</span>
	</component>
</template>

<script>
import LogoBase from './logo-base.svg';
import LogoCollapsed from './logo-collapsed.svg';

import { IconImage } from '~/components/IconImage/';

export default {

	components: {
		IconImage
	},
	props: {
		to: {
			type: String,
			default: undefined
		},

		collapsed: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		tag () {
			let { to } = this;

			return to ? 'nuxt-link' : 'div';
		},

		src () {
			let { collapsed } = this;

			if (collapsed) {
				return LogoCollapsed;
			}
			return LogoBase;
		}
	}

};
</script>

<style scoped>
.logo {
	display: inline-block;
	vertical-align: middle;
	width: 12rem;
}

.logo.collapsed {
	width: 2.5em;
	height: 2.5em;
}

.logo-image {
	display: block;
	width: 100%;
	height: auto;
	color: var(--color-text-primary);
}

.logo.collapsed .logo-image {
	width: 100%;
	height: 100%;
}
</style>