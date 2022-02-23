<template>
	<LightTheme>
		<section class="rope-section">
			<PageContent class="content">
				<h2 class="title">
					What is the end of this story?
				</h2>
				<p class="subtitle">
					To be continued...
				</p>
			</PageContent>
			<div class="rope">
				<img
					src="./images/fur-seal.png"
					class="fur-seal"
					alt="fur-seal with a yellow balloon on the rope"
					width="185"
					height="165"
				/>
			</div>

			<PageContent class="content">
				<p>No animals were harmed.</p>
				<p>The story, all names, characters, and incidents portrayed in this production are fictitious.</p>
			</PageContent>
		</section>
	</LightTheme>
</template>

<script>
import { PageContent } from '~/components/PageLayout';
import { LightTheme } from '~/components/Themes';

export default {
	components: {
		PageContent,
		LightTheme
	}
};
</script>

<style scoped>
.rope-section {
	overflow: hidden;
	background-color: #8EC6F4;
}

.rope {
	height: 270px;
	position: relative;
}

.content {
	text-align: center;
}

.title {
	text-shadow: none;
	margin-bottom: 0.75rem;
	display: block;
}

.subtitle {
	font-size: 1.25em;
}


.rope:before {
	content: '';
	display: block;
	width: 100%;
	height: 120px;
	position: absolute;
	bottom: 0;
	z-index: 1;
	background-image:
		url('./images/ground-left.svg'),
		url('./images/ground-right.svg'),
		linear-gradient(0deg,
			rgba(17, 17, 17, 0) 0%,
			rgba(17, 17, 17, 0) calc(100% - var(--pixel-size) * 5),
			#111 calc(100% - var(--pixel-size) * 5),
			#111 calc(100% - var(--pixel-size) * 4),
			#fff calc(100% - var(--pixel-size) * 4),
			#fff calc(100% - var(--pixel-size) * 3),
			#111 calc(100% - var(--pixel-size) * 3),
			#111 calc(100% - var(--pixel-size) * 2),
			rgba(17, 17, 17, 0) calc(100% - var(--pixel-size) * 3)
		);
	background-repeat: no-repeat;
	background-size: contain;
	background-position: 0 0, 100% 0, 100%;
}

@keyframes move {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(calc(-1 * 100vw - 100%));
  }
}

.fur-seal {
	width: 185px;
	height: 165px;

	position: absolute;
	z-index: 2;

	right: 0;
	animation: move 32s linear infinite;
	animation-delay: 0s;
	top: 0;
}

@media screen and (max-width: 576px) {
	.fur-seal {
		animation-duration: 14s;
	}
}
</style>