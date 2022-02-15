<template>
	<div class="sky-section-wrapper">
		<section class="sky-section">
			<PageContent class="content">
				<img
					src="./images/crocodile.png"
					class="crocodile"
					alt="Crocodile on the bird"
					width="250"
					height="250"
				/>
				<img
					src="./images/walrus.png"
					class="walrus"
					alt="Walrus with a pirat hat in the plane"
					width="250"
					height="250"
				/>
				<img
					src="./images/jirafa.png"
					class="jirafa"
					alt="Jirafa on the bird"
					width="250"
					height="500"
				/>
				<img
					src="./images/elephant.png"
					class="elephant"
					alt="Elephant with a watermelon hat in the UFO"
					width="250"
					height="250"
				/>
			</PageContent>
		</section>
	</div>
</template>

<script>
import { PageContent } from '~/components/PageLayout';

export default {
	components: {
		PageContent
	}
};
</script>

<style scoped>
.sky-section-wrapper {
	padding-top: 100px;
	overflow: hidden;
	background-color: #252525;
}

.sky-section {
	background-color: #8EC6F4;
	height: 500px;
	position: relative;

	background-image: url('./images/clouds.svg');
	background-size: 250px 250px;
	background-position: 0 0;
	background-repeat: repeat;
	animation: bg 16s linear infinite;
}

.content {
	padding: 0;
}

@keyframes move {
  0% {
		opacity: 1;
    transform: translateX(100%);
  }
  100% {
		opacity: 1;
    transform: translateX(calc(-1 * 100vw - 100%));
  }
}

@keyframes bg {
  0% {
		background-color: #8EC6F4;
		background-image: url('./images/clouds.svg');
  }
  30% {
		background-color: #ECCD94;
		background-image: url('./images/clouds.svg');
  }
  45% {
		background-image: url('./images/none.svg');
  }
  50% {
		background-color: #17021E;
	}
  55% {
		background-image: url('./images/stars.svg');
		background-size: 250px 250px;
  }
  65% {
		background-color: #17021E;
		background-image: url('./images/stars.svg');
  }
  70% {
		background-image: url('./images/none.svg');
  }
  85% {
		background-image: url('./images/clouds.svg');
		background-color: #ECCD94;
	}
  85% {
		background-image: url('./images/clouds.svg');
  }
  100% {
		background-color: #8EC6F4;
		background-image: url('./images/clouds.svg');
  }
}

.elephant, .walrus, .crocodile, .jirafa {
	width: 250px;
	height: auto;
	opacity: 0;

	position: absolute;

	right: 0;
	animation: move 18s cubic-bezier(0.1, -0.6, 0.2, 0) infinite;
	animation-delay: 0s;
	top: -5em;
}

.crocodile {
	top: 0em;
	animation-delay: -10s;
	animation-duration: 20s;
}

.walrus {
	top: 5em;
	animation-delay: -4s;
	animation-duration: 16s;
}

.jirafa {
	top: 0em;
	animation-delay: -16s;
	animation-duration: 21s;
}

.elephant {
	top: initial;
	bottom: 0;
	animation-delay: -2s;
	animation-duration: 20s;
}

@media screen and (max-width: 576px) {
	.crocodile {
		animation-duration: 12s;
	}

	.walrus {
		animation-duration: 8s;
	}

	.jirafa {
		animation-duration: 12s;
	}

	.elephant {
		animation-duration: 12s;
	}
}

</style>