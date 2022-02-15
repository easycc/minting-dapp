<template>
	<DarkTheme>
		<section class="get-animals-back-section">
			<PageContent class="content">
				<h2 class="section-title">
					The circus owners are trying to get the animals back!
				</h2>

				<div class="slider-wrapper">
					<Swiper
						:options="swiperOptions"
						class="slides"
					>
						<SwiperSlide
							v-for="slide in slides"
							:key="slide.src"
							class="slide"
						>
							<img
								:src="slide.src"
								:alt="slide.alt"
								class="image"
								width="200"
								height="auto"
							/>
						</SwiperSlide>

						<template v-slot:button-prev>
							<ButtonPrev class="slide-button-prev" />
						</template>

						<template v-slot:button-next>
							<ButtonNext class="slide-button-next" />
						</template>
					</Swiper>
				</div>

				<h3 class="voting-title">
					Will they catch the animals?
				</h3>


				<Tooltip class="vote-positive">
					<template v-slot:trigger>
						<Button
							class="vote-button vote-positive-button"
							title="Yes"
							iconName="check"
						/>
					</template>

					<p class="vote-title">
						The elephant will be very upset with your vote =(
					</p>
				</Tooltip>

				<Tooltip class="vote-negative">
					<template v-slot:trigger>
						<Button
							class="vote-button vote-negative-button"
							title="No"
							iconName="cross"
						/>
					</template>


					<p class="vote-title">
						To be honest, we don't know the answer ourselves.
					</p>
				</Tooltip>
			</PageContent>
		</section>
	</DarkTheme>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';

import { ButtonPrev, ButtonNext } from '~/components/Slider';
import { PageContent } from '~/components/PageLayout';
import { Tooltip } from '~/components/Flyout';
import { DarkTheme } from '~/components/Themes';
import { Button } from '~/components/buttons';


import 'swiper/css/swiper.css';

export default {
	components: {
		Tooltip,
		Button,
		PageContent,
		ButtonPrev,
		ButtonNext,
		DarkTheme,

		Swiper,
		SwiperSlide
	},

	directives: {
		swiper: directive
	},

	data () {
		return {
			slides: [
				{
					alt: 'Elephant with a balloon near the trap',
					src: require('./images/1.png')
				},
				{
					alt: 'Rhino and a poacher',
					src: require('./images/2.png')
				},
				{
					alt: 'Fur seal under the net',
					src: require('./images/3.png')
				},
				{
					alt: 'Rhino in the cage',
					src: require('./images/4.png')
				},
				{
					alt: 'Lion and a poacher',
					src: require('./images/5.png')
				}
			],

			swiperOptions: {
				slidesPerView: 'auto',
				centeredSlides: true,
				spaceBetween: 20,
				direction: 'horizontal',
				speed: 800,
				allowTouchMove: true,
				loop: true,

				breakpoints: {
					560: {
						allowTouchMove: false,
						slidesPerView: 3,
						centeredSlides: false,
						spaceBetween: 60
					}
				},

				navigation: {
					prevEl: '.slide-button.prev',
					nextEl: '.slide-button.next'
				}
			}
		};
	}
};
</script>

<style scoped>
.get-animals-back-section {
	background-color: #222222;
	text-align: center;
}

.section-title {
	display: block;
	width: 100%;
	max-width: 32rem;
	margin-left: auto;
	margin-right: auto;
}

.slider-wrapper {
	position: relative;
	margin-bottom: 3rem;
	margin-left: auto;
	margin-right: auto;
	max-width: 60rem;
	width: 100%;
}

.slide .image {
	width: 100%;
	height: auto;
}

@media screen and (max-width: 560px) {
	.slider-wrapper {
		width: calc(100% + var(--page-horizontal-padding) * 2);
		margin-left: calc(var(--page-horizontal-padding) * -1);
		margin-right: 0;
	}

	.slide {
		width: 45vw;
	}
}

@media screen and (max-width: 576px) {
	.slide-button-prev {
		left: 0.5em;
	}
	.slide-button-next {
		right: 0.5em;
	}
}

.voting-title {
	display: block;
	width: 100%;
	text-align: center;
}

.vote-button {
	display: inline-block;
}

.vote-negative-button {
	background-color: var(--color-negative);
}

.vote-negative-button:hover {
	background-color: #fa6681;
}

.vote-positive-button {
	background-color: var(--color-positive);
	margin-right: 1em;
}

.vote-positive-button:hover {
	background-color: #95d455;
}

.votes-counter {
	display: block;
	padding-top: 1em;
	width: 100%;
	color: var(--color-text-secondary);
}


.vote-title {
	font-size: 1.25em;
	max-width: 16rem;
	padding: 1em;
	margin: 0;
	text-align: center;
	display: block;
	width: 100%;
	margin: 0 auto;
}


.vote-negative, .vote-positive {
	display: inline-block;
}
</style>