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
						:class="{ 'boxes-list-in-roll': inRoll }"
						:style="{
							width: `calc((var(--box-size) + var(--box-margin) * 2) * ${BOXES_AMOUNT})`,
							animationDuration: `${ROLL_DURATION_IN_SECONDS}s`
						}"
					>
						<li
							v-for="(box, index) in BOXES_AMOUNT"
							:key="box"
							class="box-item"
							:style="{ marginRight: `var(--box-margin)`, marginLeft: `var(--box-margin)` }"
						>
							<img
								:src="boxParams(index).src"
								width="160"
								height="auto"
								alt="Hidden image - unknown NFT"
								class="box-image"
							/>


							<Tooltip v-if="index === 4 || index === 16" class="with-mouse">
								<template v-slot:trigger>
									<img src="./images/features/mouse.png" alt="Mouse" />
								</template>

								<p class="vote-title">
									Squeak squeak
								</p>
							</Tooltip>

							<Tooltip v-if="index === 3 || index === 15" class="with-scull">
								<template v-slot:trigger>
									<img src="./images/features/scull.png" alt="Scull" />
								</template>

								<p class="vote-title">
									Arghhh
								</p>
							</Tooltip>
						</li>
					</ul>
				</div>

				<Button
					class="roll-button"
					title="Let's roll it!"
					:disabled="inRoll"
					@click="roll"
				/>
			</PageContent>
		</section>
	</DarkTheme>
</template>

<script>
import { setTimeout } from 'timers';

import { DarkTheme } from '~/components/Themes';
import { Button } from '~/components/buttons';
import { Icon } from '~/components/Icon';
import { Tooltip } from '~/components/Flyout';
import { PageContent } from '~/components/PageLayout';

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
			BOXES_AMOUNT: 19,
			ROLL_DURATION_IN_SECONDS: 3,
			rollCounter: 0,

			inRoll: false
		};
	},

	methods: {
		roll () {
			this.rollCounter++;
			this.inRoll = true;
			const MILISECONDS_IN_SECOND = 1000;

			setTimeout(() => {
				this.inRoll = false;
			}, this.ROLL_DURATION_IN_SECONDS * MILISECONDS_IN_SECOND);
		},

		boxParams (index) {
			let src = require('./images/hidden/default.png');
			let className = '';

			switch (index) {
				case 4:
					src = require('./images/hidden/bitten-off.png');
					break;

				case 16:
					src = require('./images/hidden/bitten-off.png');
					break;
			}

			return { src };
		}
	}
};
</script>

<style scoped>
.about-us-section {
	background-color: #252525;
	text-align: center;
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


	overflow: hidden;
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
	bottom: calc(-1 * var(--box-size) / 25);
	width: calc(var(--box-size) / 2.5);
	height: calc(var(--box-size) / 2.5);
}

.with-scull {
	position: absolute;
	z-index: 1;
	left: calc(-1 * var(--box-size) / 4);
	bottom: calc(-1 * var(--box-size) / 25);
	width: calc(var(--box-size) / 3);
	height: calc(var(--box-size) / 2.5);
}


.box-image {
	width: var(--box-size);
	height: inherit;
}

.roll-button {
	background-color: #fb6400;
}


</style>