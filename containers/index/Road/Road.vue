<template>
	<div class="road-section-wrapper">
		<section class="road-section">
			<PageContent class="content">
				<img
					src="./images/hyppo.png"
					class="hyppo"
					alt="Hyppo in the yellow car on the road"
					width="615"
					height="555"
				/>

				<img
					src="./images/crocodile.png"
					class="crocodile"
					alt="Crocodile slipped on the banana"
					width="690"
					height="465"
				/>
			</PageContent>
		</section>
	</div>
</template>

<script>
import { PageContent } from '~/components/PageLayout';

export default {
	components: {
		PageContent
	}
};
</script>

<style scoped>
.road-section-wrapper {
	padding-top: 100px;
	overflow: hidden;
	margin-top: -100px;
}

.road-section {
	background-color: #76757D;
	height: 240px;
	position: relative;

	background-image: url('./images/road-markings.svg');
	background-size: 100px calc(var(--pixel-size) * 2);
	background-position: 0 calc(50% - var(--pixel-size));
	background-repeat: repeat-x;

	border-top: calc(var(--pixel-size) * 2) solid #575471;
	border-bottom: calc(var(--pixel-size) * 2) solid #575471;
}

.content {
	padding: 0;
}

.hyppo {
	width: 205px;
	height: 185px;

	position: absolute;

	right: 0;
	animation: move 10s linear infinite;
	animation-delay: 0s;
	top: -5em;
}

@keyframes move {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(calc(-1 * 100vw - 100%));
  }
}

.crocodile {
	width: 230px;
	height: 155px;

	position: absolute;
	right: 10vw;

	bottom: 1.5em;
	animation-duration: 6s;
}

@media screen and (max-width: 576px) {
	.road-section {
		height: 400px;
	}
}

</style>