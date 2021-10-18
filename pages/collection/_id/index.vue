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
} from '~/containers/collection/index/index';
import { Page, Header, Footer } from '~/components/PageLayout';
import LocaleStorage from '~/services/locale-storage';

export default {
	layout: 'light-theme',

	components: {
		Page,
		Header,
		Footer,
		Spotlight
	},

	async mounted () {
		await this.$store.dispatch('ethereum/fetchCollection');

		const storedAccount = LocaleStorage.getItem('account');

		if (storedAccount) {
			await this.$store.dispatch('ethereum/connect');
		}
	}
};
</script>