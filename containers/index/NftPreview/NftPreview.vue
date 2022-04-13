<template>
	<DarkTheme>
		<section class="about-us-section">
			<PageContent class="content">
				<h2 class="title">
					Preview a random NFT<br />
					by rolling the slider
				</h2>
				<Icon name="arrow-bottom" class="tip-icon" />

				<div
					class="boxes-list-wrapper"
					:style="`
						--roll-end-position: calc(50% - (var(--box-margin) * 2 + var(--box-size)) * (${totalBoxesAmount} - 3 * 2 - 1));
						--start-element-offset: ${START_ELEMENT_OFFSET}`"
				>
					<ul
						class="boxes-list"
						:class="{ 'boxes-list-in-roll': rollStarted }"
						:style="{
							width: `calc((var(--box-size) + var(--box-margin) * 2) * ${totalBoxesAmount})`,
							animationDuration: `${ROLL_DURATION_IN_SECONDS}ms`,
							transform: `translateX(
								calc(-1 * (var(--box-margin) + var(--box-size) / 2) * ${START_ELEMENT_OFFSET * 2 + 1})`
						}"
					>
						<li
							v-for="(box, index) in totalBoxesAmount"
							:key="box"
							class="box-item"
							:style="`--shadow-color: ${boxParams(index).shadow}`"
						>
							<transition-group
								mode="out-in"
								tag="div"
								name="flip"
								class="box-item-images"
							>
								<div
									v-show="openBox && index === startElementIndex"
									key="nft-image-wrapper"
									class="nft-image-wrapper"
								>
									<img
										:src="nfts[rollsCounter].src"
										width="160"
										height="auto"
										alt="NFT"
										class="nft-image"
									/>
								</div>

								<div
									v-show="!openBox || index !== startElementIndex"
									key="box-image-wrapper"
									class="box-image-wrapper"
								>
									<img
										:src="boxParams(index).src"
										width="160"
										height="auto"
										alt="Hidden image - unknown NFT"
										class="box-image"
									/>
								</div>
							</transition-group>

							<Tooltip
								v-if="index === 4 || index === 16"
								class="with-mouse"
							>
								<template v-slot:trigger>
									<img src="./images/features/mouse.png" alt="Mouse" />
								</template>

								<p class="speach-balloon-title">
									Squeak squeak
								</p>
							</Tooltip>

							<Tooltip
								v-if="index === 3 || index === 15"
								class="with-scull"
							>
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
			ROLL_DURATION_IN_SECONDS: 3000,
			START_ELEMENT_OFFSET: 3,

			rollsCounter: 0,
			rollStarted: false,

			nfts: shuffle(nfts),

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
			let { rollsCounter } = this;

			switch (rollsCounter) {
				// case 0:
				// 	buttonTitle = 'Let’s roll it!';
				// 	break;

				// case 1:
				// 	buttonTitle = 'Roll it again!';
				// 	break;

				// case 2:
				// 	buttonTitle = 'Final roll!';
				// 	break;

				default:
					buttonTitle = 'Let’s roll it!';
			}

			return buttonTitle;
		}
	},

	methods: {
		roll () {
			let { rollsCounter, totalBoxesAmount, ROLL_DURATION_IN_SECONDS } = this;

			this.openBox = false;
			this.rollStarted = true;

			const HALF = 2;
			let halfDuration = this.ROLL_DURATION_IN_SECONDS / HALF;

			setTimeout(() => {
				if (rollsCounter + 1 === totalBoxesAmount) {
					this.rollsCounter = 0;
				}
				else {
					this.rollsCounter++;
				}
			}, halfDuration);

			setTimeout(() => {
				this.rollStarted = false;
				this.openBox = true;
			}, ROLL_DURATION_IN_SECONDS);
		},

		randomShadowColor () {
			return randomElement(this.nfts.map(nft => nft.color));
		},

		boxParams (index) {
			let { START_ELEMENT_OFFSET, startElementIndex, endElementIndex, rollsCounter } = this;
			let src;
			let shadow;

			let offsetBetweenStartAndEnd = endElementIndex - startElementIndex;

			if (index === startElementIndex || index === endElementIndex) {
				shadow = nfts[rollsCounter].color;
			}

			else if (index < startElementIndex + START_ELEMENT_OFFSET) {
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
	border-bottom: calc(var(--pixel-size) * 2) solid var(--color-background-secondary);
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
		--box-size: 50vw;
	}
}

.boxes-list {
	white-space: nowrap;
	text-align: center;
	height: inherit;

	position: absolute;
	left: 50%;
	top: 0;
}


.boxes-list-in-roll {
	animation-name: roll;
	animation-timing-function: ease-in-out;
}

@keyframes roll {
	0% {
		left: 50%;
	}
	100% {
		left: var(--roll-end-position);
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

	margin-right: var(--box-margin);
	margin-left: var(--box-margin);
	z-index: 0;
}

.box-item-images {
  transform-style: preserve-3d;
  perspective: 550px;
  position: relative;
}

.box-item-images > * {
  backface-visibility: hidden;
}

.box-item:before {
	content: '';
	display: block;
	z-index: -1;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
	position: absolute;
	width: 1px;
	height: 1px;
	background: transparent;
	border-radius: 50%;
	box-shadow: 0px 0px calc(var(--box-size) / 1) calc(var(--box-size) / 2) var(--shadow-color);
}

.with-mouse {
	position: absolute;
	z-index: 1;
	left: calc(-1 * var(--box-size) / 5);
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

.box-image {
	z-index: 1;
	position: relative;
}


.roll-button {
	background-color: #fb6400;
}
.roll-button:hover {
	background-color: #fb9700;
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


.flip-leave-active,
.flip-enter-active {
  opacity: 1;
  transform: rotateY(0deg);
  transition: all 0.8s;
}

.flip-enter {
  transform: rotateY(-180deg);
  opacity: 0;
}
.flip-leave-to {
  transform: rotateY(180deg);
  opacity: 0;
}
</style>