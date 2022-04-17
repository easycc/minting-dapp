<template>
	<header
		class="page-header"
	>
		<PageContent class="header-navigation-wrapper">
			<nav class="header-navigation">
				<a class="logo visually-hidden" href="/">Circus Escape</a>
			</nav>
		</PageContent>
	</header>
</template>

<script>
import PageContent from '../PageContent';

export default {
	components: {
		PageContent
	},

	computed: {
		collection () {
			return this.$store.getters['ethereum/collection'];
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
  padding: 1.5em 0 1.5em;
	transition: backdrop-filter 0.5s ease;
	transition-delay: 0.5s;

	background-image: url('./images/flags.png');
	background-position: calc(50% - 125px) 0;
	background-size: 250px 50px, auto;
	background-repeat: repeat-x, no-repeat;
}

.header-navigation-wrapper {
	margin-bottom: 0;
	padding-top: 0;
	padding-bottom: 0;
}

.header-navigation {
  display: flex;
	align-items: center;
  width: 100%;
	text-align: left;
	margin-bottom: 0;
	padding: 0;
}

/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
.navigation-link.nuxt-link-exact-active {
	color: var(--color-text-secondary);
	position: relative;
}

/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
.navigation-link.nuxt-link-exact-active:after {
	display: block;
	width: 100%;
	content: '';
	position: absolute;
	width: calc(100% - 1.25em);
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 0);
	height: 1px;
	background-color: currentColor;
	opacity: 0.3;
	border-radius: 1em;
}
</style>