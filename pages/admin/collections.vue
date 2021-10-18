<template>
	<ProtectedRoute :requiredRole="USER_ROLE.ADMIN" showSplashScreen>
		<Page>
			<template v-slot:header>
				<Header />
			</template>

			<template v-slot:sidebar>
				<Sidebar />
			</template>

			<PageContent>
				<Collections />
			</PageContent>

			<template v-slot:footer>
				<Footer />
			</template>
		</Page>
	</ProtectedRoute>
</template>

<script>
import { Collections } from '~/containers/admin/index/index';
import { ProtectedRoute } from '~/components/router';
import { Header, Sidebar } from '~/containers/admin';
import { Page, Footer, PageContent } from '~/components/PageLayout';
import USER_ROLE from '~/constants/user-role';

export default {
	layout: 'dark-theme',

	components: {
		ProtectedRoute,
		Header,
		Sidebar,
		Page,
		Footer,
		PageContent,
		Collections
	},

	data () {
		return {
			USER_ROLE
		};
	},

	created () {
		this.$store.dispatch('getConfig');
	}
};
</script>