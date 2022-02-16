<template>
	<Page class="page">
		<template v-slot:header>
			<!-- <Header /> -->
		</template>

		<AboutCollection />
		<GetAnimalsBack />
		<NftPreview />
		<Wave />
		<AboutUs />
		<Road />
		<Rope />

		<div
			class="elephant"
			:class="{ fallen }"
			:style="`--fall-height: ${fallHeight}px; --fall-duration: ${topOffset / 300}s; --rotates: ${fallHeight / 100}deg`"
		>
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
					Thanks! I'm ok
				</template>
			</p>
		</div>

		<template v-slot:footer>
			<!-- <Footer /> -->
		</template>
	</Page>
</template>

<script>
import { setTimeout } from 'timers';

import { Page, Header, Footer } from '~/components/PageLayout';
import {
	AboutUs, Road, GetAnimalsBack, NftPreview, AboutCollection, Rope, Wave
} from '~/containers/index';
import { getClientRectInParent } from '~/helpers/dom';

export default {
	layout: 'dark-theme',

	components: {
		Page,
		AboutUs,
		Road,
		AboutCollection,
		GetAnimalsBack,
		NftPreview,
		Rope,
		Wave,
		Header,
		Footer
	},

	data () {
		return {
			balloons: ['red', 'yellow', 'blue'],
			fallen: false,
			thankful: false,
			fallHeight: 0,
			topOffset: 0
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

				this.fallHeight = elephantRect.top - 50;
				this.topOffset = document.body.offsetHeight - elephantRect.top;

				this.fallen = true;

				const MILISECONDS_IN_SECONDS = 1000;
				const DELAY = 500;

				setTimeout(() => {
					this.thankful = true;
				}, this.topOffset / 300 * MILISECONDS_IN_SECONDS + DELAY);
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
  }
  100% {
    top: -170px;
  }
}

.elephant {
	display: inline-block;
	position: absolute;
	padding-top: 110px;
	z-index: 10;
	height: 225px;

	bottom: 0;
	right: calc(0.5em + 3vw);
	animation: move 50s linear infinite;
	animation-delay: 0s;
}

.elephant.fallen {
	animation: fall var(--fall-duration) ease-in;
}
.elephant.fallen .elephant-image {
	animation: rotate var(--fall-duration) ease-in;
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
  }
  100% {
    top: calc(100% - 225px);
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
	left: 50%;
}

.red-balloon {
	transform: translate(-50%, 0);
}

.yellow-balloon {
	transform: translate(-90%, 0);
	top: calc(var(--pixel-size) * 2);
}

.blue-balloon {
	transform: translate(-10%, 0);
	top: calc(var(--pixel-size) * 2);
}
</style>