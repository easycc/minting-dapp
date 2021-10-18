<template>
	<ProtectedRoute :requiredRole="USER_ROLE.ADMIN" showSplashScreen>
		<Page>
			<template v-slot:header>
				<Header />
			</template>

			<template v-slot:sidebar>
				<Sidebar />
			</template>

			<PageContent tag="nav" class="navigation">
				<ul class="navigation-list">
					<ProtectedRoute :requiredRole="USER_ROLE.ADMIN">
						<li class="navigation-item">
							<Button
								toLocalePath
								class="navigation-link"
								link="/admin/collections"
								title="Collections"
								emojiIconName=":gem:"
							/>
						</li>
					</ProtectedRoute>

					<ProtectedRoute :requiredRole="USER_ROLE.ADMIN">
						<li class="navigation-item">
							<Button
								toLocalePath
								class="navigation-link"
								link="/admin/members"
								title="Members"
								emojiIconName=":busts_in_silhouette:"
							/>
						</li>
					</ProtectedRoute>
				</ul>
			</PageContent>

			<template v-slot:footer>
				<Footer />
			</template>
		</Page>
	</ProtectedRoute>
</template>

<script>
import { Button } from '~/components/buttons';
import { ProtectedRoute } from '~/components/router';
import { Header, Sidebar } from '~/containers/admin';
import { Page, Footer, PageContent } from '~/components/PageLayout';
import USER_ROLE from '~/constants/user-role';

export default {
	layout: 'dark-theme',

	components: {
		ProtectedRoute,
		Button,
		Page,
		Header,
		Footer,
		Sidebar,
		PageContent
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

<style scoped>
.navigation-list {
	display: block;
	width: 100%;
	list-style: none;
	margin: 0 0 1em;
	padding: 1em 0 0;
}

.navigation-item {
	margin-bottom: 0.5em;
	display: inline-block;
	margin-right: 0.5em;
	max-width: 100%;
	white-space: nowrap;
}

.navigation-link {
	display: block;
	width: 100%;
}
</style>