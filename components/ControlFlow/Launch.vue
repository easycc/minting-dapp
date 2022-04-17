<template>
	<Fragment v-if="developDomain || userIsAdmin || isExceptionRoute">
		<slot />
	</Fragment>
	<SplashScreen v-else />
</template>

<script>
import { SplashScreen } from '~/containers';
import { Fragment } from '~/components/ControlFlow';
import USER_ROLE from '~/constants/user-role';
import isTestDomain from '~/utils/is-test-domain';

export default {
	components: {
		Fragment,
		SplashScreen
	},

	computed: {
		userIsAdmin () {
			return this.user && this.user.role === USER_ROLE.ADMIN;
		},

		isExceptionRoute () {
			const EXCEPTION_ROUTES = [
				'legal-terms',
				'legal-privacy',
				'admin',
				// 'pre-order',
				// 'order-paper-notebook',
				// 'paper-notebook',
				// 'preorder',
				'results',
				// 'notebook-ybc',
				// 'order-qr-paper-notebook',
				// 'book-qr-link'
			];

			const EXCEPTION_ROUTE = EXCEPTION_ROUTES.find(route => this.$route.name.includes(route));

			return Boolean(EXCEPTION_ROUTE);
		},

		user () {
			return this.$store.getters.user;
		},

		developDomain () {
			return process.client ? isTestDomain() : false;
		}
	}
};
</script>