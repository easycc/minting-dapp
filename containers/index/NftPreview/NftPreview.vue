<template>
	<DarkTheme>
		<section class="about-us-section">
			<PageContent class="content">
				<h2 class="title">
					Preview a random NFT<br />
					by rolling the slider
				</h2>
				<Icon name="arrow-bottom" class="tip-icon" />

				<div class="boxes-list-wrapper">
					<ul
						class="boxes-list"
						:class="{ 'boxes-list-in-roll': rollStarted }"
						:style="{
							width: `calc((var(--box-size) + var(--box-margin) * 2) * ${totalBoxesAmount})`,
							animationDuration: `${ROLL_DURATION_IN_SECONDS}s`
						}"
					>
						<li
							v-for="(box, index) in totalBoxesAmount"
							:key="box"
							class="box-item"

							:style="{
								marginRight: `var(--box-margin)`,
								marginLeft: `var(--box-margin)`
							}"
						>
							<div
								class="nft-image-wrapper"
								:style="`--shadow-color: ${boxParams(index).shadow}`"
							>
								<img
									v-if="index === startElementIndex"
									:src="nfts[index].src"
									width="160"
									height="auto"
									alt="NFT"
									class="nft-image"
								/>
							</div>

							<div
								class="box-image-wrapper"
								:class="{
									'box-image-wrapper-open': openBox && index === startElementIndex
								}"
							>
								<img
									:src="boxParams(index).src"
									width="160"
									height="auto"
									alt="Hidden image - unknown NFT"
									class="box-image"
								/>
							</div>

							<Tooltip v-if="index === 4 || index === 16" class="with-mouse">
								<template v-slot:trigger>
									<img src="./images/features/mouse.png" alt="Mouse" />
								</template>

								<p class="speach-balloon-title">
									Squeak squeak
								</p>
							</Tooltip>

							<Tooltip v-if="index === 3 || index === 15" class="with-scull">
								<template v-slot:trigger>
									<img src="./images/features/scull.png" alt="Scull" />
								</template>

								<p class="speach-balloon-title">
									Arghhh
								</p>
							</Tooltip>
						</li>
					</ul>
				</div>

				<Button
					class="roll-button"
					:title="buttonTitle"
					:disabled="rollStarted"
					@click="roll"
				/>
			</PageContent>
		</section>
	</DarkTheme>
</template>

<script>
import nfts from './images/nfts';

import { DarkTheme } from '~/components/Themes';
import { Button } from '~/components/buttons';
import { Icon } from '~/components/Icon';
import { Tooltip } from '~/components/Flyout';
import { PageContent } from '~/components/PageLayout';
import { shuffle, randomElement } from '~/utils/array';

export default {
	components: {
		DarkTheme,
		PageContent,
		Tooltip,
		Button,
		Icon
	},

	data () {
		return {
			ROLL_DURATION_IN_SECONDS: 3,
			START_ELEMENT_OFFSET: 3,

			rollCounter: 0,

			nfts: shuffle(nfts),

			rollStarted: false,
			openBox: false
		};
	},

	computed: {
		middleViewportBoxIndex () {
			const HALF = 2;

			return Math.round(this.totalBoxesAmount / HALF) - 1;
		},

		totalBoxesAmount () {
			return this.nfts.length;
		},

		startElementIndex () {
			return this.START_ELEMENT_OFFSET;
		},

		endElementIndex () {
			return this.totalBoxesAmount - this.START_ELEMENT_OFFSET - 1;
		},

		buttonTitle () {
			let buttonTitle;
			let { rollCounter } = this;

			switch (rollCounter) {
				case 0:
					buttonTitle = 'Let’s roll it!';
					break;

				case 1:
					buttonTitle = 'Roll it again!';
					break;

				case 2:
					buttonTitle = 'Final roll!';
					break;

				default:
					buttonTitle = 'Let’s roll it!';
			}

			return buttonTitle;
		}
	},

	methods: {
		roll () {
			let { rollCounter, totalBoxesAmount } = this;

			this.openBox = false;
			this.rollStarted = true;
			const MILISECONDS_IN_SECOND = 1000;

			setTimeout(() => {
				if (rollCounter + 1 === totalBoxesAmount) {
					this.rollCounter = 0;
				}
				else {
					this.rollCounter++;
				}

				this.rollStarted = false;
				this.openBox = true;
			}, this.ROLL_DURATION_IN_SECONDS * MILISECONDS_IN_SECOND);
		},

		randomShadowColor () {
			return randomElement(this.nfts.map(nft => nft.color));
		},

		boxParams (index) {
			let { START_ELEMENT_OFFSET, startElementIndex, endElementIndex } = this;
			let src;
			let shadow;

			let offsetBetweenStartAndEnd = endElementIndex - startElementIndex;

			if (index < startElementIndex + START_ELEMENT_OFFSET) {
				shadow = nfts[index].color;
			}

			else if (index >= endElementIndex - START_ELEMENT_OFFSET && index <= endElementIndex + START_ELEMENT_OFFSET) {
				shadow = nfts[index - offsetBetweenStartAndEnd].color;
			}

			else {
				shadow = this.randomShadowColor();
			}

			switch (index) {
				case 4:
					src = require('./images/hidden/bitten-off.png');
					break;

				case 16:
					src = require('./images/hidden/bitten-off.png');
					break;

				default:
					src = require('./images/hidden/default.png');
			}

			return { src, shadow };
		}
	}
};
</script>

