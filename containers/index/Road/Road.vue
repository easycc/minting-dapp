<template>
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
				alt="Hyppo in the yellow car on the road"
				width="690"
				height="465"
			/>
		</PageContent>
	</section>
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
.road-section {
	background-color: #76757D;
	height: 160px;
	position: relative;

	background-image: url('./images/road-markings.svg');
	background-size: 100px calc(var(--pixel-size) * 2);
	background-position: 0 calc(50% - var(--pixel-size));
	background-repeat: repeat-x;

	border-top: calc(var(--pixel-size) * 2) solid #575471;
	border-bottom: calc(var(--pixel-size) * 2) solid #575471;
}

.hyppo {
	width: 205px;
	height: 185px;

	position: absolute;
	bottom: 2em;

	left: 10vw;
}

.crocodile {
	width: 230px;
	height: 155px;

	position: absolute;
	right: 10vw;

	bottom: 1.5em;
}

@media screen and (max-width: 576px) {
	.hyppo {
		top: -2em;
		bottom: initial;
		transform: none;
	}

	.road-section {
		height: 400px;
	}
}

</style>