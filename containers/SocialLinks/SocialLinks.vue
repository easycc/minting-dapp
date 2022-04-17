<template>
	<ul class="social-links-list">
		<li class="social-link-item">
			<a
				href="https://twitter.com/CircusEscape"
				class="navigation-link twitter"
				target="_blank"
				rel="noopener noreferrer nofollow"
			>
				<span class="visually-hidden">Twitter</span>
			</a>
		</li>

		<li class="social-link-item">
			<a
				href="https://discord.gg/UJ5pchvqDx"
				class="navigation-link discord"
				target="_blank"
				rel="noopener noreferrer nofollow"
			>
				<span class="visually-hidden">Discord</span>
			</a>
		</li>

		<li class="social-link-item">
			<a
				:href="`https://etherscan.io/address/${config.contractAddress}`"
				class="navigation-link etherscan"
				target="_blank"
				rel="noopener noreferrer nofollow"
			>
				<span class="visually-hidden">Etherscan</span>
			</a>
		</li>
	</ul>
</template>

<script>
import config from '~/collection/config.json';

export default {
	data () {
		return {
			config
		};
	}
};
</script>

<style scoped>


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

.social-links-list {
	margin: 0 0 0 auto;
	font-size: 0.875em;
}

.social-link-item {
	display: inline-block;
	vertical-align: middle;
	margin: 0 0.5em;
}
</style>