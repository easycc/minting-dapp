<template>
	<section class="sky-section">
		<PageContent class="content">
			<div class="text-wrapper">
				<h1 class="title">
					<small>Circus</small>
					Escape
				</h1>
				<p class="subtitle">
					Join this incredible story
				</p>
			</div>


			<!-- <Button
				title="View on opensea"
				kind="primary"
				href="https://opensea.io/collection/circus-escape"
				class="primary-button"
			/> -->

			<div class="circus-wrapper">
				<div class="fire">
					<img
						src="./images/circus/circus.png"
						class="circus"
						alt="Circus on fire with escaping animals"
						width="585"
						height="400"
					/>


					<div class="circus-curtain-left">
						<img
							src="./images/circus/circus-curtain-left.png"
							alt="Circus left curtain"
							width="205"
							height="315"
							class="circus-curtain-image"
						/>

						<!--  -->

						<div class="animal rhino">
							<img
								src="./images/animals/rhino.png"
								alt="Rhino is runnnig from circus"
								width="170"
								height="155"
							/>
						</div>
					</div>


					<div class="circus-curtain-right">
						<img
							src="./images/circus/circus-curtain-right.png"
							alt="Circus right curtain"
							width="205"
							height="315"
							class="circus-curtain-image"
						/>

						<!--  -->

						<div class="animal elephant">
							<img
								src="./images/animals/elephant.png"
								alt="Elephant is runnnig from circus"
								width="180"
								height="155"
							/>
						</div>

						<div class="animal crocodile">
							<img
								src="./images/animals/lion.png"
								alt="Crocodile is running from circus"
								width="155"
								height="155"
							/>
						</div>
					</div>

					<div class="circus-top-part">
						<img
							src="./images/circus/giraffe.png"
							class="giraffe"
							alt="Giraffe's head peeking out of a hole in the ceiling of the circus"
							width="90"
							height="165"
						/>
					</div>
				</div>
			</div>
			<PaymentForm />

			<img
				src="./images/animals/crocodile.png"
				class="bottom-crocodile"
				alt="Crocodile with gasoline is smiling"
				width="322"
				height="240"
			/>
		</PageContent>
	</section>
</template>

<script>
import { PageContent } from '~/components/PageLayout';
import { Button } from '~/components/buttons';
import { PaymentForm } from '~/components/Payment';

export default {
	components: {
		PageContent,
		Button,
		PaymentForm
	}
};
</script>

<style scoped>
.sky-section {
	--escape-duration: 10s;

	overflow: hidden;
	background-color: #8EC6F4;
	background-image:
		url('./images/grass.png'),
		url('./images/trees.png'),
		url('./images/snow.png'),
		/* url('./images/flags.png'), */
		linear-gradient(180deg,
			#8EC6F4 0%,
			#8EC6F4 440px,
			#A0CB8A 440px,
			#A0CB8A 100%
		);
	background-size:
		400px auto,
		1000px auto,
		350px auto,
		/* 250px auto, */
		100%;
	background-position:
		0 bottom,
		calc(41% + 2vw) 405px,
		calc(30% - 330px + 1vw) 395px,
		/* center 0, */
		0 0;
	background-repeat:
		repeat-x,
		no-repeat,
		no-repeat,
		/* repeat-x, */
		repeat-x;
	text-align: center;
	position: relative;
	border-bottom: calc(var(--pixel-size) * 2) solid var(--color-background-secondary);
	z-index: 0;
}

.sky-section:before {
	content: '';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	width: 100%;
	height: 440px;

	background-image:
		url('./images/clouds.svg');

	background-repeat: repeat-x;
	background-size: 750px auto;
	background-position: calc(50% + 375px) 0;
	animation: bgMove 50s linear infinite;
}


@keyframes bgMove {
  0% {
		background-position: 0 7%;
  }
  100% {
		background-position: 750px 7%;
  }
}

.content {
	padding-top: 4.5rem;
	padding-bottom: 150px;
	z-index: 2;
}


@media screen and (max-width: 576px) {
	.content {
		padding-top: 7rem;
	}
}

.text-wrapper {
	max-width: 42rem;
	margin-left: auto;
	margin-right: auto;
	position: relative;
	z-index: 1;
}

.title {
	font-size: calc(3.5em + 1vw);
	width: 100%;
	display: block;
	text-shadow: initial;
	line-height: 1.075;
	text-shadow: 0px 0.0375em 0px rgba(0, 0, 0, 0.65);
	letter-spacing: 0.01em;
	margin-bottom: 0.5rem;
}

