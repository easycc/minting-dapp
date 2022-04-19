<template>
	<section class="wallpapers-section">
		<PageContent class="content">
			<h2 class="title">
				Want a wallpaper?
			</h2>

			<Button link="/wallpapers" class="download-button">
				Download for free
			</Button>

			<div class="slider-wrapper">
				<Swiper
					:options="swiperOptions"
					class="wallpapers-list"
				>
					<SwiperSlide
						v-for="(wallpaper, wallpaperIndex) in wallpapers"
						:key="wallpaper"
						class="wallpaper-item"
					>
						<img :src="wallpaper" :alt="`Wallpaper ${wallpaperIndex}`" width="210" class="wallpaper-image" />
					</SwiperSlide>
				</Swiper>

				<img
					src="./images/iphone-frame.png"
					alt="iPhone 12 frame"
					width="240"
					height="auto"
					class="iphone-frame"
				/>
			</div>
		</PageContent>
	</section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import wallpapers from './wallpapers';

import { Button } from '~/components/buttons';
import { PageContent } from '~/components/PageLayout';

import 'swiper/css/swiper.css';

export default {
	components: {
		Swiper,
		Button,
		PageContent,
		SwiperSlide
	},

	data () {
		return {
			wallpapers,

			swiperOptions: {
				effect: 'slide',

				slidesPerView: 'auto',
				autoplay: {
					delay: 1500,
					disableOnInteraction: true
				},
				spaceBetween: 40,
				direction: 'horizontal',
				centeredSlides: true,
				loop: true,
				speed: 800,
				allowTouchMove: true
			}
		};
	}
};
</script>

<style scoped>
.wallpapers-section {
	text-align: center;
	/* border-bottom: calc(var(--pixel-size) * 2) solid var(--color-background-secondary); */
	background-color: #222222;
}

.content {
	max-width: 100%;
}

.title {
	text-align: center;
	display: block;
	width: 100%;
	margin-bottom: 0.5em;
}

.slider-wrapper {
	position: relative;
	width: calc(100% + 2 * var(--page-horizontal-padding));
	margin-left: calc(-1 * var(--page-horizontal-padding));
}

.wallpapers-list {
	padding: 0.5rem 0;
}

.wallpaper-item {
	width: 13.5rem;
}

.wallpaper-image {
	display: block;
	width: inherit;
	height: auto;
	border-radius: 1.5em;
	overflow: hidden;
}

.iphone-frame {
	position: absolute;
	pointer-events: none;
	z-index: 1;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%)
}

.download-button {
	margin-bottom: 3em;
}
</style>