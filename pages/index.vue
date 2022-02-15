<template>
	<Page class="page">
		<template v-slot:header>
			<!-- <Header /> -->
		</template>

		<AboutCollection />
		<GetAnimalsBack />
		<NftPreview />
		<AboutUs />
		<Road />

		<template v-slot:footer>
			<!-- <Footer /> -->
		</template>
	</Page>
</template>

<script>
import { Page, Header, Footer } from '~/components/PageLayout';
import {
	AboutUs, Road, GetAnimalsBack, NftPreview, AboutCollection
} from '~/containers/index';

export default {
	layout: 'dark-theme',

	components: {
		Page,
		AboutUs,
		Road,
		AboutCollection,
		GetAnimalsBack,
		NftPreview,
		Header,
		Footer
	}
};
</script>