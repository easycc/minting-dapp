<template>
	<DarkTheme>
		<Root>
			<nuxt />
		</Root>
	</DarkTheme>
</template>

<script>
import Root from './root';

import { DarkTheme } from '~/components/Themes';

export default {
	components: {
		Root,
		DarkTheme
	},

	mounted () {
		if (document) {
			document.querySelector('body').setAttribute('style', 'background-color:#222; color: #fff;');
		}
	}
};
</script>