<template>
	<Page class="page">
		<template v-slot:header>
			<!-- <Header /> -->
		</template>

		<NftPreview />
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
import { AboutUs, Road, GetAnimalsBack, NftPreview } from '~/containers/index';

export default {
	layout: 'dark-theme',

	components: {
		Page,
		AboutUs,
		Road,
		GetAnimalsBack,
		NftPreview,
		Header,
		Footer
	}
};
</script>
