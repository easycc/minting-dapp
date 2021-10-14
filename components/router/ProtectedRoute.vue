<template>
	<Fragment>
		<ClientOnly>
			<slot v-if="accessIsGranted" />

			<PageContent v-else-if="accessIsGranted === false && showSplashScreen" class="access-denied-screen">
				<DefaultCard>
					<h3>You don’t have permissions.</h3>
					<p>Please contact administrators to get an access.</p>

					<LoginForm class="login-form" />
				</DefaultCard>
			</PageContent>

			<LoginForm v-else-if="!accessIsGranted && showSplashScreen" class="login-form" />
		</ClientOnly>
	</Fragment>
</template>

<script>
import { DefaultCard } from '~/components/cards';
import { LoginForm } from '~/containers/admin/index/index';
import { PageContent } from '~/components/PageLayout';
import { Fragment } from '~/components/ControlFlow';

export default {
	components: {
		DefaultCard,
		LoginForm,
		PageContent,
		Fragment
	},

	props: {
		requiredRole: {
			type: String,
			required: true
		},

		showSplashScreen: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		user () {
			return this.$store.getters.user;
		},

		userRoles () {
			return this.$store.getters.userRoles;
		},

		accessIsGranted () {
			if (!this.user || !this.userRoles) return;

			const DEFAULT_PRIORITY = 0;

			const userRole = this.userRoles[this.user.role];
			const userRolePriority = userRole ? userRole.priority : DEFAULT_PRIORITY;

			const requiredUserRole = this.userRoles[this.requiredRole];
			const requiredUserRolePriority = requiredUserRole.priority;

			return userRolePriority >= requiredUserRolePriority;
		}
	}
};
</script>

<style scoped>
.login-form {
	padding: 1rem 1rem 0;
	margin: 0 auto;
	display: block;
}

.access-denied-screen {
	text-align: center;
	max-width: 32rem;
	margin-bottom: 0;
	padding-top: 1rem;
}
</style>