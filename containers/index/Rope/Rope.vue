<template>
	<footer class="rope-section">
		<div class="shadow-wrapper">
			<div class="shadow" />
		</div>

		<div class="light-wrapper">
			<div class="light" />
		</div>
		<PageContent class="content">
			<h2 class="title">
				What is the end of this story?
			</h2>
			<p class="subtitle">
				To be continued...
			</p>
		</PageContent>
		<div class="rope">
			<div class="animal">
				<img
					src="./images/animal.png"
					alt="animal with a yellow balloon on the rope"
					width="185"
					height="165"
				/>
			</div>
		</div>

		<PageContent class="content">
			<p>No animals were harmed.</p>
			<p>The story, all names, characters, and incidents portrayed in this production are fictitious.</p>
		</PageContent>
	</footer>
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
	background-image: linear-gradient(180deg, #222, #111);
	position: relative;
	z-index: 1;
}

.light-wrapper {
	display: block;
	z-index: 1;
	width: 400px;
	height: 400px;
	transform: translate(-50%, 0);
	position: absolute;


	top: 140px;
	right: 0;

	animation: move 24s linear infinite;
	animation-delay: 1s;
}

.light {
	display: block;
	animation: wiggle 4s ease-in-out infinite;
	width: 100%;
	height: 100%;

	box-shadow: 0 0 0 200vw rgb(0, 0, 0, 0.2);
	border-radius: 50%;
}

.shadow-wrapper {
	display: block;
	z-index: 0;
	width: 400px;
	height: 400px;
	transform: translate(-50%, 0);
	position: absolute;


	top: 140px;
	right: 0;

	animation: move 24s linear infinite;
	animation-delay: 1s;
}

.shadow {
	width: inherit;
	height: inherit;
	animation: walk 400ms linear infinite;

	background-image: url('./images/animal-shadow.png');
	background-repeat: no-repeat;
	background-size: 180px auto;
	background-position: center;
}

@keyframes wiggle {
  0% {
    transform: translate(8%, 1%);
  }
  50% {
    transform: translate(-8%, 0%);
  }
  100% {
    transform: translate(8%, 1%);
  }
}

.rope {
	height: 270px;
	position: relative;
	z-index: 0;
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
    transform: translateX(500px);
  }
  100% {
    transform: translateX(calc(-100vw - 500px));
  }
}

.animal {
	width: 180px;
	height: 170px;

	position: absolute;
	z-index: 2;

	right: 0;
	animation: move 24s linear infinite;
	top: 0;
}

.animal img {
	animation: walk 400ms linear infinite;
}

@keyframes walk {
	0% {
		transform: translateY(-10px);
	}

	50% {
		transform: translateY(0px);
	}

	100% {
		transform: translateY(-10px);
	}
}
</style>