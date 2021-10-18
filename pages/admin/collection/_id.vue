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
				<Tabs class="tabs-wrapper" tabsName="globalNav" mode="hash" defaultTabName="edit">
					<template v-slot:tabs>
						<Tab
							name="edit"
							emojiIconName=":gear:"
							title="Edit"
						/>
					</template>

					<TabContent name="edit">
						<EditCollectionForm
							v-if="collection"
							:collection.sync="collection"
							:collectionId="collectionId"
							@reload-collection-data="getCollectionData"
						/>
					</TabContent>
				</Tabs>
			</PageContent>


			<template v-slot:footer>
				<Footer />
			</template>
		</Page>
	</ProtectedRoute>
</template>

<script>
import { ProtectedRoute } from '~/components/router';
import { Page, Footer, PageContent } from '~/components/PageLayout';
import { Tabs, Tab, TabContent } from '~/components/Tabs';
import { EditCollectionForm } from '~/containers/admin/collection';
import { Sidebar, Header } from '~/containers/admin';
import USER_ROLE from '~/constants/user-role';

export default {
	layout: 'dark-theme',

	components: {
		ProtectedRoute,
		Page,
		Footer,
		Sidebar,
		Header,
		PageContent,

		Tab,
		Tabs,
		TabContent,
		EditCollectionForm
	},

	data () {
		return {
			USER_ROLE,
			collection: null
		};
	},

	computed: {
		collectionId () {
			return this.$route.query.collectionId;
		}
	},

	created () {
		this.$store.dispatch('getConfig');
	},

	mounted () {
		this.getCollectionData();
	},

	methods: {
		async getCollectionData () {
			let collectionSnap = await this.$fire.firestore
				.collection('collections')
				.doc(this.collectionId)
				.get();

			this.collection = collectionSnap.data();
		}
	}
};
</script>