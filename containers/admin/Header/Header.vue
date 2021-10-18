<template>
	<header class="page-header">
		<PageContent class="header-navigation-wrapper">
			<nav class="header-navigation">
				<Button
					v-if="!sidebarOpened"
					class="toggle-button"
					iconName="menu"
					collapsed
					title="Toggle navigation"
					@click="toggleSidebar"
				/>

				<nuxt-link :to="localePath('/admin/profile')" class="profile-link" :prefetch="false">
					<Avatar
						v-if="user"
						:src="user.photoURL"
						alt="User avatar"
						class="user-avatar"
						width="auto"
						height="36"
					/>
				</nuxt-link>
			</nav>
		</PageContent>
	</header>
</template>

<script>
import { PageContent } from '~/components/PageLayout';
import { Avatar } from '~/components/BaseImage';
import { Button } from '~/components/buttons';

export default {
	components: {
		Avatar,
		Button,
		PageContent
	},

	props: {
		toggleSidebar: {
			type: Function,
			default: () => {}
		},

		sidebarOpened: {
			type: Boolean,
			default: false
		}
	},


	computed: {
		user () {
			return this.$store.getters.user;
		}
	}
};
</script>

<style scoped>
.page-header {
  display: block;
  width: 100%;
  touch-action: manipulation;
  font-size: 1em;
  padding: 0.625em 0 0.625em;
	height: var(--header-height);
	transition-delay: 0.5s;
}

.page-header:after {
	content: '';
	display: block;
	height: 100%;
	width: 100%;
	position: absolute;
	opacity: 1;
	z-index: -1;
	top: 0;
	left: 0;
	transition: opacity 0.5s ease;

	background-color: var(--color-background-default);
}

.header-navigation-wrapper {
	margin-bottom: 0;
}

.profile-link {
	float: right;
}

.user-avatar {
	font-size: 0.833em;
}

@media screen and (max-width: 700px) {

}
</style>