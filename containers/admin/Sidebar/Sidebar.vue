<template>
	<aside class="sidebar">
		<Button
			class="toggle-button"
			iconName="menu"
			collapsed
			title="Toggle navigation"
			@click="toggleSidebar"
		/>

		<!-- <nuxt-link :to="localePath('/admin')" class="logo">
			<img
				src="/logo.png"
				:alt="$t('components.header.logoAlt')"
				width="auto"
				height="36"
				class="logo-image"
			/>
		</nuxt-link> -->

		<nav class="navigation">
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
		</nav>
	</aside>
</template>

<script>
import { Button } from '~/components/buttons';
import { ProtectedRoute } from '~/components/router';
import USER_ROLE from '~/constants/user-role';

export default {
	components: {
		ProtectedRoute,
		Button
	},

	props: {
		toggleSidebar: {
			type: Function,
			default: () => {}
		}
	},

	data () {
		return {
			USER_ROLE
		};
	}
};
</script>

<style scoped>
.sidebar {
	background-color: var(--color-background-secondary);
	padding: calc(6em + 1.5vw) 1.5em 0;
}

.navigation-list {
	display: block;
	width: 100%;
	list-style: none;
	margin: 0 0 1em;
	padding: 0;
}

.navigation-item {
	margin-bottom: 0.5em;
	display: block;
	width: 100%;
	white-space: nowrap;
}

.navigation-link {
	display: block;
	width: 100%;
	text-align: left;
}

.toggle-button {
	position: absolute;
	top: 1em;
	right: 1em;
}

.logo {
	display: inline-block;
	vertical-align: top;
	position: absolute;
	z-index: 10;
	top: 1.333em;
	left: 1.333em;
}

.logo-image {
	display: block;
	width: 7em;
	height: auto;
}
</style>