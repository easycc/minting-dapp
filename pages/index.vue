<template>
	<Page>
		<template v-slot:header>
			<Header />
		</template>

		<Spotlight />

		<template v-slot:footer>
			<Footer />
		</template>
	</Page>
</template>

<script>
import {
	Spotlight
} from '~/containers/index/index';
import { Page, Header, Footer, PageContent } from '~/components/PageLayout';

export default {
	layout: 'light-theme',

	components: {
		Page,
		Header,
		Footer,
		PageContent,
		Spotlight
	}
};
</script>

<style scoped>
</style>