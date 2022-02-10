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
import { AboutUs } from '~/containers/index';

export default {
	layout: 'light-theme',

	components: {
		Page,
		Header,
		Footer
	}
};
</script>