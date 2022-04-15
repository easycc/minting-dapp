<template>
	<Page class="page">
		<template v-slot:header>
			<Header />
		</template>

		<Spotlight />
		<AboutCollection />
		<GetAnimalsBack />
		<NftPreview />
		<Wave />
		<Road />
		<AboutUs />
		<!-- <Rope /> -->

		<div
			class="elephant"
			:class="{ fallen, 'thankful': thankful }"
			:style="`--fall-height: ${topOffset}px; --fall-duration: ${fallHeight / 300}s; --rotates: ${fallHeight}deg`"
		>
			<Pop>
				<Button
					v-if="balloons.includes('yellow')"
					class="yellow-balloon balloon"
					@click="popBalloon('yellow')"
				>
					<img
						src="static/flying-elephant/yellow-balloon.png"
						alt="Yellow balloon"
						width="55"
						height="100"
					/>
				</Button>
			</Pop>

			<Pop>
				<Button
					v-if="balloons.includes('blue')"
					class="blue-balloon balloon"
					@click="popBalloon('blue')"
				>
					<img
						src="static/flying-elephant/blue-balloon.png"
						alt="Blue balloon"
						width="55"
						height="100"
					/>
				</Button>
			</Pop>


			<Pop>
				<Button
					v-if="balloons.includes('red')"
					class="balloon red-balloon"
					@click="popBalloon('red')"
				>
					<img
						src="static/flying-elephant/red-balloon.png"
						alt="Red balloon"
						width="55"
						height="110"
					/>
				</Button>
			</Pop>

			<img
				ref="elephant"
				src="static/flying-elephant/elephant.png"
				class="elephant-image"
				alt="Elephant with a yellow balloon flying"
				width="180"
				height="115"
			/>

			<img
				v-if="balloons.length"
				src="static/flying-elephant/belt.png"
				class="belt"
				alt="Belt"
				width="15"
				height="40"
			/>

			<p class="message">
				<template v-if="!fallen">
					Help...
				</template>
				<template v-else-if="fallen && !thankful">
					Weeeee...
				</template>
				<template v-else>
					Ouch. Thanks!
				</template>
			</p>
		</div>

		<template v-slot:footer>
			<Footer />
		</template>
	</Page>
</template>

<script>
import { setTimeout } from 'timers';

import { Pop } from '~/components/animation';
import { Page, Header, Footer } from '~/components/PageLayout';
import { LightTheme } from '~/components/Themes';
import {
	Spotlight, AboutUs, Road, GetAnimalsBack, NftPreview, AboutCollection, Wave
} from '~/containers/index';
import { getClientRectInParent } from '~/helpers/dom';

export default {
	layout: 'dark-theme',

	components: {
		Page,
		AboutUs,
		Pop,
		LightTheme,
		Spotlight,
		Road,
		AboutCollection,
		GetAnimalsBack,
		NftPreview,
		// Rope,
		Wave,
		Header,
		Footer
	},

	data () {
		return {
			balloons: ['red', 'yellow', 'blue'],
			fallen: false,
			thankful: false,
			topOffset: 0,
			fallHeight: 0
		};
	},

	methods: {
		popBalloon (name) {
			this.balloons = this.balloons.filter(balloon => balloon !== name);

			if (!this.balloons.length) {
				let elephantRect = getClientRectInParent(
					this.$refs.elephant,
					document.body
				);

				this.topOffset = elephantRect.top - 110;

				this.fallHeight = document.body.offsetHeight - elephantRect.top;

				this.fallen = true;

				const MILISECONDS_IN_SECONDS = 1000;

				setTimeout(() => {
					this.thankful = true;
				}, this.fallHeight / 300 * MILISECONDS_IN_SECONDS);
			}
		}
	}
};
</script>

<style scoped>
.page {
	position: relative;
	overflow: hidden;
}

@keyframes move {
  0% {
    top: 100%;
		right: calc(0.5em + 3vw);
  }
  100% {
		top: -225px;
		right: calc(0.5em + 3vw);
  }
}

.elephant {
	display: inline-block;
	position: absolute;
	padding-top: 110px;
	z-index: 10;
	height: 225px;

	bottom: 0;
	right: calc(100% + 500px);
	animation: move 50s linear infinite;
	animation-delay: 0s;
}

.elephant.fallen {
	animation: fall var(--fall-duration) ease-in;
}
.elephant.fallen .elephant-image {
	animation: rotate var(--fall-duration) ease-in;
}

.elephant.thankful {
	animation: walk-away 14s ease-in;
}

@keyframes walk-away {
  0% {
		right: calc(0.5em + 3vw);
  }
  20% {
    transform: translateX(0);
		right: calc(0.5em + 3vw);
  }
  100% {
    transform: translateX(calc(-1 * 100vw - 100%));
		right: calc(0.5em + 3vw);
  }
}

@media screen and (max-width: 576px) {
	.elephant.thankful {
		animation-duration: 8s;
	}
}

.message {
	display: inline-block;
	background-color: var(--color-background-primary);
	padding: 0.25em;
	box-shadow: var(--pixel-shadow);
	position: absolute;
	z-index: 3;
	bottom: 100px;
	left: 0;
	transform: translate(calc(-1 * 80%), 0);
}

.message:after {
	content: '';
	width: 0;
	height: 0;
	position: absolute;
	z-index: 2;
	right: -4px;
	bottom: 0;
	transform: translate(0, calc(100% - 4px));
	background-image: url('/static/flying-elephant/popup-angle.svg');
	background-repeat: no-repeat;
	background-size: contain;
	display: inline-block;
	width: 20px;
	height: 20px;
}

@keyframes fall {
  0% {
    top: var(--fall-height);
		right: calc(0.5em + 3vw);
  }
  100% {
    top: calc(100% - 225px);
		right: calc(0.5em + 3vw);
  }
}

@keyframes rotate {
  0% {
		transform: rotateZ(0deg);
  }
	100% {
		transform: rotateZ(var(--rotates));
	}
}

.elephant-image {
	display: block;
	width: 180px;
	height: auto;
	position: relative;
	z-index: 2;
}

.belt {
	position: absolute;
	bottom: 10px;
	right: 70px;
	z-index: 3;
}

.balloon {
	padding: 0;
	background: transparent;
	box-shadow: none;
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
}

.balloon:focus {
	outline: none;
}

.red-balloon {
	left: 37%;
}

.yellow-balloon {
	left: 22%;
	top: calc(var(--pixel-size) * 2);
}

.blue-balloon {
	left: 50%;
	top: calc(var(--pixel-size) * 2);
}
</style>