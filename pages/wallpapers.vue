<template>
	<Page class="page">
		<!-- <template v-slot:header>
			<Header />
		</template> -->

		<WallpapersList />

		<!-- <template v-slot:footer>
			<Footer />
			</template> -->
	</Page>
</template>

<script>
import { Page, Footer, Header } from '~/components/PageLayout';
import {
	WallpapersList
} from '~/containers/wallpapers';

export default {
	layout: 'dark-theme',

	components: {
		Page,
		Header,
		WallpapersList,
		Footer
	}
};
</script>