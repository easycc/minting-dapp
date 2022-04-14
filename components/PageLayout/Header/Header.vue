<template>
	<header
		class="page-header"
	>
		<PageContent class="header-navigation-wrapper">
			<nav class="header-navigation">
				<FadeDown>
					<ul class="navigation-list">
						<li class="navigation-item">
							<a
								href="https://twitter.com/CircusEscape"
								class="navigation-link twitter"
								target="_blank"
								rel="noopener noreferrer nofollow"
							>
								<span class="visually-hidden">Twitter</span>
							</a>
						</li>

						<li class="navigation-item">
							<a
								href="https://google.com/"
								class="navigation-link discord"
								target="_blank"
								rel="noopener noreferrer nofollow"
							>
								<span class="visually-hidden">Discord</span>
							</a>
						</li>

						<li class="navigation-item">
							<a
								:href="`https://etherscan.io/address/${collection.contractAddress}`"
								class="navigation-link etherscan"
								target="_blank"
								rel="noopener noreferrer nofollow"
							>
								<span class="visually-hidden">Etherscan</span>
							</a>
						</li>
					</ul>
				</FadeDown>
			</nav>
		</PageContent>
	</header>
</template>

<script>
import PageContent from '../PageContent';

import { FadeDown } from '~/components/animation';

export default {
	components: {
		FadeDown,
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
  padding: 3em 0 0.625em;
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

.navigation-link {
	width: 1.75em;
	height: 1.75em;
	display: block;

	border: none;
	background: none;
	box-shadow: none;
	box-shadow: 4px 0px 0px #111111, -4px 0px 0px #111111, 0px -4px 0px #111111, 0px 4px 0px #111111;

	background-position: center;
	background-size: 70%;
	background-repeat: no-repeat;
}

.navigation-link.twitter {
	background-color: #1CA1F1;
	background-image: url('./images/twitter.png');
}

.navigation-link.discord {
	background-color: #5662F6;
	background-image: url('./images/discord.png');
}

.navigation-link.etherscan {
	background-color: #21325B;
	background-image: url('./images/etherscan.png');
	background-size: 100%;
}

.navigation-list {
	margin: 0 0 0 auto;
	font-size: 0.875em;
}

.navigation-item {
	display: inline-block;
	vertical-align: middle;
	margin: 0 0 0 0.75em;
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