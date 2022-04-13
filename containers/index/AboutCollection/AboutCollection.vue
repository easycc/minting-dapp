<template>
	<section class="sky-section">
		<div class="space-background">
			<PageContent class="content">
				<div class="text-wrapper">
					<h2 class="title">
						9 circus animals make their dreams come true
					</h2>
					<p>
						They were forced to walk a tightrope, juggle, follow commands.
					</p>

					<p>
						One day the fur seal managed to negotiate a liter of gasoline from a monkey...
					</p>
				</div>

				<AccentSpot class="accent-spot">
					<ul class="accent-spot-list">
						<li class="accent-spot-item">
							<span class="accent-spot-title">
								1
								<img
									src="./images/accent-title/gasoline.png"
									alt="Gasoline"
									width="28"
									height="auto"
									class="accent-spot-title-icon"
								/>
							</span>
							circus burned down
						</li>

						<li class="accent-spot-item">
							<span class="accent-spot-title">
								5,000
							</span>
							unique NFT
						</li>

						<li class="accent-spot-item">
							<span class="accent-spot-title">
								500,000
							</span>
							pixels used
						</li>

						<li class="accent-spot-item">
							<span class="accent-spot-title">
								0,03 ETH
							</span>
							mint price
						</li>
					</ul>
				</AccentSpot>
			</PageContent>

			<div class="sky-animation">
				<img
					src="./images/crocodile.png"
					class="crocodile"
					alt="Crocodile on the bird"
					width="250"
					height="250"
				/>
				<img
					src="./images/walrus.png"
					class="walrus"
					alt="Walrus with a pirat hat in the plane"
					width="250"
					height="250"
				/>
				<img
					src="./images/jirafa.png"
					class="jirafa"
					alt="Jirafa on the bird"
					width="250"
					height="500"
				/>
				<img
					src="./images/elephant.png"
					class="elephant"
					alt="Elephant with a watermelon hat in the UFO"
					width="250"
					height="250"
				/>
			</div>
		</div>
	</section>
</template>

<script>
import AccentSpot from '~/components/AccentSpot/AccentSpot';
import { PageContent } from '~/components/PageLayout';

export default {
	components: {
		PageContent,
		AccentSpot
	}
};
</script>

<style scoped>
.sky-section {
	overflow: hidden;
	background-color: #8EC6F4;

	background-image: url('./images/clouds.svg');
	background-size: 250px 250px;
	background-position: 0 0;
	background-repeat: repeat;
	animation: bg 16s linear infinite;
	text-align: center;
	border-bottom: calc(var(--pixel-size) * 2) solid var(--color-background-secondary);
}

.space-background {
	--space-gradient: linear-gradient(180deg, #17021E 0%, rgba(23, 2, 30, 0.7) 45%, rgba(23, 2, 30, 0) 80%);

	background-image: var(--space-gradient);
	background-size: 100% 100%;
	background-position: 0 0;
	position: relative;
}

.space-background:before {
	height: 39%;
	position: absolute;
	display: block;
	z-index: 1;
	width: 100%;
	top: 0;
	left: 0;
	content: '';
	background-image: url('./images/stars.svg');
	opacity: 0.7;
	background-repeat: repeat;
	background-size: 250px 250px;
}

.content {
	padding-bottom: 2rem;
	position: relative;
	z-index: 2;
}

.title {
	width: 100%;
	display: block;
	text-shadow: initial;
}

.text-wrapper {
	max-width: 35rem;
	padding: 0 0 2em;
	margin-left: auto;
	margin-right: auto;
}

p {
	font-size: calc(1em + 0.25vw);
}

.text-wrapper p:last-child {
	margin-bottom: 0;
}

.accent-spot {
	margin-bottom: 4rem;
}

.sky-animation {
	height: 500px;
	width: 100%;
	position: relative;
}

@keyframes move {
  0% {
		opacity: 1;
    transform: translateX(100%);
  }
  100% {
		opacity: 1;
    transform: translateX(calc(-1 * 100vw - 100%));
  }
}

@keyframes bg {
  0% {
		background-color: #8EC6F4;
		background-image: url('./images/clouds.svg');
  }
  24% {
		background-color: #8EC6F4;
		background-image: url('./images/clouds.svg');
  }
  35% {
		background-image: url('./images/none.svg');
  }
  40% {
		background-color: #17021E;
	}
  45% {
		background-image: url('./images/stars.svg');
		background-size: 250px 250px;
  }
  65% {
		background-color: #17021E;
		background-image: url('./images/stars.svg');
  }
  70% {
		background-image: url('./images/none.svg');
  }
  85% {
		background-image: url('./images/clouds.svg');
		background-color: #ECCD94;
	}
  95% {
		background-image: url('./images/clouds.svg');
		background-color: #ECCD94;
  }
  100% {
		background-color: #8EC6F4;
		background-image: url('./images/clouds.svg');
  }
}

.elephant, .walrus, .crocodile, .jirafa {
	width: 250px;
	height: auto;
	opacity: 0;

	position: absolute;

	right: 0;
	animation: move 18s linear infinite;
	animation-delay: 0s;
	top: -5em;
}

.crocodile {
	top: 0em;
	animation-delay: -10s;
	animation-duration: 20s;
}

.walrus {
	top: 5em;
	animation-delay: 0s;
	animation-duration: 16s;
}

.jirafa {
	top: 0em;
	animation-delay: -24s;
	animation-duration: 21s;
}

.elephant {
	top: initial;
	bottom: 0;
	animation-delay: -4s;
	animation-duration: 20s;
}

@media screen and (max-width: 576px) {
	.crocodile {
		animation-duration: 10s;
	}

	.walrus {
		animation-duration: 8s;
	}

	.jirafa {
		animation-duration: 10s;
		animation-delay: -28s;
	}

	.elephant {
		animation-duration: 10s;
		animation-delay: -2s;
	}
}


.accent-spot-list {
	text-align: center;
	padding: 0;
	margin: 0;
}

.accent-spot-item {
	display: inline-block;
	vertical-align: top;
	padding: 0 0.75em 0.25em;
	max-width: 10em;
	margin: 0;
}

@media screen and (max-width: 576px) {
	.accent-spot-item {
		padding-bottom: 1em;
	}
}

.accent-spot-title {
	padding-bottom: 0.25rem;
	font-size: 2.5em;
	display: block;
}

.accent-spot-title-icon {
	display: inline-block;
	vertical-align: text-bottom;
	margin-left: -0.125em;
	width: 0.666em;
	height: auto;
}
</style>