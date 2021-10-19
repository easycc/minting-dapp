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
			document.querySelector('body').setAttribute('style', 'background-color:#f3f3f3; color: #111;');
		}
	}
};
</script>