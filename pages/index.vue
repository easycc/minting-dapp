<template>
	<Page>
		<template v-slot:header>
			<!-- <Header /> -->
		</template>

		<GetAnimalsBack />
		<AboutUs />
		<Road />

		<template v-slot:footer>
			<!-- <Footer /> -->
		</template>
	</Page>
</template>

<script>
import { Page, Header, Footer } from '~/components/PageLayout';
import { AboutUs, Road, GetAnimalsBack } from '~/containers/index';

export default {
	layout: 'dark-theme',

	components: {
		Page,
		AboutUs,
		Road,
		GetAnimalsBack,
		Header,
		Footer
	}
};
</script>