<style scoped>
.about-us-section {
	background-color: #252525;
	text-align: center;
	overflow: hidden;
}

.content {
	padding-left: 0;
	padding-right: 0;
	max-width: initial;
}

.title {
	text-align: center;
	width: 100%;
}

.tip-icon {
	font-size: 1.25em;
	opacity: 0.4;
	display: inline-block;
	margin-bottom: 1em;
}

.boxes-list-wrapper {
	--box-margin: 2em;
	--box-size: 15rem;


	margin-bottom: 2rem;
	position: relative;
	height: var(--box-size);
}

@media screen and (max-width: 576px) {
	.boxes-list-wrapper {
		--box-margin: 1.25em;
		--box-size: 10rem;
	}
}

.boxes-list {
	white-space: nowrap;
	text-align: center;
	height: inherit;

	position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(calc(-1 * (var(--box-margin) + var(--box-size) / 2) * 7));
}


.boxes-list-in-roll {
	animation-name: roll;
	animation-timing-function: easy-in-out;
}

@keyframes roll {
	0% {
		transform: translateX(calc(-1 * (var(--box-margin) + var(--box-size) / 2) * 7));
	}
	100% {
		transform: translateX(calc(-100% - (-1 * (var(--box-margin) + var(--box-size) / 2) * 7)));
	}
}


.box-item {
	display: inline-block;
	vertical-align: bottom;
	margin: 0;
	height: inherit;
	position: relative;

	background-repeat: no-repeat;
	background-size: contain;

	height: var(--box-size);
	width: var(--box-size);
}

.with-mouse {
	position: absolute;
	z-index: 1;
	left: calc(-1 * var(--box-size) / 4);
	bottom: calc(-1 * var(--box-size) / 14);
	width: calc(var(--box-size) / 2.5);
	height: calc(var(--box-size) / 2.5);
}

.with-scull {
	position: absolute;
	z-index: 1;
	left: calc(-1 * var(--box-size) / 2.35);
	bottom: calc(-1 * var(--box-size) / 14);
	width: calc(var(--box-size) / 3);
	height: calc(var(--box-size) / 2.5);
}

.nft-image, .box-image {
	width: var(--box-size);
	height: inherit;
}

.nft-image {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
}

.nft-image-wrapper:before {
	content: '';
	display: block;
	z-index: -1;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
	position: absolute;
	width: 50%;
	height: 50%;
	background: transparent;
	border-radius: 50%;
	box-shadow: 0px 0px calc(var(--box-size) / 2) calc(var(--box-size) / 4) var(--shadow-color);
}

.box-image {
	z-index: 1;
	position: relative;
}


.box-image-wrapper {
	position: relative;
	transform-style: preserve-3d;
	transform: rotateX(0deg);
	transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
	transform-origin: 100% 100%;
}

.box-image-wrapper:after {
	content: '';
	display: block;
	width: 100%;
	height: 1em;
	position: absolute;
	z-index: 2;
	top: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	transform: rotateX(90deg);
	transform-origin: 0% 0%;


	background: #C78751;
	border-left: calc(var(--box-size) / 30) solid #111111;
	border-top: calc(var(--box-size) / 30) solid #111111;
	border-right: calc(var(--box-size) / 30) solid #111111;

	box-sizing: border-box;

	transform: rotateX(90deg);
}

.box-image-wrapper-open {
	transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
	transform: rotateX(90deg);
}

.box-image-wrapper-open:after {
	height: 0;
	padding: 0;
	border-bottom: 0;
}

.roll-button {
	background-color: #fb6400;
}

.speach-balloon-title {
	font-size: 1.25em;
	max-width: 16rem;
	padding: 1em;
	margin: 0;
	text-align: center;
	display: block;
	width: 100%;
	margin: 0 auto;
}

</style>