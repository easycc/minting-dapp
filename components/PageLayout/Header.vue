<template>
	<ThemeContextConsumer v-slot="{ light }">
		<header
			class="page-header"
			:class="{ light, 'opened': showNavigation, 'navigation-hidden-on-desktop': hideNavigationOnDesktop }"
		>
			<PageContent class="header-navigation-wrapper">
				<nav class="header-navigation">
					<nuxt-link :to="localePath('/')" class="logo" :prefetch="false">
						<img
							:src="light ? '/logo-dark.png' : '/logo.png'"
							:alt="$t('components.header.logoAlt')"
							width="auto"
							height="36"
							class="logo-image"
						/>
					</nuxt-link>

					<Button
						class="open-nav-button"
						:iconName="showNavigation ? 'cross' : 'menu'"
						collapsed
						:title="$t('components.header.navButtonTitle')"
						@click="toggleNavigation"
					/>

					<FadeDown>
						<ul v-if="showNavigation" class="navigation-list">
							<li class="navigation-item">
								<!-- <Button
									:link="localePath('/digital-framework')"
									class="navigation-link"
									:prefetch="false"
									@click.native="toggleNavigation"
								>
									{{ $t('components.header.links.digitalFramework') }}
								</Button> -->
							</li>
						</ul>
					</FadeDown>
				</nav>
			</PageContent>

			<LanguageModal
				:locales="locales"
				:activeLocale="activeLocale"
				:link="switchLocalePath"
				@set-locale="toggleNavigation"
			/>
		</header>
	</ThemeContextConsumer>
</template>

<script>
import PageContent from './PageContent';

import { Button, SwitchLanguageButton } from '~/components/buttons';
import { LanguageModal } from '~/components/modals';
import { FadeDown } from '~/components/animation';

export default {
	components: {
		Button,
		LanguageModal,
		FadeDown,
		PageContent,
		SwitchLanguageButton
	},

	props: {
		hideNavigationOnDesktop: {
			type: Boolean,
			default: false
		}
	},

	data () {
		const MOBILE_SREEN_WIDTH = 576;

		return {
			showNavigation: false,
			MOBILE_SREEN_WIDTH
		};
	},

	computed: {
		activeLocale () {
			return this.$i18n.locale;
		},

		locales () {
			return this.$i18n.locales;
		}
	},

	watch: {
		showNavigation () {
			this.$emit('freeze-page-height', this.showNavigation);
		}
	},

	mounted () {
		this.handleScreenResize();

		if (process.client) {
			window.addEventListener('resize', this.handleScreenResize);
		}
	},

	beforeDestroy () {
		window.removeEventListener('resize', this.handleScreenResize);
	},

	methods: {
		toggleNavigation () {
			if (process.client && window.innerWidth > this.MOBILE_SREEN_WIDTH) return;
			this.showNavigation = !this.showNavigation;
		},

		handleScreenResize () {
			if (process.client && window.innerWidth > this.MOBILE_SREEN_WIDTH) {
				this.showNavigation = true;
			}
			else {
				this.showNavigation = false;
			}
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
}

.logo-image {
	display: block;
	width: 7.5em;
	height: auto;
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
		height: 100vh;
		background-color: var(--color-background-default);
		padding: 1em var(--page-content-padding) 0;
		backdrop-filter: saturate(180%) blur(20px);
		transition: height 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease;
	}

	.page-header.opened .navigation-list:after {
		transition-delay: 0s;

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
	z-index: 10;
	float: right;
	width: 2.5em;
	height: 2.5em;
	padding: 0.5em;
}

.switch-language-button {
	display: inline-block;
	vertical-align: middle;
	margin-left: 0.75em;
	font-size: inherit;
	padding: 0.33em 0.5em;
}

@media screen and (max-width: 576px) {
	.open-nav-button {
		display: block;
	}

	.switch-language-button {
		margin-left: 0;
		margin-top: 0.66em;
	}
}
</style>