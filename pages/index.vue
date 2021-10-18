<template>
	<Page>
		<template v-slot:header>
			<Header />
		</template>

		<template v-slot:footer>
			<Footer />
		</template>
	</Page>
</template>

<script>
import { Page, Header, Footer } from '~/components/PageLayout';

export default {
	layout: 'light-theme',

	components: {
		Page,
		Header,
		Footer
	},

	mounted () {
		this.$router.push(this.localePath({ path: '/collection/crypto-savanna' }));
	}
};
</script>