<template>
	<section class="wave-section">
		<div class="water">
			<img
				src="./images/animals/rhino.png"
				class="animal-in-rubber-ring"
				alt="Rhino in the rubber ring"
				width="250"
				height="250"
			/>

			<img
				src="./images/wave.png"
				class="wave third-wave"
				alt="Wave"
				width="415"
				height="250"
			/>

			<img
				src="./images/animals/fur-seal.png"
				class="animal-on-wave third-wave"
				alt="Fur seal on the board"
				width="250"
				height="250"
			/>

			<img
				src="./images/reversed-wave.png"
				class="wave second-wave"
				alt="Wave"
				width="415"
				height="250"
			/>
			<img
				src="./images/animals/lion.png"
				class="animal-on-wave second-wave"
				alt="Lion on the board"
				width="250"
				height="250"
			/>

			<img
				src="./images/wave.png"
				class="wave first-wave"
				alt="Wave"
				width="415"
				height="250"
			/>
			<img
				src="./images/animals/elephant.png"
				class="animal-on-wave first-wave"
				alt="Elephant on the board"
				width="250"
				height="250"
			/>
		</div>
	</section>
</template>

<script>
export default {
};
</script>

<style scoped>
.wave-section {
	background-color: #75D0FD;
	height: 600px;
	position: relative;
	padding-top: 150px;
	overflow: hidden;

	background-image: url('./images/clouds.svg');
	background-size: 250px auto;
	background-position: 0 7%;
	background-repeat: repeat-x;
	border-bottom: calc(var(--pixel-size) * 2) solid var(--color-background-secondary);
}

.water {
	background-image: url('./images/water-glitter.svg');
	background-size: 250px auto;
	background-position: 0;
	background-repeat: repeat;

	height: 100%;
}

.wave {
	width: 415px;
	height: 250px;

	position: absolute;
	right: 0em;

	animation: move 20s cubic-bezier(0.1, -0.6, 0.2, 0) infinite;
	animation-delay: 0s;
	bottom: 5em;
}

.animal-on-wave, .animal-in-rubber-ring {
	width: 250px;
	height: 250px;

	position: absolute;
	right: 7em;

	animation: move 20s cubic-bezier(0.1, -0.6, 0.2, 0) infinite;
	animation-delay: 0s;
	bottom: 5em;
}

.animal-in-rubber-ring {
	animation-delay: -30s;
	bottom: initial;
	top: 4em;
	animation-duration: 160s;
	animation-direction: reverse;
}

.first-wave {
	animation-duration: 16s;
	animation-delay: -6s;
}

.second-wave {
	animation-delay: -12s;
	bottom: 7em;
	animation-direction: reverse;
	animation-duration: 22s;
}

.third-wave {
	animation-delay: -20s;
	bottom: 9em;
	animation-duration: 28s;
}

.animal-on-wave.second-wave {
	right: 1em;
}

@keyframes move {
  0% {
    transform: translateX(500px);
  }
  100% {
    transform: translateX(calc(-1 * 100vw - 500px));
  }
}

</style>