.title small {
	font-size: 0.375em;
	letter-spacing: 0.05em;
	display: block;
	text-shadow: 0px 0.075em 0px rgba(0, 0, 0, 0.65);
}

.subtitle {
	color: rgb(247, 247, 247);
	margin-bottom: 2rem;
	text-shadow: 0px 0.075em 0px rgba(0, 0, 0, 0.65);
}

.circus-wrapper {
	display: block;
	width: 100%;
	margin-bottom: 2em;
	height: 370px;
}

.fire {
	width: 535px;
	display: block;
	position: absolute;
	left: 50%;
	height: inherit;
	transform: translate(-50%, 0);

	background-image: url('./images/circus/sprite.png');
	background-position: 0 0px;
	background-size: cover;
	background-repeat: no-repeat;

	animation: fire 0.8s steps(8) infinite;
}

.circus {
	display: block;
	margin: 0;
	max-width: initial;
	height: inherit;
	width: inherit;
}


@keyframes fire {
	100% {
		background-position: 0 -2960px;
	}
}

.circus-top-part {
	position: absolute;
	height: 215px;
	width: 100%;
	overflow: hidden;
	top: 0;
	left: 0;
}

.circus-curtain-image {
	display: block;
	position: absolute;
	bottom: 0;
	z-index: 2;
}

.circus-curtain-left,
.circus-curtain-right {
	display: block;
	width: 100%;
	height: 100%;
}

.circus-curtain-left {
	--start-point-x: calc(-50% - 100px);
}

.circus-curtain-left .circus-curtain-image {
	left: 65px;
	animation: curtain-left var(--escape-duration) linear infinite;
}

.circus-curtain-right .circus-curtain-image {
	right: 65px;
	animation: curtain-right var(--escape-duration) linear infinite;
}


.circus-curtain-right {
	--start-point-x: calc(-50% + 60px);
}


.giraffe {
	position: absolute;
	z-index: 3;
	left: 290px;
	top: 50px;
	animation: giraffe 6s linear infinite;
}


@keyframes giraffe {
	0% {
		transform: translate(0, 100%);
	}
	20% {
		transform: translate(0, 100%);
	}
	30% {
		transform: translate(0, 0);
	}
	40% {
		transform: translate(0, 0);
	}
	40.01% {
		transform: scale(-1, 1) translate(-20px, 0);
	}
	60% {
		transform: scale(-1, 1) translate(-20px, 0);
	}
	60.01% {
		transform: scale(1, 1);
	}
	70.00% {
		transform: scale(1, 1);
	}
	100% {
		transform: translate(0, 100%);
	}
}

.animal {
	position: absolute;
	z-index: 1;
	top: 180px;
	animation: escape var(--escape-duration) ease-out infinite;
	transform: translateX(-50%);
	left: 50%;
}

.animal img {
	display: block;
	animation: walk 400ms ease-in-out infinite;
}


.elephant {
	--end-point-x: -400px;
	--end-point-y: 600px;
	animation-delay: 0s;
}

.crocodile {
	--end-point-x: -600px;
	--end-point-y: 600px;
	animation-delay: -4s;
}

.rhino {
	--end-point-x: 800px;
	--end-point-y: 600px;
	animation-delay: -7s;
}


@keyframes escape {
	0% {
		transform: translate(var(--start-point-x), 0);
	}

	100% {
		transform: translate(calc(var(--start-point-x) + var(--end-point-x)), var(--end-point-y));
	}
}

@keyframes walk {
	0% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(10px);
	}

	100% {
		transform: translateY(0px);
	}
}

@keyframes curtain-left {
	0% {
		z-index: 0;
	}
	25% {
		z-index: 0;
	}

	25.01% {
		z-index: 2;
	}

	50% {
		z-index: 2;
	}

	50.01% {
		z-index: 0;
	}
	99.99% {
		z-index: 0;
	}

	100% {
		z-index: 0;
	}
}

@keyframes curtain-right {
	0% {
		z-index: 2;
	}

	30% {
		z-index: 2;
	}

	30.01% {
		z-index: 0;
	}
	55% {
		z-index: 0;
	}

	55.01% {
		z-index: 2;
	}


	99.99% {
		z-index: 2;
	}
	100% {
		z-index: 2;
	}
}

.bottom-crocodile {
	position: absolute;
	right: 0;
	bottom: -60px;
	z-index: 1;
	animation: walk 400ms ease-in-out infinite;

	display: inline-block;
}

</style>