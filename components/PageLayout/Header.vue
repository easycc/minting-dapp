<template>
	<header
		class="page-header"
		:class="{ 'opened': headerOpened, 'navigation-hidden-on-desktop': hideNavigationOnDesktop }"
	>
		<PageContent class="header-navigation-wrapper">
			<nav class="header-navigation">
				<Logo to="/" class="logo" />

				<Button
					class="open-nav-button"
					:iconName="headerOpened ? 'cross' : 'menu'"
					collapsed
					title="Open navigation"
					@click="toggleHeader"
				/>

				<FadeDown>
					<ul v-if="headerOpened" class="navigation-list">
						<li class="navigation-item">
							<Button
								link="/digital-framework"
								class="navigation-link"
								:prefetch="false"
								@click.native="toggleHeader"
							>
								link
							</Button>
						</li>

						<li class="navigation-item">
							<Button
								link="/bundle"
								class="navigation-link"
								:prefetch="false"
								@click.native="toggleHeader"
							>
								link
							</Button>
						</li>
					</ul>
				</FadeDown>
			</nav>
		</PageContent>
	</header>
</template>

<script>
import PageContent from './PageContent';

import { countries } from '~/components/ControlFlow';
import { Button } from '~/components/buttons';
import { FadeDown } from '~/components/animation';
import { Logo } from '~/components/Logo';
import noop from '~/utils/noop';

export default {
	components: {
		Button,
		Logo,
		FadeDown,
		PageContent
	},

	props: {
		hideNavigationOnDesktop: {
			type: Boolean,
			default: false
		},
		headerOpened: {
			type: Boolean,
			default: false
		},
		toggleHeader: {
			type: Function,
			default: noop
		}
	},

	data () {
		return {
			countries
		};
	},

	computed: {
		activeLocale () {
			return this.$i18n.locale;
		},

		locales () {
			return this.$i18n.locales;
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
	transition: backdrop-filter 0.5s ease;
	height: var(--header-height);
	transition-delay: 0.5s;
	background-color: var(--color-background-default);
}


@media screen and (max-width: 576px) {
	.page-header.opened {
		backdrop-filter: saturate(180%) blur(20px);
		transition-delay: 0s;
	}
}

.header-navigation-wrapper {
	margin-bottom: 0;
}

.header-navigation {
  display: flex;
	align-items: center;
  width: 100%;
	text-align: left;
	margin-bottom: 0;
	padding: 0;
}

@media screen and (max-width: 576px) {
	.page-header.opened:after {
		opacity: 0.93;
	}

	.header-navigation {
		display: block;
	}
}

.logo {
	display: inline-block;
	position: relative;
	z-index: 10;
	width: 7.5em;
}

.navigation-list {
	margin: 0 0 0 auto;
	font-size: 0.875em;
}

@media screen and (max-width: 576px) {
	.page-header.opened .navigation-list {
		position: absolute;
		display: block;
		width: 100%;
		z-index: 5;
		left: 0;
		top: var(--header-height);
		background-color: var(--color-background-default);
		padding: 1em var(--page-horizontal-padding) 2em;
		backdrop-filter: saturate(180%) blur(20px);
		transition: height 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease;
	}
}

.navigation-item {
	display: inline-block;
	vertical-align: middle;
	margin: 0 0 0 0.5em;
}

.navigation-link {
	padding: 0.25em;
	display: block;
	background: none;
	border-radius: 0;
	font-weight: 400;
	color: var(--color-text-default);
	box-shadow: none;
	font-size: inherit;
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

@media screen and (max-width: 576px) {
/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
	.navigation-link.nuxt-link-exact-active:after {
		display: none;
	}
}


@media screen and (min-width: 576px) {
	.page-header.navigation-hidden-on-desktop .navigation-link {
		display: none;
	}
}

.navigation-link:hover {
	color: var(--color-text-primary);
	background-color: transparent;
}

@media screen and (max-width: 576px) {
	.navigation-list {
		padding: 1.5em 0 2em;
		font-size: 1em;
	}

	.navigation-item {
		display: block;
		width: 100%;
		margin-left: 0;
		position: relative;
	}

	.navigation-item + .navigation-item:after {
		border-top: 1px solid currentColor;
		display: block;
		width: 100%;
		left: 0;
		top: 0;
		position: absolute;
		content: '';
		opacity: 0.1;
	}

	.navigation-link {
		padding: 0.75em 0;
		text-align: left;
	}
}


.open-nav-button {
	display: none;
	position: relative;
	float: right;
	width: 2.25em;
	height: 2.25em;
	padding: 0.5em;
	color: var(--color-text-default);
}

.locale-picker {
	display: inline-block;
	vertical-align: middle;
	margin-left: 0.75em;
	font-size: inherit;
}

@media screen and (max-width: 576px) {
	.open-nav-button {
		display: block;
	}

	.locale-picker {
		margin-left: 0;
		margin-top: 0.66em;
	}
}
</style>