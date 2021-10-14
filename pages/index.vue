<template>
	<ClientOnly>
		<!-- Remove after launch -->
		<Page>
			<template v-if="developDomain || userIsAdmin" v-slot:header>
				<Header />
			</template>

			<template v-if="developDomain || userIsAdmin">
				<Spotlight />

				<PageContent>
					<GeneralInfo />
				</PageContent>

				<PageContent>
					<DigitalFramework />
				</PageContent>

				<PageContent>
					<PaperNotebook @open-waiting-list-modal="toggleWaitingListModal" />
				</PageContent>

				<PageContent>
					<DigitalProductFeatures />
				</PageContent>

				<FrameworkContentOverview />

				<div class="review-section-wrapper">
					<Reviews class="reviews-section" />
				</div>

				<PageContent>
					<Benefits />
				</PageContent>

				<PageContent>
					<Epilogue />
				</PageContent>

				<WaitingListModal
					v-if="showWaitingListModal"
					@close="toggleWaitingListModal"
				/>
			</template>

			<SplashScreen v-if="!developDomain && !userIsAdmin" />

			<template v-if="developDomain || userIsAdmin" v-slot:footer>
				<Footer />
			</template>
		</Page>
	</ClientOnly>
</template>

<script>
import { WaitingListModal, Reviews } from '~/containers';
import {
	SplashScreen,
	Spotlight,
	DigitalProductFeatures,
	FrameworkContentOverview,
	Benefits,
	Epilogue,
	GeneralInfo,
	DigitalFramework,
	PaperNotebook
} from '~/containers/index/index';
import { Page, Header, Footer, PageContent } from '~/components/PageLayout';
import USER_ROLE from '~/constants/user-role';

export default {
	layout: 'light-theme',

	components: {
		Page,
		Header,
		Footer,
		PageContent,
		SplashScreen,
		Spotlight,
		DigitalProductFeatures,
		FrameworkContentOverview,
		Benefits,
		Epilogue,
		PaperNotebook,
		GeneralInfo,
		DigitalFramework,
		Reviews,
		WaitingListModal
	},

	data () {
		return {
			showWaitingListModal: false
		};
	},

	computed: {
		userIsAdmin () {
			return this.user && this.user.role === USER_ROLE.ADMIN;
		},

		user () {
			return this.$store.getters.user;
		},

		developDomain () {
			return process.client ? ['develop.mylife.tech', 'staging.mylife.tech'].includes(window.location.host) : false;
		}
	},

	methods: {
		toggleWaitingListModal () {
			this.showWaitingListModal = !this.showWaitingListModal;
		}
	}
};
</script>

<style scoped>
.review-section-wrapper {
	padding: 7em 0 0;
}

@media screen and (max-width: 576px) {
	.review-section-wrapper {
		padding: 4rem 0 0;
	}
}

.reviews-section ::v-deep .reviews-title {
	max-width: 32rem;
	text-align: center;
	display: block;
	margin: 0 auto 1em;
}
</style>