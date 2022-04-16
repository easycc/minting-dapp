<template>
	<section class="wallpapers-section">
		<PageContent>
			<BackButton link="/" />
			<h1 class="title">
				Wallpapers
			</h1>

			<p class="subtitle">
				For the biggest fans <Icon name="heart" class="heart-icon" />
			</p>

			<ul class="wallpapers-list">
				<li
					v-for="(wallpaper, wallpaperIndex) in wallpapers"
					:key="wallpaper"
					class="wallpaper-item"
				>
					<img
						:src="wallpaper"
						:alt="`Wallpaper ${wallpaperIndex}`"
						width="210"
						height="auto"
						class="wallpaper-image"
					/>

					<Button :href="wallpaper" download class="download-button">
						Download
					</Button>
				</li>
			</ul>
		</PageContent>
	</section>
</template>

<script>
import wallpapers from './wallpapers';

import { Button, BackButton } from '~/components/buttons';
import { Icon } from '~/components/Icon';
import { PageContent } from '~/components/PageLayout';

export default {
	components: {
		PageContent,
		Button,
		Icon,
		BackButton
	},

	data () {
		return {
			wallpapers
		};
	}
};
</script>

<style scoped>
.title {
	text-align: center;
	margin-bottom: 0.5rem;
}

.subtitle {
	text-align: center;
	margin-bottom: 3rem;
}

.heart-icon {
	display: inline;
	padding-left: 0.5em;
	color: #FF80A5;
}

.wallpapers-list {
	display: block;
	width: 100%;
	padding: 0;
	margin: 0;
	text-align: center;
}

.wallpaper-item {
	width: 13.5rem;
	margin: 0 1em 1.5em;
	display: inline-block;
	vertical-align: top;
}

@media screen and (max-width: 576px) {
	.wallpaper-item {
		margin-left: 0.5em;
		margin-right: 0.5em;
	}
}

@media screen and (max-width: 520px) {
	.wallpaper-item {
		max-width: 40vw;
		margin-right: 1vw;
		margin-left: 1vw;
	}
}

.wallpaper-image {
	display: block;
	width: 100%;
	margin-bottom: 0.5em;
	border-radius: 1.5em;
	overflow: hidden;
}

.download-button {
	padding-top: 0.333em;
	padding-bottom: 0.333em;
}
</style>