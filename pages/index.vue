<template>
	<Page class="page">
		<template v-slot:header>
			<Header />
		</template>

		<Spotlight />
		<AboutCollection />
		<GetAnimalsBack />
		<NftPreview />
		<Wave />
		<Road />
		<AboutUs />
		<Wallpapers />
		<!-- <Rope /> -->

		<FlyingElephant />


		<template v-slot:footer>
			<Footer />
		</template>
	</Page>
</template>

<script>

import { Page, Header, Footer } from '~/components/PageLayout';
import {
	Spotlight, AboutUs, Road, GetAnimalsBack, NftPreview, AboutCollection, Wave, Wallpapers, FlyingElephant
} from '~/containers/index';

export default {
	layout: 'dark-theme',

	components: {
		Page,
		AboutUs,
		Spotlight,
		Road,
		AboutCollection,
		GetAnimalsBack,
		Wallpapers,
		NftPreview,
		Wave,
		Header,
		FlyingElephant,
		Footer
	}
};
</script>

<style scoped>
.page {
	position: relative;
	overflow: hidden;
}
</style>