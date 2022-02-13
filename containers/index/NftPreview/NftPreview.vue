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
							:class="boxParams(index).class"
						>
							<img
								:src="boxParams(index).src"
								width="160"
								height="auto"
								alt="Hidden image - unknown NFT"
								class="box-image"
							/>
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
import { PageContent } from '~/components/PageLayout';

export default {
	components: {
		DarkTheme,
		PageContent,
		Button,
		Icon
	},

	data () {
		return {
			BOXES_AMOUNT: 15,
			ROLL_DURATION_IN_SECONDS: 5,
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
				case 7:
					className = 'with-scull';
					break;

				case 8:
					src = require('./images/hidden/bitten-off.png');
					className = 'with-mouse';
					break;
			}

			return { src, class: className };
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
	transform: translateX(-50%);
}


.boxes-list-in-roll {
	animation-name: roll;
}

@keyframes roll {
	0% {
		transform: translateX(-50%);
		animation-timing-function: cubic-bezier(.54,.15,.59,.55);
	}
	25% {
		transform: translateX(-80%);
		animation-timing-function: linear;
	}
	25.01% {
		transform: translateX(-20%);
		animation-timing-function: linear;
	}
	50% {
		transform: translateX(-50%);
		animation-timing-function: linear;
	}
	75% {
		transform: translateX(-80%);
		animation-timing-function: linear;
	}
	75.01% {
		transform: translateX(-20%);
		animation-timing-function: cubic-bezier(.41,.55,.56,.99);
	}
	100% {
		transform: translateX(-50%);
		animation-timing-function: cubic-bezier(.41,.55,.56,.99);
	}
}


.box-item {
	display: inline-block;
	vertical-align: bottom;
	margin: 0;
	height: inherit;
	position: relative;
}


.box-item.with-mouse:before {
	content: '';
	position: absolute;
	left: calc(-1 * var(--box-size) / 4);
	bottom: calc(-1 * var(--box-size) / 50);
	width: calc(var(--box-size) / 2.5);
	height: calc(var(--box-size) / 2.5);
	background-image: url('./images/features/rat.png');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
}

.box-item.with-scull:before {
	content: '';
	position: absolute;
	left: calc(-1 * var(--box-size) / 4);
	bottom: calc(-1 * var(--box-size) / 50);
	width: calc(var(--box-size) / 3);
	height: calc(var(--box-size) / 2.5);
	background-image: url('./images/features/scull.png');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
}


.box-image {
	width: var(--box-size);
	height: inherit;
}

.roll-button {
	background-color: #fb6400;
}
</style>