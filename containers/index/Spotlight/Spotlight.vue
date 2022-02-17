<template>
	<section class="sky-section">
		<PageContent class="content">
			<div class="text-wrapper">
				<h1 class="title">
					<small>Circus</small>
					Escape
				</h1>
				<!-- <p> -->
				<!-- They were forced to walk a tightrope, juggle, follow commands. -->
				<!-- </p> -->
			</div>

			<div class="circus-wrapper">
				<img
					src="./images/circus.png"
					class="circus"
					alt="Circus on fire"
					width="585"
					height="400"
				/>
			</div>

			<Button
				title="View on opensea"
				kind="primary"
				href="https://opensea.io/collection/circus-escape"
			/>
		</PageContent>
	</section>
</template>

<script>
import { PageContent } from '~/components/PageLayout';
import { Button } from '~/components/buttons';

export default {
	components: {
		PageContent,
		Button
	}
};
</script>

<style scoped>
.sky-section {
	overflow: hidden;
	background-color: #8EC6F4;
	background-image:
		url('./images/flags.png'),
		linear-gradient(180deg,
			#8EC6F4 0%,
			#8EC6F4 440px,
			#ECCD94 440px,
			#ECCD94 100%
		);
	background-repeat: repeat-x;
	background-size: 250px auto, 100%;
	background-position: center 0, 0 0;
	text-align: center;
	position: relative;
	border-bottom: calc(var(--pixel-size) * 2) solid var(--color-background-secondary);
}

.sky-section:before {
	content: '';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 440px;


	background-image:
		url('./images/clouds.svg');
	background-repeat: repeat-x;
	background-size: 750px auto;
	background-position: calc(50% + 375px) 0;
}

.content {
	padding-top: 6rem;
	position: relative;
	z-index: 2;
}

.text-wrapper {
	max-width: 42rem;
	margin-left: auto;
	margin-right: auto;
}

.title {
	font-size: calc(3.5em + 1vw);
	width: 100%;
	display: block;
	text-shadow: initial;
	line-height: 1.075;
	text-shadow: 0px 0.0375em 0px rgba(0, 0, 0, 0.4);
	letter-spacing: 0.01em;
}

.title small {
	font-size: 0.375em;
	display: block;
	text-shadow: 0px 0.075em 0px rgba(0, 0, 0, 0.4);
}

.circus-wrapper {
	height: 400px;
	margin-bottom: 4em;
}

.circus {
	position: absolute;
	left: 50%;
	max-width: initial;
	transform: translate(-50%, 0);
}
</style>