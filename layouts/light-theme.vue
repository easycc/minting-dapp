<template>
	<LightTheme>
		<Root>
			<nuxt />
		</Root>
	</LightTheme>
</template>

<script>
import Root from './root';

import { LightTheme } from '~/components/Themes';

export default {
	components: {
		Root,
		LightTheme
	},

	mounted () {
		if (document) {
			document.querySelector('body').setAttribute('style', 'background-color:#faf6f6; color: #111;');
		}
	}
};
</script>